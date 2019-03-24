/**
 * This is responsible for syncing of Telemetry
 * @class TelemetrySyncManager
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 * @author Krushanu Mohapatra <Krushanu.Mohapatra@tarento.com>
 */

var TelemetrySyncManager = {

    /**
     * This is the telemetry data for the perticular stage.
     * @member {object} _teleData
     * @memberof TelemetryPlugin
     */
    _teleData: [],
    init: function() {
        var instance = this;
        document.addEventListener('TelemetryEvent', this.sendTelemetry);
    },
    sendTelemetry: function(event) {
        var telemetryEvent = event.detail;
        console.log("Telemetry Events ", JSON.stringify(telemetryEvent));
        var instance = TelemetrySyncManager;
        instance._teleData.push(Object.assign({}, telemetryEvent));
        if ((telemetryEvent.eid.toUpperCase() === "END") || (instance._teleData.length >= Telemetry.config.batchsize)) {
            TelemetrySyncManager.syncEvents();
        }
    },
    updateEventStack: function(events) {
        TelemetrySyncManager._teleData = TelemetrySyncManager._teleData.concat(events);
    },
    syncEvents: function() {
        var Telemetry = EkTelemetry || Telemetry;
        var instance = TelemetrySyncManager;
        var telemetryData = instance._teleData.splice(0, Telemetry.config.batchsize);
        var telemetryObj = {
            "id": "ekstep.telemetry",
            "ver": Telemetry._version,
            "ets": (new Date()).getTime(),
            "events": telemetryData
        };
        var headersParam = {};
        if ('undefined' != typeof Telemetry.config.authtoken)
            headersParam["Authorization"] = 'Bearer ' + Telemetry.config.authtoken;

        var fullPath = Telemetry.config.host + Telemetry.config.apislug + Telemetry.config.endpoint;
        /*
		headersParam['dataType'] = 'json';
        headersParam["Content-Type"] = "application/json";
		jQuery.ajax({
            url: fullPath,
            type: "POST",
            headers: headersParam,
            data: JSON.stringify(telemetryObj)
        }).done(function(resp) {
            console.log("Telemetry API success", resp);
        }).fail(function(error, textStatus, errorThrown) {
            instance.updateEventStack(telemetryData);
            if (error.status == 403) {
                console.error("Authentication error: ", error);
            } else {
                console.log("Error while Telemetry sync to server: ", error);
            }
        });
		*/
		var iEVersion = -1;
		if(navigator.appName == 'Microsoft Internet Explorer'){
			var userAgent = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(userAgent) != null){
				iEVersion = parseFloat( RegExp.$1 );
			}
		}
		
		var xhr = new XMLHttpRequest();
		if(iEVersion != -1 && iEVersion < 7){
			xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		
		xhr.open('POST', fullPath);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			if (xhr.status === 200) {
				console.log("Telemetry API success", xhr.responseText);
				
			}
			else {
				instance.updateEventStack(telemetryData);
				if (xhr.status == 403) {
					console.error("Authentication error: ", xhr.responseText);
				} else {
					console.log("Error while Telemetry sync to server: ", xhr.responseText);
				}
			}
		};
		
		xhr.send(JSON.stringify(telemetryObj));
    }
}
if (typeof document != 'undefined') {
    TelemetrySyncManager.init();
}