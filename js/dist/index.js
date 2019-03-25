/* ajv 6.5.0: Another JSON Schema Validator */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Ajv=e()}}(function(){return function o(i,n,l){function u(r,e){if(!n[r]){if(!i[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(c)return c(r,!0);var a=new Error("Cannot find module '"+r+"'");throw a.code="MODULE_NOT_FOUND",a}var s=n[r]={exports:{}};i[r][0].call(s.exports,function(e){return u(i[r][1][e]||e)},s,s.exports,o,i,n,l)}return n[r].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,r,t){"use strict";var a=r.exports=function(){this._cache={}};a.prototype.put=function(e,r){this._cache[e]=r},a.prototype.get=function(e){return this._cache[e]},a.prototype.del=function(e){delete this._cache[e]},a.prototype.clear=function(){this._cache={}}},{}],2:[function(e,r,t){"use strict";var s=e("./error_classes").MissingRef;r.exports=function t(r,i,a){var n=this;if("function"!=typeof this._opts.loadSchema)throw new Error("options.loadSchema should be a function");"function"==typeof i&&(a=i,i=void 0);var e=l(r).then(function(){var e=n._addSchema(r,void 0,i);return e.validate||function(o){try{return n._compile(o)}catch(e){if(e instanceof s)return function(e){var r=e.missingSchema;if(s(r))throw new Error("Schema "+r+" is loaded but "+e.missingRef+" cannot be resolved");var t=n._loadingSchemas[r];t||(t=n._loadingSchemas[r]=n._opts.loadSchema(r)).then(a,a);return t.then(function(e){if(!s(r))return l(e).then(function(){s(r)||n.addSchema(e,r,void 0,i)})}).then(function(){return u(o)});function a(){delete n._loadingSchemas[r]}function s(e){return n._refs[e]||n._schemas[e]}}(e);throw e}}(e)});a&&e.then(function(e){a(null,e)},a);return e;function l(e){var r=e.$schema;return r&&!n.getSchema(r)?t.call(n,{$ref:r},!0):Promise.resolve()}function u(o){try{return n._compile(o)}catch(e){if(e instanceof s)return function(e){var r=e.missingSchema;if(s(r))throw new Error("Schema "+r+" is loaded but "+e.missingRef+" cannot be resolved");var t=n._loadingSchemas[r];t||(t=n._loadingSchemas[r]=n._opts.loadSchema(r)).then(a,a);return t.then(function(e){if(!s(r))return l(e).then(function(){s(r)||n.addSchema(e,r,void 0,i)})}).then(function(){return u(o)});function a(){delete n._loadingSchemas[r]}function s(e){return n._refs[e]||n._schemas[e]}}(e);throw e}}}},{"./error_classes":3}],3:[function(e,r,t){"use strict";var a=e("./resolve");function s(e,r,t){this.message=t||s.message(e,r),this.missingRef=a.url(e,r),this.missingSchema=a.normalizeId(a.fullPath(this.missingRef))}function o(e){return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e}r.exports={Validation:o(function(e){this.message="validation failed",this.errors=e,this.ajv=this.validation=!0}),MissingRef:o(s)},s.message=function(e,r){return"can't resolve reference "+r+" from id "+e}},{"./resolve":6}],4:[function(e,r,t){"use strict";var a=e("./util"),o=/^(\d\d\d\d)-(\d\d)-(\d\d)$/,i=[0,31,28,31,30,31,30,31,31,30,31,30,31],n=/^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i,s=/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*$/i,l=/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,u=/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,c=/^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[0-9KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[KSa-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,h=/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,d=/^(?:\/(?:[^~/]|~0|~1)*)*$/,f=/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,p=/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;function m(e){return a.copy(m[e="full"==e?"full":"fast"])}function v(e){var r=e.match(o);if(!r)return!1;var t,a=+r[2],s=+r[3];return 1<=a&&a<=12&&1<=s&&s<=(2!=a||((t=+r[1])%4!=0||t%100==0&&t%400!=0)?i[a]:29)}function g(e,r){var t=e.match(n);if(!t)return!1;var a=t[1],s=t[2],o=t[3];return(a<=23&&s<=59&&o<=59||23==a&&59==s&&60==o)&&(!r||t[5])}(r.exports=m).fast={date:/^\d\d\d\d-[0-1]\d-[0-3]\d$/,time:/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i,"date-time":/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,uri:/^(?:[a-z][a-z0-9+-.]*:)(?:\/?\/)?[^\s]*$/i,"uri-reference":/^(?:(?:[a-z][a-z0-9+-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,"uri-template":u,url:c,email:/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,hostname:s,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,ipv6:/^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,regex:w,uuid:h,"json-pointer":d,"json-pointer-uri-fragment":f,"relative-json-pointer":p},m.full={date:v,time:g,"date-time":function(e){var r=e.split(y);return 2==r.length&&v(r[0])&&g(r[1],!0)},uri:function(e){return P.test(e)&&l.test(e)},"uri-reference":/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,"uri-template":u,url:c,email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,hostname:function(e){return e.length<=255&&s.test(e)},ipv4:/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,ipv6:/^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,regex:w,uuid:h,"json-pointer":d,"json-pointer-uri-fragment":f,"relative-json-pointer":p};var y=/t|\s/i;var P=/\/|:/;var E=/[^\\]\\Z/;function w(e){if(E.test(e))return!1;try{return new RegExp(e),!0}catch(e){return!1}}},{"./util":10}],5:[function(e,r,t){"use strict";var $=e("./resolve"),D=e("./util"),j=e("./error_classes"),l=e("fast-json-stable-stringify"),I=e("../dotjs/validate"),O=D.ucs2length,A=e("fast-deep-equal"),C=j.Validation;function k(e,r,t){for(var a=0;a<this._compilations.length;a++){var s=this._compilations[a];if(s.schema==e&&s.root==r&&s.baseId==t)return a}return-1}function L(e,r){return"var pattern"+e+" = new RegExp("+D.toQuotedString(r[e])+");"}function z(e){return"var default"+e+" = defaults["+e+"];"}function T(e,r){return void 0===r[e]?"":"var refVal"+e+" = refVal["+e+"];"}function N(e){return"var customRule"+e+" = customRules["+e+"];"}function q(e,r){if(!e.length)return"";for(var t="",a=0;a<e.length;a++)t+=r(a,e);return t}r.exports=function u(e,c,h,r){var d=this,f=this._opts,p=[void 0],m={},v=[],t={},g=[],a={},y=[];c=c||{schema:e,refVal:p,refs:m};var s=function(e,r,t){var a=k.call(this,e,r,t);return 0<=a?{index:a,compiling:!0}:{index:a=this._compilations.length,compiling:(this._compilations[a]={schema:e,root:r,baseId:t},!1)}}.call(this,e,c,r);var o=this._compilations[s.index];if(s.compiling)return o.callValidate=function e(){var r=o.validate;var t=r.apply(this,arguments);e.errors=r.errors;return t};var P=this._formats;var E=this.RULES;try{var i=w(e,c,h,r);o.validate=i;var n=o.callValidate;return n&&(n.schema=i.schema,n.errors=null,n.refs=i.refs,n.refVal=i.refVal,n.root=i.root,n.$async=i.$async,f.sourceCode&&(n.source=i.source)),i}finally{(function(e,r,t){var a=k.call(this,e,r,t);0<=a&&this._compilations.splice(a,1)}).call(this,e,c,r)}function w(e,r,t,a){var s=!r||r&&r.schema==e;if(r.schema!=c.schema)return u.call(d,e,r,t,a);var o,i=!0===e.$async,n=I({isTop:!0,schema:e,isRoot:s,baseId:a,root:r,schemaPath:"",errSchemaPath:"#",errorPath:'""',MissingRefError:j.MissingRef,RULES:E,validate:I,util:D,resolve:$,resolveRef:S,usePattern:F,useDefault:x,useCustomRule:R,opts:f,formats:P,logger:d.logger,self:d});n=q(p,T)+q(v,L)+q(g,z)+q(y,N)+n,f.processCode&&(n=f.processCode(n));try{var l=new Function("self","RULES","formats","root","refVal","defaults","customRules","equal","ucs2length","ValidationError",n);o=l(d,E,P,c,p,g,y,A,O,C),p[0]=o}catch(e){throw d.logger.error("Error compiling schema, function code:",n),e}return o.schema=e,o.errors=null,o.refs=m,o.refVal=p,o.root=s?o:r,i&&(o.$async=!0),!0===f.sourceCode&&(o.source={code:n,patterns:v,defaults:g}),o}function S(e,r,t){r=$.url(e,r);var a,s,o=m[r];if(void 0!==o)return _(a=p[o],s="refVal["+o+"]");if(!t&&c.refs){var i=c.refs[r];if(void 0!==i)return s=b(r,a=c.refVal[i]),_(a,s)}s=b(r);var n=$.call(d,w,c,r);if(void 0===n){var l=h&&h[r];l&&(n=$.inlineRef(l,f.inlineRefs)?l:u.call(d,l,c,h,e))}if(void 0!==n)return p[m[r]]=n,_(n,s);delete m[r]}function b(e,r){var t=p.length;return p[t]=r,"refVal"+(m[e]=t)}function _(e,r){return"object"==typeof e||"boolean"==typeof e?{code:r,schema:e,inline:!0}:{code:r,$async:e&&!!e.$async}}function F(e){var r=t[e];return void 0===r&&(r=t[e]=v.length,v[r]=e),"pattern"+r}function x(e){switch(typeof e){case"boolean":case"number":return""+e;case"string":return D.toQuotedString(e);case"object":if(null===e)return"null";var r=l(e),t=a[r];return void 0===t&&(t=a[r]=g.length,g[t]=e),"default"+t}}function R(e,r,t,a){var s=e.definition.validateSchema;if(s&&!1!==d._opts.validateSchema){var o=s(r);if(!o){var i="keyword schema is invalid: "+d.errorsText(s.errors);if("log"!=d._opts.validateSchema)throw new Error(i);d.logger.error(i)}}var n,l=e.definition.compile,u=e.definition.inline,c=e.definition.macro;if(l)n=l.call(d,r,t,a);else if(c)n=c.call(d,r,t,a),!1!==f.validateSchema&&d.validateSchema(n,!0);else if(u)n=u.call(d,a,e.keyword,r,t);else if(!(n=e.definition.validate))return;if(void 0===n)throw new Error('custom keyword "'+e.keyword+'"failed to compile');var h=y.length;return{code:"customRule"+h,validate:y[h]=n}}}},{"../dotjs/validate":37,"./error_classes":3,"./resolve":6,"./util":10,"fast-deep-equal":41,"fast-json-stable-stringify":42}],6:[function(e,r,t){"use strict";var m=e("uri-js"),v=e("fast-deep-equal"),g=e("./util"),l=e("./schema_obj"),a=e("json-schema-traverse");function u(e,r,t){var a=this._refs[t];if("string"==typeof a){if(!this._refs[a])return u.call(this,e,r,a);a=this._refs[a]}if((a=a||this._schemas[t])instanceof l)return d(a.schema,this._opts.inlineRefs)?a.schema:a.validate||this._compile(a);var s,o,i,n=c.call(this,r,t);return n&&(s=n.schema,r=n.root,i=n.baseId),s instanceof l?o=s.validate||e.call(this,s.schema,r,void 0,i):void 0!==s&&(o=d(s,this._opts.inlineRefs)?s:e.call(this,s,r,void 0,i)),o}function c(e,r){var t=m.parse(r),a=f(t),s=y(this._getId(e.schema));if(a!==s){var o=P(a),i=this._refs[o];if("string"==typeof i)return function(e,r,t){var a=c.call(this,e,r);if(a){var s=a.schema,o=a.baseId;e=a.root;var i=this._getId(s);return i&&(o=p(o,i)),n.call(this,t,o,s,e)}}.call(this,e,i,t);if(i instanceof l)i.validate||this._compile(i),e=i;else{if(!((i=this._schemas[o])instanceof l))return;if(i.validate||this._compile(i),o==P(r))return{schema:i,root:e,baseId:s};e=i}if(!e.schema)return;s=y(this._getId(e.schema))}return n.call(this,t,s,e.schema,e)}(r.exports=u).normalizeId=P,u.fullPath=y,u.url=p,u.ids=function(e){var r=P(this._getId(e)),h={"":r},d={"":y(r,!1)},f={},p=this;return a(e,{allKeys:!0},function(e,r,t,a,s,o,i){if(""!==r){var n=p._getId(e),l=h[a],u=d[a]+"/"+s;if(void 0!==i&&(u+="/"+("number"==typeof i?i:g.escapeFragment(i))),"string"==typeof n){n=l=P(l?m.resolve(l,n):n);var c=p._refs[n];if("string"==typeof c&&(c=p._refs[c]),c&&c.schema){if(!v(e,c.schema))throw new Error('id "'+n+'" resolves to more than one schema')}else if(n!=P(u))if("#"==n[0]){if(f[n]&&!v(e,f[n]))throw new Error('id "'+n+'" resolves to more than one schema');f[n]=e}else p._refs[n]=u}h[r]=l,d[r]=u}}),f},u.inlineRef=d,u.schema=c;var h=g.toHash(["properties","patternProperties","enum","dependencies","definitions"]);function n(e,r,t,a){if(e.fragment=e.fragment||"","/"==e.fragment.slice(0,1)){for(var s=e.fragment.split("/"),o=1;o<s.length;o++){var i=s[o];if(i){if(void 0===(t=t[i=g.unescapeFragment(i)]))break;var n;if(!h[i]&&((n=this._getId(t))&&(r=p(r,n)),t.$ref)){var l=p(r,t.$ref),u=c.call(this,a,l);u&&(t=u.schema,a=u.root,r=u.baseId)}}}return void 0!==t&&t!==a.schema?{schema:t,root:a,baseId:r}:void 0}}var i=g.toHash(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum"]);function d(e,r){return!1!==r&&(void 0===r||!0===r?function e(r){var t;if(Array.isArray(r)){for(var a=0;a<r.length;a++)if("object"==typeof(t=r[a])&&!e(t))return!1}else for(var s in r){if("$ref"==s)return!1;if("object"==typeof(t=r[s])&&!e(t))return!1}return!0}(e):r?function e(r){var t,a=0;if(Array.isArray(r)){for(var s=0;s<r.length;s++)if("object"==typeof(t=r[s])&&(a+=e(t)),a==1/0)return 1/0}else for(var o in r){if("$ref"==o)return 1/0;if(i[o])a++;else if("object"==typeof(t=r[o])&&(a+=e(t)+1),a==1/0)return 1/0}return a}(e)<=r:void 0)}function y(e,r){return!1!==r&&(e=P(e)),f(m.parse(e))}function f(e){return m.serialize(e).split("#")[0]+"#"}var s=/#\/?$/;function P(e){return e?e.replace(s,""):""}function p(e,r){return r=P(r),m.resolve(e,r)}},{"./schema_obj":8,"./util":10,"fast-deep-equal":41,"json-schema-traverse":43,"uri-js":44}],7:[function(e,r,t){"use strict";var o=e("../dotjs"),i=e("./util").toHash;r.exports=function(){var a=[{type:"number",rules:[{maximum:["exclusiveMaximum"]},{minimum:["exclusiveMinimum"]},"multipleOf","format"]},{type:"string",rules:["maxLength","minLength","pattern","format"]},{type:"array",rules:["maxItems","minItems","items","contains","uniqueItems"]},{type:"object",rules:["maxProperties","minProperties","required","dependencies","propertyNames",{properties:["additionalProperties","patternProperties"]}]},{rules:["$ref","const","enum","not","anyOf","oneOf","allOf","if"]}],s=["type","$comment"];return a.all=i(s),a.types=i(["number","integer","string","array","object","boolean","null"]),a.forEach(function(e){e.rules=e.rules.map(function(e){var r;if("object"==typeof e){var t=Object.keys(e)[0];r=e[t],e=t,r.forEach(function(e){s.push(e),a.all[e]=!0})}return s.push(e),a.all[e]={keyword:e,code:o[e],implements:r}}),a.all.$comment={keyword:"$comment",code:o.$comment},e.type&&(a.types[e.type]=e)}),a.keywords=i(s.concat(["$schema","$id","id","$data","title","description","default","definitions","examples","readOnly","writeOnly","contentMediaType","contentEncoding","additionalItems","then","else"])),a.custom={},a}},{"../dotjs":26,"./util":10}],8:[function(e,r,t){"use strict";var a=e("./util");r.exports=function(e){a.copy(e,this)}},{"./util":10}],9:[function(e,r,t){"use strict";r.exports=function(e){for(var r,t=0,a=e.length,s=0;s<a;)t++,55296<=(r=e.charCodeAt(s++))&&r<=56319&&s<a&&56320==(64512&(r=e.charCodeAt(s)))&&s++;return t}},{}],10:[function(e,r,t){"use strict";function o(e,r,t){var a=t?" !== ":" === ",s=t?" || ":" && ",o=t?"!":"",i=t?"":"!";switch(e){case"null":return r+a+"null";case"array":return o+"Array.isArray("+r+")";case"object":return"("+o+r+s+"typeof "+r+a+'"object"'+s+i+"Array.isArray("+r+"))";case"integer":return"(typeof "+r+a+'"number"'+s+i+"("+r+" % 1)"+s+r+a+r+")";default:return"typeof "+r+a+'"'+e+'"'}}r.exports={copy:function(e,r){for(var t in r=r||{},e)r[t]=e[t];return r},checkDataType:o,checkDataTypes:function(e,r){switch(e.length){case 1:return o(e[0],r,!0);default:var t="",a=n(e);for(var s in a.array&&a.object&&(t=a.null?"(":"(!"+r+" || ",t+="typeof "+r+' !== "object")',delete a.null,delete a.array,delete a.object),a.number&&delete a.integer,a)t+=(t?" && ":"")+o(s,r,!0);return t}},coerceToTypes:function(e,r){if(Array.isArray(r)){for(var t=[],a=0;a<r.length;a++){var s=r[a];i[s]?t[t.length]=s:"array"===e&&"array"===s&&(t[t.length]=s)}if(t.length)return t}else{if(i[r])return[r];if("array"===e&&"array"===r)return["array"]}},toHash:n,getProperty:h,escapeQuotes:l,equal:e("fast-deep-equal"),ucs2length:e("./ucs2length"),varOccurences:function(e,r){var t=e.match(new RegExp(r+="[^0-9]","g"));return t?t.length:0},varReplace:function(e,r,t){return r+="([^0-9])",t=t.replace(/\$/g,"$$$$"),e.replace(new RegExp(r,"g"),t+"$1")},cleanUpCode:function(e){return e.replace(u,"").replace(c,"").replace(d,"if (!($1))")},finalCleanUpCode:function(e,r){var t=e.match(f);t&&2==t.length&&(e=r?e.replace(m,"").replace(y,P):e.replace(p,"").replace(v,g));return(t=e.match(E))&&3===t.length?e.replace(w,""):e},schemaHasRules:function(e,r){if("boolean"==typeof e)return!e;for(var t in e)if(r[t])return!0},schemaHasRulesExcept:function(e,r,t){if("boolean"==typeof e)return!e&&"not"!=t;for(var a in e)if(a!=t&&r[a])return!0},toQuotedString:S,getPathExpr:function(e,r,t,a){return F(e,t?"'/' + "+r+(a?"":".replace(/~/g, '~0').replace(/\\//g, '~1')"):a?"'[' + "+r+" + ']'":"'[\\'' + "+r+" + '\\']'")},getPath:function(e,r,t){var a=S(t?"/"+x(r):h(r));return F(e,a)},getData:function(e,r,t){var a,s,o,i;if(""===e)return"rootData";if("/"==e[0]){if(!b.test(e))throw new Error("Invalid JSON-pointer: "+e);s=e,o="rootData"}else{if(!(i=e.match(_)))throw new Error("Invalid JSON-pointer: "+e);if(a=+i[1],"#"==(s=i[2])){if(r<=a)throw new Error("Cannot access property/index "+a+" levels up, current level is "+r);return t[r-a]}if(r<a)throw new Error("Cannot access data "+a+" levels up, current level is "+r);if(o="data"+(r-a||""),!s)return o}for(var n=o,l=s.split("/"),u=0;u<l.length;u++){var c=l[u];c&&(o+=h(R(c)),n+=" && "+o)}return n},unescapeFragment:function(e){return R(decodeURIComponent(e))},unescapeJsonPointer:R,escapeFragment:function(e){return encodeURIComponent(x(e))},escapeJsonPointer:x};var i=n(["string","number","integer","boolean","null"]);function n(e){for(var r={},t=0;t<e.length;t++)r[e[t]]=!0;return r}var a=/^[a-z$_][a-z$_0-9]*$/i,s=/'|\\/g;function h(e){return"number"==typeof e?"["+e+"]":a.test(e)?"."+e:"['"+l(e)+"']"}function l(e){return e.replace(s,"\\$&").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\f/g,"\\f").replace(/\t/g,"\\t")}var u=/else\s*{\s*}/g,c=/if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g,d=/if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;var f=/[^v.]errors/g,p=/var errors = 0;|var vErrors = null;|validate.errors = vErrors;/g,m=/var errors = 0;|var vErrors = null;/g,v="return errors === 0;",g="validate.errors = null; return true;",y=/if \(errors === 0\) return data;\s*else throw new ValidationError\(vErrors\);/,P="return data;",E=/[^A-Za-z_$]rootData[^A-Za-z0-9_$]/g,w=/if \(rootData === undefined\) rootData = data;/;function S(e){return"'"+l(e)+"'"}var b=/^\/(?:[^~]|~0|~1)*$/,_=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function F(e,r){return'""'==e?r:(e+" + "+r).replace(/' \+ '/g,"")}function x(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function R(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")}},{"./ucs2length":9,"fast-deep-equal":41}],11:[function(e,r,t){"use strict";var l=["multipleOf","maximum","exclusiveMaximum","minimum","exclusiveMinimum","maxLength","minLength","pattern","additionalItems","maxItems","minItems","uniqueItems","maxProperties","minProperties","required","additionalProperties","enum","format","const"];r.exports=function(e,r){for(var t=0;t<r.length;t++){e=JSON.parse(JSON.stringify(e));var a,s=r[t].split("/"),o=e;for(a=1;a<s.length;a++)o=o[s[a]];for(a=0;a<l.length;a++){var i=l[a],n=o[i];n&&(o[i]={anyOf:[n,{$ref:"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#"}]})}}return e}},{}],12:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n;var f="maximum"==r,p=f?"exclusiveMaximum":"exclusiveMinimum",m=e.schema[p],v=e.opts.$data&&m&&m.$data,g=f?"<":">",y=f?">":"<",P=void 0;if(v){var E=e.util.getData(m.$data,i,e.dataPathArr),w="exclusive"+o,S="exclType"+o,b="exclIsNumber"+o,_="' + "+(R="op"+o)+" + '";s+=" var schemaExcl"+o+" = "+E+"; ";var F;P=p;(F=F||[]).push(s+=" var "+w+"; var "+S+" = typeof "+(E="schemaExcl"+o)+"; if ("+S+" != 'boolean' && "+S+" != 'undefined' && "+S+" != 'number') { "),s="",!1!==e.createErrors?(s+=" { keyword: '"+(P||"_exclusiveLimit")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: {} ",!1!==e.opts.messages&&(s+=" , message: '"+p+" should be boolean' "),e.opts.verbose&&(s+=" , schema: validate.schema"+l+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var x=s;s=F.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+x+"]); ":" validate.errors = ["+x+"]; return false; ":" var err = "+x+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+=" } else if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || "),s+=" "+S+" == 'number' ? ( ("+w+" = "+a+" === undefined || "+E+" "+g+"= "+a+") ? "+h+" "+y+"= "+E+" : "+h+" "+y+" "+a+" ) : ( ("+w+" = "+E+" === true) ? "+h+" "+y+"= "+a+" : "+h+" "+y+" "+a+" ) || "+h+" !== "+h+") { var op"+o+" = "+w+" ? '"+g+"' : '"+g+"='; ",void 0===n&&(u=e.errSchemaPath+"/"+(P=p),a=E,d=v)}else{_=g;if((b="number"==typeof m)&&d){var R="'"+_+"'";s+=" if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || "),s+=" ( "+a+" === undefined || "+m+" "+g+"= "+a+" ? "+h+" "+y+"= "+m+" : "+h+" "+y+" "+a+" ) || "+h+" !== "+h+") { "}else{b&&void 0===n?(w=!0,u=e.errSchemaPath+"/"+(P=p),a=m,y+="="):(b&&(a=Math[f?"min":"max"](m,n)),m===(!b||a)?(w=!0,u=e.errSchemaPath+"/"+(P=p),y+="="):(w=!1,_+="="));R="'"+_+"'";s+=" if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || "),s+=" "+h+" "+y+" "+a+" || "+h+" !== "+h+") { "}}P=P||r,(F=F||[]).push(s),s="",!1!==e.createErrors?(s+=" { keyword: '"+(P||"_limit")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { comparison: "+R+", limit: "+a+", exclusive: "+w+" } ",!1!==e.opts.messages&&(s+=" , message: 'should be "+_+" ",s+=d?"' + "+a:a+"'"),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";x=s;return s=F.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+x+"]); ":" validate.errors = ["+x+"]; return false; ":" var err = "+x+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+=" } ",c&&(s+=" else { "),s}},{}],13:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n,s+="if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || ");var f=r,p=p||[];p.push(s+=" "+h+".length "+("maxItems"==r?">":"<")+" "+a+") { "),s="",!1!==e.createErrors?(s+=" { keyword: '"+(f||"_limitItems")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { limit: "+a+" } ",!1!==e.opts.messages&&(s+=" , message: 'should NOT have ",s+="maxItems"==r?"more":"less",s+=" than ",s+=d?"' + "+a+" + '":""+n,s+=" items' "),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var m=s;return s=p.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+="} ",c&&(s+=" else { "),s}},{}],14:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n,s+="if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || "),s+=!1===e.opts.unicode?" "+h+".length ":" ucs2length("+h+") ";var f=r,p=p||[];p.push(s+=" "+("maxLength"==r?">":"<")+" "+a+") { "),s="",!1!==e.createErrors?(s+=" { keyword: '"+(f||"_limitLength")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { limit: "+a+" } ",!1!==e.opts.messages&&(s+=" , message: 'should NOT be ",s+="maxLength"==r?"longer":"shorter",s+=" than ",s+=d?"' + "+a+" + '":""+n,s+=" characters' "),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var m=s;return s=p.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+="} ",c&&(s+=" else { "),s}},{}],15:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n,s+="if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'number') || ");var f=r,p=p||[];p.push(s+=" Object.keys("+h+").length "+("maxProperties"==r?">":"<")+" "+a+") { "),s="",!1!==e.createErrors?(s+=" { keyword: '"+(f||"_limitProperties")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { limit: "+a+" } ",!1!==e.opts.messages&&(s+=" , message: 'should NOT have ",s+="maxProperties"==r?"more":"less",s+=" than ",s+=d?"' + "+a+" + '":""+n,s+=" properties' "),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var m=s;return s=p.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+="} ",c&&(s+=" else { "),s}},{}],16:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.schema[r],o=e.schemaPath+e.util.getProperty(r),i=e.errSchemaPath+"/"+r,n=!e.opts.allErrors,l=e.util.copy(e),u="";l.level++;var c="valid"+l.level,h=l.baseId,d=!0,f=s;if(f)for(var p,m=-1,v=f.length-1;m<v;)p=f[m+=1],e.util.schemaHasRules(p,e.RULES.all)&&(d=!1,l.schema=p,l.schemaPath=o+"["+m+"]",l.errSchemaPath=i+"/"+m,a+="  "+e.validate(l)+" ",l.baseId=h,n&&(a+=" if ("+c+") { ",u+="}"));return n&&(a+=d?" if (true) { ":" "+u.slice(0,-1)+" "),a=e.util.cleanUpCode(a)}},{}],17:[function(e,r,t){"use strict";r.exports=function(r,e,t){var a=" ",s=r.level,o=r.dataLevel,i=r.schema[e],n=r.schemaPath+r.util.getProperty(e),l=r.errSchemaPath+"/"+e,u=!r.opts.allErrors,c="data"+(o||""),h="valid"+s,d="errs__"+s,f=r.util.copy(r),p="";f.level++;var m="valid"+f.level;if(i.every(function(e){return r.util.schemaHasRules(e,r.RULES.all)})){var v=f.baseId;a+=" var "+d+" = errors; var "+h+" = false;  ";var g=r.compositeRule;r.compositeRule=f.compositeRule=!0;var y=i;if(y)for(var P,E=-1,w=y.length-1;E<w;)P=y[E+=1],f.schema=P,f.schemaPath=n+"["+E+"]",f.errSchemaPath=l+"/"+E,a+="  "+r.validate(f)+" ",f.baseId=v,a+=" "+h+" = "+h+" || "+m+"; if (!"+h+") { ",p+="}";r.compositeRule=f.compositeRule=g,a+=" "+p+" if (!"+h+") {   var err =   ",!1!==r.createErrors?(a+=" { keyword: 'anyOf' , dataPath: (dataPath || '') + "+r.errorPath+" , schemaPath: "+r.util.toQuotedString(l)+" , params: {} ",!1!==r.opts.messages&&(a+=" , message: 'should match some schema in anyOf' "),r.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+r.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!r.compositeRule&&u&&(a+=r.async?" throw new ValidationError(vErrors); ":" validate.errors = vErrors; return false; "),a+=" } else {  errors = "+d+"; if (vErrors !== null) { if ("+d+") vErrors.length = "+d+"; else vErrors = null; } ",r.opts.allErrors&&(a+=" } "),a=r.util.cleanUpCode(a)}else u&&(a+=" if (true) { ");return a}},{}],18:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.errSchemaPath+"/"+r,o=e.util.toQuotedString(e.schema[r]);return!0===e.opts.$comment?a+=" console.log("+o+");":"function"==typeof e.opts.$comment&&(a+=" self._opts.$comment("+o+", "+e.util.toQuotedString(s)+", validate.root.schema);"),a}},{}],19:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d=e.opts.$data&&i&&i.$data;d&&(a+=" var schema"+s+" = "+e.util.getData(i.$data,o,e.dataPathArr)+"; "),d||(a+=" var schema"+s+" = validate.schema"+n+";");var f=f||[];f.push(a+="var "+h+" = equal("+c+", schema"+s+"); if (!"+h+") {   "),a="",!1!==e.createErrors?(a+=" { keyword: 'const' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { allowedValue: schema"+s+" } ",!1!==e.opts.messages&&(a+=" , message: 'should be equal to constant' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var p=a;return a=f.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+p+"]); ":" validate.errors = ["+p+"]; return false; ":" var err = "+p+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" }",u&&(a+=" else { "),a}},{}],20:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d="errs__"+s,f=e.util.copy(e);f.level++;var p="valid"+f.level,m="i"+s,v=f.dataLevel=e.dataLevel+1,g="data"+v,y=e.baseId,P=e.util.schemaHasRules(i,e.RULES.all);if(a+="var "+d+" = errors;var "+h+";",P){var E=e.compositeRule;e.compositeRule=f.compositeRule=!0,f.schema=i,f.schemaPath=n,f.errSchemaPath=l,a+=" var "+p+" = false; for (var "+m+" = 0; "+m+" < "+c+".length; "+m+"++) { ",f.errorPath=e.util.getPathExpr(e.errorPath,m,e.opts.jsonPointers,!0);var w=c+"["+m+"]";f.dataPathArr[v]=m;var S=e.validate(f);f.baseId=y,e.util.varOccurences(S,g)<2?a+=" "+e.util.varReplace(S,g,w)+" ":a+=" var "+g+" = "+w+"; "+S+" ",a+=" if ("+p+") break; }  ",e.compositeRule=f.compositeRule=E,a+="  if (!"+p+") {"}else a+=" if ("+c+".length == 0) {";var b=b||[];b.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'contains' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(a+=" , message: 'should contain a valid item' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var _=a;return a=b.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+_+"]); ":" validate.errors = ["+_+"]; return false; ":" var err = "+_+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } else { ",P&&(a+="  errors = "+d+"; if (vErrors !== null) { if ("+d+") vErrors.length = "+d+"; else vErrors = null; } "),e.opts.allErrors&&(a+=" } "),a=e.util.cleanUpCode(a)}},{}],21:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s,o=" ",i=e.level,n=e.dataLevel,l=e.schema[r],u=e.schemaPath+e.util.getProperty(r),c=e.errSchemaPath+"/"+r,h=!e.opts.allErrors,d="data"+(n||""),f="valid"+i,p="errs__"+i,m=e.opts.$data&&l&&l.$data;m?(o+=" var schema"+i+" = "+e.util.getData(l.$data,n,e.dataPathArr)+"; ",s="schema"+i):s=l;var v,g,y,P,E,w=this,S="definition"+i,b=w.definition,_="";if(m&&b.$data){var F=b.validateSchema;o+=" var "+S+" = RULES.custom['"+r+"'].definition; var "+(E="keywordValidate"+i)+" = "+S+".validate;"}else{if(!(P=e.useCustomRule(w,l,e.schema,e)))return;s="validate.schema"+u,E=P.code,v=b.compile,g=b.inline,y=b.macro}var x=E+".errors",R="i"+i,$="ruleErr"+i,D=b.async;if(D&&!e.async)throw new Error("async keyword in sync schema");if(g||y||(o+=x+" = null;"),o+="var "+p+" = errors;var "+f+";",m&&b.$data&&(_+="}",o+=" if ("+s+" === undefined) { "+f+" = true; } else { ",F&&(_+="}",o+=" "+f+" = "+S+".validateSchema("+s+"); if ("+f+") { ")),g)o+=b.statements?" "+P.validate+" ":" "+f+" = "+P.validate+"; ";else if(y){var j=e.util.copy(e);_="";j.level++;var I="valid"+j.level;j.schema=P.validate,j.schemaPath="";var O=e.compositeRule;e.compositeRule=j.compositeRule=!0;var A=e.validate(j).replace(/validate\.schema/g,E);e.compositeRule=j.compositeRule=O,o+=" "+A}else{(z=z||[]).push(o),o="",o+="  "+E+".call( ",o+=e.opts.passContext?"this":"self",o+=v||!1===b.schema?" , "+d+" ":" , "+s+" , "+d+" , validate.schema"+e.schemaPath+" ",o+=" , (dataPath || '')",'""'!=e.errorPath&&(o+=" + "+e.errorPath);var C=n?"data"+(n-1||""):"parentData",k=n?e.dataPathArr[n]:"parentDataProperty",L=o+=" , "+C+" , "+k+" , rootData )  ";o=z.pop(),!1===b.errors?(o+=" "+f+" = ",D&&(o+="await "),o+=L+"; "):o+=D?" var "+(x="customErrors"+i)+" = null; try { "+f+" = await "+L+"; } catch (e) { "+f+" = false; if (e instanceof ValidationError) "+x+" = e.errors; else throw e; } ":" "+x+" = null; "+f+" = "+L+"; "}if(b.modifying&&(o+=" if ("+C+") "+d+" = "+C+"["+k+"];"),o+=""+_,b.valid)h&&(o+=" if (true) { ");else{var z;o+=" if ( ",void 0===b.valid?(o+=" !",o+=y?""+I:""+f):o+=" "+!b.valid+" ",a=w.keyword,(z=z||[]).push(o+=") { "),(z=z||[]).push(o=""),o="",!1!==e.createErrors?(o+=" { keyword: '"+(a||"custom")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { keyword: '"+w.keyword+"' } ",!1!==e.opts.messages&&(o+=" , message: 'should pass \""+w.keyword+"\" keyword validation' "),e.opts.verbose&&(o+=" , schema: validate.schema"+u+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),o+=" } "):o+=" {} ";var T=o;o=z.pop();var N=o+=!e.compositeRule&&h?e.async?" throw new ValidationError(["+T+"]); ":" validate.errors = ["+T+"]; return false; ":" var err = "+T+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";o=z.pop(),g?b.errors?"full"!=b.errors&&(o+="  for (var "+R+"="+p+"; "+R+"<errors; "+R+"++) { var "+$+" = vErrors["+R+"]; if ("+$+".dataPath === undefined) "+$+".dataPath = (dataPath || '') + "+e.errorPath+"; if ("+$+".schemaPath === undefined) { "+$+'.schemaPath = "'+c+'"; } ',e.opts.verbose&&(o+=" "+$+".schema = "+s+"; "+$+".data = "+d+"; "),o+=" } "):!1===b.errors?o+=" "+N+" ":(o+=" if ("+p+" == errors) { "+N+" } else {  for (var "+R+"="+p+"; "+R+"<errors; "+R+"++) { var "+$+" = vErrors["+R+"]; if ("+$+".dataPath === undefined) "+$+".dataPath = (dataPath || '') + "+e.errorPath+"; if ("+$+".schemaPath === undefined) { "+$+'.schemaPath = "'+c+'"; } ',e.opts.verbose&&(o+=" "+$+".schema = "+s+"; "+$+".data = "+d+"; "),o+=" } } "):y?(o+="   var err =   ",!1!==e.createErrors?(o+=" { keyword: '"+(a||"custom")+"' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(c)+" , params: { keyword: '"+w.keyword+"' } ",!1!==e.opts.messages&&(o+=" , message: 'should pass \""+w.keyword+"\" keyword validation' "),e.opts.verbose&&(o+=" , schema: validate.schema"+u+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+d+" "),o+=" } "):o+=" {} ",o+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&h&&(o+=e.async?" throw new ValidationError(vErrors); ":" validate.errors = vErrors; return false; ")):!1===b.errors?o+=" "+N+" ":(o+=" if (Array.isArray("+x+")) { if (vErrors === null) vErrors = "+x+"; else vErrors = vErrors.concat("+x+"); errors = vErrors.length;  for (var "+R+"="+p+"; "+R+"<errors; "+R+"++) { var "+$+" = vErrors["+R+"]; if ("+$+".dataPath === undefined) "+$+".dataPath = (dataPath || '') + "+e.errorPath+";  "+$+'.schemaPath = "'+c+'";  ',e.opts.verbose&&(o+=" "+$+".schema = "+s+"; "+$+".data = "+d+"; "),o+=" } } else { "+N+" } "),o+=" } ",h&&(o+=" else { ")}return o}},{}],22:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="errs__"+s,d=e.util.copy(e),f="";d.level++;var p="valid"+d.level,m={},v={},g=e.opts.ownProperties;for(w in i){var y=i[w],P=Array.isArray(y)?v:m;P[w]=y}a+="var "+h+" = errors;";var E=e.errorPath;for(var w in a+="var missing"+s+";",v)if((P=v[w]).length){if(a+=" if ( "+c+e.util.getProperty(w)+" !== undefined ",g&&(a+=" && Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(w)+"') "),u){a+=" && ( ";var S=P;if(S)for(var b=-1,_=S.length-1;b<_;){j=S[b+=1],b&&(a+=" || "),a+=" ( ( "+(C=c+(A=e.util.getProperty(j)))+" === undefined ",g&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(j)+"') "),a+=") && (missing"+s+" = "+e.util.toQuotedString(e.opts.jsonPointers?j:A)+") ) "}a+=")) {  ";var F="missing"+s,x="' + "+F+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.opts.jsonPointers?e.util.getPathExpr(E,F,!0):E+" + "+F);var R=R||[];R.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'dependencies' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { property: '"+e.util.escapeQuotes(w)+"', missingProperty: '"+x+"', depsCount: "+P.length+", deps: '"+e.util.escapeQuotes(1==P.length?P[0]:P.join(", "))+"' } ",!1!==e.opts.messages&&(a+=" , message: 'should have ",a+=1==P.length?"property "+e.util.escapeQuotes(P[0]):"properties "+e.util.escapeQuotes(P.join(", ")),a+=" when property "+e.util.escapeQuotes(w)+" is present' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var $=a;a=R.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+$+"]); ":" validate.errors = ["+$+"]; return false; ":" var err = "+$+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}else{a+=" ) { ";var D=P;if(D)for(var j,I=-1,O=D.length-1;I<O;){j=D[I+=1];var A=e.util.getProperty(j),C=(x=e.util.escapeQuotes(j),c+A);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(E,j,e.opts.jsonPointers)),a+=" if ( "+C+" === undefined ",g&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(j)+"') "),a+=") {  var err =   ",!1!==e.createErrors?(a+=" { keyword: 'dependencies' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { property: '"+e.util.escapeQuotes(w)+"', missingProperty: '"+x+"', depsCount: "+P.length+", deps: '"+e.util.escapeQuotes(1==P.length?P[0]:P.join(", "))+"' } ",!1!==e.opts.messages&&(a+=" , message: 'should have ",a+=1==P.length?"property "+e.util.escapeQuotes(P[0]):"properties "+e.util.escapeQuotes(P.join(", ")),a+=" when property "+e.util.escapeQuotes(w)+" is present' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "}}a+=" }   ",u&&(f+="}",a+=" else { ")}e.errorPath=E;var k=d.baseId;for(var w in m){e.util.schemaHasRules(y=m[w],e.RULES.all)&&(a+=" "+p+" = true; if ( "+c+e.util.getProperty(w)+" !== undefined ",g&&(a+=" && Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(w)+"') "),a+=") { ",d.schema=y,d.schemaPath=n+e.util.getProperty(w),d.errSchemaPath=l+"/"+e.util.escapeFragment(w),a+="  "+e.validate(d)+" ",d.baseId=k,a+=" }  ",u&&(a+=" if ("+p+") { ",f+="}"))}return u&&(a+="   "+f+" if ("+h+" == errors) {"),a=e.util.cleanUpCode(a)}},{}],23:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d=e.opts.$data&&i&&i.$data;d&&(a+=" var schema"+s+" = "+e.util.getData(i.$data,o,e.dataPathArr)+"; ");var f="i"+s,p="schema"+s;d||(a+=" var "+p+" = validate.schema"+n+";"),a+="var "+h+";",d&&(a+=" if (schema"+s+" === undefined) "+h+" = true; else if (!Array.isArray(schema"+s+")) "+h+" = false; else {"),a+=h+" = false;for (var "+f+"=0; "+f+"<"+p+".length; "+f+"++) if (equal("+c+", "+p+"["+f+"])) { "+h+" = true; break; }",d&&(a+="  }  ");var m=m||[];m.push(a+=" if (!"+h+") {   "),a="",!1!==e.createErrors?(a+=" { keyword: 'enum' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { allowedValues: schema"+s+" } ",!1!==e.opts.messages&&(a+=" , message: 'should be equal to one of the allowed values' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var v=a;return a=m.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+v+"]); ":" validate.errors = ["+v+"]; return false; ":" var err = "+v+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" }",u&&(a+=" else { "),a}},{}],24:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||"");if(!1===e.opts.format)return u&&(a+=" if (true) { "),a;var h,d=e.opts.$data&&i&&i.$data;d?(a+=" var schema"+s+" = "+e.util.getData(i.$data,o,e.dataPathArr)+"; ",h="schema"+s):h=i;var f=e.opts.unknownFormats,p=Array.isArray(f);if(d){a+=" var "+(m="format"+s)+" = formats["+h+"]; var "+(v="isObject"+s)+" = typeof "+m+" == 'object' && !("+m+" instanceof RegExp) && "+m+".validate; var "+(g="formatType"+s)+" = "+v+" && "+m+".type || 'string'; if ("+v+") { ",e.async&&(a+=" var async"+s+" = "+m+".async; "),a+=" "+m+" = "+m+".validate; } if (  ",d&&(a+=" ("+h+" !== undefined && typeof "+h+" != 'string') || "),a+=" (","ignore"!=f&&(a+=" ("+h+" && !"+m+" ",p&&(a+=" && self._opts.unknownFormats.indexOf("+h+") == -1 "),a+=") || "),a+=" ("+m+" && "+g+" == '"+t+"' && !(typeof "+m+" == 'function' ? ",a+=e.async?" (async"+s+" ? await "+m+"("+c+") : "+m+"("+c+")) ":" "+m+"("+c+") ",a+=" : "+m+".test("+c+"))))) {"}else{var m;if(!(m=e.formats[i])){if("ignore"==f)return e.logger.warn('unknown format "'+i+'" ignored in schema at path "'+e.errSchemaPath+'"'),u&&(a+=" if (true) { "),a;if(p&&0<=f.indexOf(i))return u&&(a+=" if (true) { "),a;throw new Error('unknown format "'+i+'" is used in schema at path "'+e.errSchemaPath+'"')}var v,g=(v="object"==typeof m&&!(m instanceof RegExp)&&m.validate)&&m.type||"string";if(v){var y=!0===m.async;m=m.validate}if(g!=t)return u&&(a+=" if (true) { "),a;if(y){if(!e.async)throw new Error("async format in sync schema");a+=" if (!(await "+(P="formats"+e.util.getProperty(i)+".validate")+"("+c+"))) { "}else{a+=" if (! ";var P="formats"+e.util.getProperty(i);v&&(P+=".validate"),a+="function"==typeof m?" "+P+"("+c+") ":" "+P+".test("+c+") ",a+=") { "}}var E=E||[];E.push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'format' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { format:  ",a+=d?""+h:""+e.util.toQuotedString(i),a+="  } ",!1!==e.opts.messages&&(a+=" , message: 'should match format \"",a+=d?"' + "+h+" + '":""+e.util.escapeQuotes(i),a+="\"' "),e.opts.verbose&&(a+=" , schema:  ",a+=d?"validate.schema"+n:""+e.util.toQuotedString(i),a+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var w=a;return a=E.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+w+"]); ":" validate.errors = ["+w+"]; return false; ":" var err = "+w+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } ",u&&(a+=" else { "),a}},{}],25:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d="errs__"+s,f=e.util.copy(e);f.level++;var p="valid"+f.level,m=e.schema.then,v=e.schema.else,g=void 0!==m&&e.util.schemaHasRules(m,e.RULES.all),y=void 0!==v&&e.util.schemaHasRules(v,e.RULES.all),P=f.baseId;if(g||y){var E;f.createErrors=!1,f.schema=i,f.schemaPath=n,f.errSchemaPath=l,a+=" var "+d+" = errors; var "+h+" = true;  ";var w=e.compositeRule;e.compositeRule=f.compositeRule=!0,a+="  "+e.validate(f)+" ",f.baseId=P,f.createErrors=!0,a+="  errors = "+d+"; if (vErrors !== null) { if ("+d+") vErrors.length = "+d+"; else vErrors = null; }  ",e.compositeRule=f.compositeRule=w,g?(a+=" if ("+p+") {  ",f.schema=e.schema.then,f.schemaPath=e.schemaPath+".then",f.errSchemaPath=e.errSchemaPath+"/then",a+="  "+e.validate(f)+" ",f.baseId=P,a+=" "+h+" = "+p+"; ",g&&y?a+=" var "+(E="ifClause"+s)+" = 'then'; ":E="'then'",a+=" } ",y&&(a+=" else { ")):a+=" if (!"+p+") { ",y&&(f.schema=e.schema.else,f.schemaPath=e.schemaPath+".else",f.errSchemaPath=e.errSchemaPath+"/else",a+="  "+e.validate(f)+" ",f.baseId=P,a+=" "+h+" = "+p+"; ",g&&y?a+=" var "+(E="ifClause"+s)+" = 'else'; ":E="'else'",a+=" } "),a+=" if (!"+h+") {   var err =   ",!1!==e.createErrors?(a+=" { keyword: 'if' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { failingKeyword: "+E+" } ",!1!==e.opts.messages&&(a+=" , message: 'should match \"' + "+E+" + '\" schema' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&u&&(a+=e.async?" throw new ValidationError(vErrors); ":" validate.errors = vErrors; return false; "),a+=" }   ",u&&(a+=" else { "),a=e.util.cleanUpCode(a)}else u&&(a+=" if (true) { ");return a}},{}],26:[function(e,r,t){"use strict";r.exports={$ref:e("./ref"),allOf:e("./allOf"),anyOf:e("./anyOf"),$comment:e("./comment"),const:e("./const"),contains:e("./contains"),dependencies:e("./dependencies"),enum:e("./enum"),format:e("./format"),if:e("./if"),items:e("./items"),maximum:e("./_limit"),minimum:e("./_limit"),maxItems:e("./_limitItems"),minItems:e("./_limitItems"),maxLength:e("./_limitLength"),minLength:e("./_limitLength"),maxProperties:e("./_limitProperties"),minProperties:e("./_limitProperties"),multipleOf:e("./multipleOf"),not:e("./not"),oneOf:e("./oneOf"),pattern:e("./pattern"),properties:e("./properties"),propertyNames:e("./propertyNames"),required:e("./required"),uniqueItems:e("./uniqueItems"),validate:e("./validate")}},{"./_limit":12,"./_limitItems":13,"./_limitLength":14,"./_limitProperties":15,"./allOf":16,"./anyOf":17,"./comment":18,"./const":19,"./contains":20,"./dependencies":22,"./enum":23,"./format":24,"./if":25,"./items":27,"./multipleOf":28,"./not":29,"./oneOf":30,"./pattern":31,"./properties":32,"./propertyNames":33,"./ref":34,"./required":35,"./uniqueItems":36,"./validate":37}],27:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d="errs__"+s,f=e.util.copy(e),p="";f.level++;var m="valid"+f.level,v="i"+s,g=f.dataLevel=e.dataLevel+1,y="data"+g,P=e.baseId;if(a+="var "+d+" = errors;var "+h+";",Array.isArray(i)){var E=e.schema.additionalItems;if(!1===E){a+=" "+h+" = "+c+".length <= "+i.length+"; ";var w=l;l=e.errSchemaPath+"/additionalItems";var S=S||[];S.push(a+="  if (!"+h+") {   "),a="",!1!==e.createErrors?(a+=" { keyword: 'additionalItems' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { limit: "+i.length+" } ",!1!==e.opts.messages&&(a+=" , message: 'should NOT have more than "+i.length+" items' "),e.opts.verbose&&(a+=" , schema: false , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var b=a;a=S.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+b+"]); ":" validate.errors = ["+b+"]; return false; ":" var err = "+b+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } ",l=w,u&&(p+="}",a+=" else { ")}var _=i;if(_)for(var F,x=-1,R=_.length-1;x<R;)if(F=_[x+=1],e.util.schemaHasRules(F,e.RULES.all)){a+=" "+m+" = true; if ("+c+".length > "+x+") { ";var $=c+"["+x+"]";f.schema=F,f.schemaPath=n+"["+x+"]",f.errSchemaPath=l+"/"+x,f.errorPath=e.util.getPathExpr(e.errorPath,x,e.opts.jsonPointers,!0),f.dataPathArr[g]=x;var D=e.validate(f);f.baseId=P,e.util.varOccurences(D,y)<2?a+=" "+e.util.varReplace(D,y,$)+" ":a+=" var "+y+" = "+$+"; "+D+" ",a+=" }  ",u&&(a+=" if ("+m+") { ",p+="}")}if("object"==typeof E&&e.util.schemaHasRules(E,e.RULES.all)){f.schema=E,f.schemaPath=e.schemaPath+".additionalItems",f.errSchemaPath=e.errSchemaPath+"/additionalItems",a+=" "+m+" = true; if ("+c+".length > "+i.length+") {  for (var "+v+" = "+i.length+"; "+v+" < "+c+".length; "+v+"++) { ",f.errorPath=e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers,!0);$=c+"["+v+"]";f.dataPathArr[g]=v;D=e.validate(f);f.baseId=P,e.util.varOccurences(D,y)<2?a+=" "+e.util.varReplace(D,y,$)+" ":a+=" var "+y+" = "+$+"; "+D+" ",u&&(a+=" if (!"+m+") break; "),a+=" } }  ",u&&(a+=" if ("+m+") { ",p+="}")}}else if(e.util.schemaHasRules(i,e.RULES.all)){f.schema=i,f.schemaPath=n,f.errSchemaPath=l,a+="  for (var "+v+" = 0; "+v+" < "+c+".length; "+v+"++) { ",f.errorPath=e.util.getPathExpr(e.errorPath,v,e.opts.jsonPointers,!0);$=c+"["+v+"]";f.dataPathArr[g]=v;D=e.validate(f);f.baseId=P,e.util.varOccurences(D,y)<2?a+=" "+e.util.varReplace(D,y,$)+" ":a+=" var "+y+" = "+$+"; "+D+" ",u&&(a+=" if (!"+m+") break; "),a+=" }"}return u&&(a+=" "+p+" if ("+d+" == errors) {"),a=e.util.cleanUpCode(a)}},{}],28:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n,s+="var division"+o+";if (",d&&(s+=" "+a+" !== undefined && ( typeof "+a+" != 'number' || "),s+=" (division"+o+" = "+h+" / "+a+", ",s+=e.opts.multipleOfPrecision?" Math.abs(Math.round(division"+o+") - division"+o+") > 1e-"+e.opts.multipleOfPrecision+" ":" division"+o+" !== parseInt(division"+o+") ",s+=" ) ",d&&(s+="  )  ");var f=f||[];f.push(s+=" ) {   "),s="",!1!==e.createErrors?(s+=" { keyword: 'multipleOf' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { multipleOf: "+a+" } ",!1!==e.opts.messages&&(s+=" , message: 'should be multiple of ",s+=d?"' + "+a:a+"'"),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var p=s;return s=f.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+p+"]); ":" validate.errors = ["+p+"]; return false; ":" var err = "+p+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+="} ",c&&(s+=" else { "),s}},{}],29:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="errs__"+s,d=e.util.copy(e);d.level++;var f="valid"+d.level;if(e.util.schemaHasRules(i,e.RULES.all)){d.schema=i,d.schemaPath=n,d.errSchemaPath=l,a+=" var "+h+" = errors;  ";var p,m=e.compositeRule;e.compositeRule=d.compositeRule=!0,d.createErrors=!1,d.opts.allErrors&&(p=d.opts.allErrors,d.opts.allErrors=!1),a+=" "+e.validate(d)+" ",d.createErrors=!0,p&&(d.opts.allErrors=p),e.compositeRule=d.compositeRule=m;var v=v||[];v.push(a+=" if ("+f+") {   "),a="",!1!==e.createErrors?(a+=" { keyword: 'not' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(a+=" , message: 'should NOT be valid' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var g=a;a=v.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+g+"]); ":" validate.errors = ["+g+"]; return false; ":" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } else {  errors = "+h+"; if (vErrors !== null) { if ("+h+") vErrors.length = "+h+"; else vErrors = null; } ",e.opts.allErrors&&(a+=" } ")}else a+="  var err =   ",!1!==e.createErrors?(a+=" { keyword: 'not' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: {} ",!1!==e.opts.messages&&(a+=" , message: 'should NOT be valid' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",u&&(a+=" if (false) { ");return a}},{}],30:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d="errs__"+s,f=e.util.copy(e),p="";f.level++;var m="valid"+f.level,v=f.baseId,g="prevValid"+s,y="passingSchemas"+s;a+="var "+d+" = errors , "+g+" = false , "+h+" = false , "+y+" = null; ";var P=e.compositeRule;e.compositeRule=f.compositeRule=!0;var E=i;if(E)for(var w,S=-1,b=E.length-1;S<b;)w=E[S+=1],e.util.schemaHasRules(w,e.RULES.all)?(f.schema=w,f.schemaPath=n+"["+S+"]",f.errSchemaPath=l+"/"+S,a+="  "+e.validate(f)+" ",f.baseId=v):a+=" var "+m+" = true; ",S&&(a+=" if ("+m+" && "+g+") { "+h+" = false; "+y+" = ["+y+", "+S+"]; } else { ",p+="}"),a+=" if ("+m+") { "+h+" = "+g+" = true; "+y+" = "+S+"; }";return e.compositeRule=f.compositeRule=P,a+=p+"if (!"+h+") {   var err =   ",!1!==e.createErrors?(a+=" { keyword: 'oneOf' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { passingSchemas: "+y+" } ",!1!==e.opts.messages&&(a+=" , message: 'should match exactly one schema in oneOf' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&u&&(a+=e.async?" throw new ValidationError(vErrors); ":" validate.errors = vErrors; return false; "),a+="} else {  errors = "+d+"; if (vErrors !== null) { if ("+d+") vErrors.length = "+d+"; else vErrors = null; }",e.opts.allErrors&&(a+=" } "),a}},{}],31:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d=e.opts.$data&&n&&n.$data;d?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n;var f=d?"(new RegExp("+a+"))":e.usePattern(n);s+="if ( ",d&&(s+=" ("+a+" !== undefined && typeof "+a+" != 'string') || ");var p=p||[];p.push(s+=" !"+f+".test("+h+") ) {   "),s="",!1!==e.createErrors?(s+=" { keyword: 'pattern' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { pattern:  ",s+=d?""+a:""+e.util.toQuotedString(n),s+="  } ",!1!==e.opts.messages&&(s+=" , message: 'should match pattern \"",s+=d?"' + "+a+" + '":""+e.util.escapeQuotes(n),s+="\"' "),e.opts.verbose&&(s+=" , schema:  ",s+=d?"validate.schema"+l:""+e.util.toQuotedString(n),s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var m=s;return s=p.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+="} ",c&&(s+=" else { "),s}},{}],32:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="errs__"+s,d=e.util.copy(e),f="";d.level++;var p="valid"+d.level,m="key"+s,v="idx"+s,g=d.dataLevel=e.dataLevel+1,y="data"+g,P="dataProperties"+s,E=Object.keys(i||{}),w=e.schema.patternProperties||{},S=Object.keys(w),b=e.schema.additionalProperties,_=E.length||S.length,F=!1===b,x="object"==typeof b&&Object.keys(b).length,R=e.opts.removeAdditional,$=F||x||R,D=e.opts.ownProperties,j=e.baseId,I=e.schema.required;if(I&&(!e.opts.$data||!I.$data)&&I.length<e.opts.loopRequired)var O=e.util.toHash(I);if(a+="var "+h+" = errors;var "+p+" = true;",D&&(a+=" var "+P+" = undefined;"),$){if(a+=D?" "+P+" = "+P+" || Object.keys("+c+"); for (var "+v+"=0; "+v+"<"+P+".length; "+v+"++) { var "+m+" = "+P+"["+v+"]; ":" for (var "+m+" in "+c+") { ",_){if(a+=" var isAdditional"+s+" = !(false ",E.length)if(8<E.length)a+=" || validate.schema"+n+".hasOwnProperty("+m+") ";else{var A=E;if(A)for(var C=-1,k=A.length-1;C<k;)J=A[C+=1],a+=" || "+m+" == "+e.util.toQuotedString(J)+" "}if(S.length){var L=S;if(L)for(var z=-1,T=L.length-1;z<T;)ae=L[z+=1],a+=" || "+e.usePattern(ae)+".test("+m+") "}a+=" ); if (isAdditional"+s+") { "}if("all"==R)a+=" delete "+c+"["+m+"]; ";else{var N=e.errorPath,q="' + "+m+" + '";if(e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(e.errorPath,m,e.opts.jsonPointers)),F)if(R)a+=" delete "+c+"["+m+"]; ";else{var U=l;l=e.errSchemaPath+"/additionalProperties",(ee=ee||[]).push(a+=" "+p+" = false; "),a="",!1!==e.createErrors?(a+=" { keyword: 'additionalProperties' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { additionalProperty: '"+q+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is an invalid additional property":"should NOT have additional properties",a+="' "),e.opts.verbose&&(a+=" , schema: false , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var Q=a;a=ee.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+Q+"]); ":" validate.errors = ["+Q+"]; return false; ":" var err = "+Q+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",l=U,u&&(a+=" break; ")}else if(x)if("failing"==R){a+=" var "+h+" = errors;  ";var V=e.compositeRule;e.compositeRule=d.compositeRule=!0,d.schema=b,d.schemaPath=e.schemaPath+".additionalProperties",d.errSchemaPath=e.errSchemaPath+"/additionalProperties",d.errorPath=e.opts._errorDataPathProperty?e.errorPath:e.util.getPathExpr(e.errorPath,m,e.opts.jsonPointers);var H=c+"["+m+"]";d.dataPathArr[g]=m;var M=e.validate(d);d.baseId=j,e.util.varOccurences(M,y)<2?a+=" "+e.util.varReplace(M,y,H)+" ":a+=" var "+y+" = "+H+"; "+M+" ",a+=" if (!"+p+") { errors = "+h+"; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete "+c+"["+m+"]; }  ",e.compositeRule=d.compositeRule=V}else{d.schema=b,d.schemaPath=e.schemaPath+".additionalProperties",d.errSchemaPath=e.errSchemaPath+"/additionalProperties",d.errorPath=e.opts._errorDataPathProperty?e.errorPath:e.util.getPathExpr(e.errorPath,m,e.opts.jsonPointers);H=c+"["+m+"]";d.dataPathArr[g]=m;M=e.validate(d);d.baseId=j,e.util.varOccurences(M,y)<2?a+=" "+e.util.varReplace(M,y,H)+" ":a+=" var "+y+" = "+H+"; "+M+" ",u&&(a+=" if (!"+p+") break; ")}e.errorPath=N}_&&(a+=" } "),a+=" }  ",u&&(a+=" if ("+p+") { ",f+="}")}var B=e.opts.useDefaults&&!e.compositeRule;if(E.length){var K=E;if(K)for(var J,Z=-1,G=K.length-1;Z<G;){if(J=K[Z+=1],e.util.schemaHasRules(ie=i[J],e.RULES.all)){var Y=e.util.getProperty(J),W=(H=c+Y,B&&void 0!==ie.default);d.schema=ie,d.schemaPath=n+Y,d.errSchemaPath=l+"/"+e.util.escapeFragment(J),d.errorPath=e.util.getPath(e.errorPath,J,e.opts.jsonPointers),d.dataPathArr[g]=e.util.toQuotedString(J);M=e.validate(d);if(d.baseId=j,e.util.varOccurences(M,y)<2){M=e.util.varReplace(M,y,H);var X=H}else{X=y;a+=" var "+y+" = "+H+"; "}if(W)a+=" "+M+" ";else{if(O&&O[J]){a+=" if ( "+X+" === undefined ",D&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(J)+"') "),a+=") { "+p+" = false; ";N=e.errorPath,U=l;var ee,re=e.util.escapeQuotes(J);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(N,J,e.opts.jsonPointers)),l=e.errSchemaPath+"/required",(ee=ee||[]).push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+re+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+re+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";Q=a;a=ee.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+Q+"]); ":" validate.errors = ["+Q+"]; return false; ":" var err = "+Q+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",l=U,e.errorPath=N,a+=" } else { "}else u?(a+=" if ( "+X+" === undefined ",D&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(J)+"') "),a+=") { "+p+" = true; } else { "):(a+=" if ("+X+" !== undefined ",D&&(a+=" &&   Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(J)+"') "),a+=" ) { ");a+=" "+M+" } "}}u&&(a+=" if ("+p+") { ",f+="}")}}if(S.length){var te=S;if(te)for(var ae,se=-1,oe=te.length-1;se<oe;){var ie;if(ae=te[se+=1],e.util.schemaHasRules(ie=w[ae],e.RULES.all)){d.schema=ie,d.schemaPath=e.schemaPath+".patternProperties"+e.util.getProperty(ae),d.errSchemaPath=e.errSchemaPath+"/patternProperties/"+e.util.escapeFragment(ae),a+=D?" "+P+" = "+P+" || Object.keys("+c+"); for (var "+v+"=0; "+v+"<"+P+".length; "+v+"++) { var "+m+" = "+P+"["+v+"]; ":" for (var "+m+" in "+c+") { ",a+=" if ("+e.usePattern(ae)+".test("+m+")) { ",d.errorPath=e.util.getPathExpr(e.errorPath,m,e.opts.jsonPointers);H=c+"["+m+"]";d.dataPathArr[g]=m;M=e.validate(d);d.baseId=j,e.util.varOccurences(M,y)<2?a+=" "+e.util.varReplace(M,y,H)+" ":a+=" var "+y+" = "+H+"; "+M+" ",u&&(a+=" if (!"+p+") break; "),a+=" } ",u&&(a+=" else "+p+" = true; "),a+=" }  ",u&&(a+=" if ("+p+") { ",f+="}")}}}return u&&(a+=" "+f+" if ("+h+" == errors) {"),a=e.util.cleanUpCode(a)}},{}],33:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="errs__"+s,d=e.util.copy(e);d.level++;var f="valid"+d.level;if(e.util.schemaHasRules(i,e.RULES.all)){d.schema=i,d.schemaPath=n,d.errSchemaPath=l;var p="key"+s,m="idx"+s,v="i"+s,g="' + "+p+" + '",y="data"+(d.dataLevel=e.dataLevel+1),P="dataProperties"+s,E=e.opts.ownProperties,w=e.baseId;a+=" var "+h+" = errors; ",E&&(a+=" var "+P+" = undefined; "),a+=E?" "+P+" = "+P+" || Object.keys("+c+"); for (var "+m+"=0; "+m+"<"+P+".length; "+m+"++) { var "+p+" = "+P+"["+m+"]; ":" for (var "+p+" in "+c+") { ",a+=" var startErrs"+s+" = errors; ";var S=p,b=e.compositeRule;e.compositeRule=d.compositeRule=!0;var _=e.validate(d);d.baseId=w,e.util.varOccurences(_,y)<2?a+=" "+e.util.varReplace(_,y,S)+" ":a+=" var "+y+" = "+S+"; "+_+" ",e.compositeRule=d.compositeRule=b,a+=" if (!"+f+") { for (var "+v+"=startErrs"+s+"; "+v+"<errors; "+v+"++) { vErrors["+v+"].propertyName = "+p+"; }   var err =   ",!1!==e.createErrors?(a+=" { keyword: 'propertyNames' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { propertyName: '"+g+"' } ",!1!==e.opts.messages&&(a+=" , message: 'property name \\'"+g+"\\' is invalid' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",!e.compositeRule&&u&&(a+=e.async?" throw new ValidationError(vErrors); ":" validate.errors = vErrors; return false; "),u&&(a+=" break; "),a+=" } }"}return u&&(a+="  if ("+h+" == errors) {"),a=e.util.cleanUpCode(a)}},{}],34:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s,o=" ",i=e.dataLevel,n=e.schema[r],l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(i||""),h="valid"+e.level;if("#"==n||"#/"==n)e.isRoot?(a=e.async,s="validate"):(a=!0===e.root.schema.$async,s="root.refVal[0]");else{var d=e.resolveRef(e.baseId,n,e.isRoot);if(void 0===d){var f=e.MissingRefError.message(e.baseId,n);if("fail"==e.opts.missingRefs){e.logger.error(f),(g=g||[]).push(o),o="",!1!==e.createErrors?(o+=" { keyword: '$ref' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { ref: '"+e.util.escapeQuotes(n)+"' } ",!1!==e.opts.messages&&(o+=" , message: 'can\\'t resolve reference "+e.util.escapeQuotes(n)+"' "),e.opts.verbose&&(o+=" , schema: "+e.util.toQuotedString(n)+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),o+=" } "):o+=" {} ";var p=o;o=g.pop(),o+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+p+"]); ":" validate.errors = ["+p+"]; return false; ":" var err = "+p+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",u&&(o+=" if (false) { ")}else{if("ignore"!=e.opts.missingRefs)throw new e.MissingRefError(e.baseId,n,f);e.logger.warn(f),u&&(o+=" if (true) { ")}}else if(d.inline){var m=e.util.copy(e);m.level++;var v="valid"+m.level;m.schema=d.schema,m.schemaPath="",m.errSchemaPath=n,o+=" "+e.validate(m).replace(/validate\.schema/g,d.code)+" ",u&&(o+=" if ("+v+") { ")}else a=!0===d.$async||e.async&&!1!==d.$async,s=d.code}if(s){var g;(g=g||[]).push(o),o="",o+=e.opts.passContext?" "+s+".call(this, ":" "+s+"( ",o+=" "+c+", (dataPath || '')",'""'!=e.errorPath&&(o+=" + "+e.errorPath);var y=o+=" , "+(i?"data"+(i-1||""):"parentData")+" , "+(i?e.dataPathArr[i]:"parentDataProperty")+", rootData)  ";if(o=g.pop(),a){if(!e.async)throw new Error("async schema referenced by sync schema");u&&(o+=" var "+h+"; "),o+=" try { await "+y+"; ",u&&(o+=" "+h+" = true; "),o+=" } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ",u&&(o+=" "+h+" = false; "),o+=" } ",u&&(o+=" if ("+h+") { ")}else o+=" if (!"+y+") { if (vErrors === null) vErrors = "+s+".errors; else vErrors = vErrors.concat("+s+".errors); errors = vErrors.length; } ",u&&(o+=" else { ")}return o}},{}],35:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a=" ",s=e.level,o=e.dataLevel,i=e.schema[r],n=e.schemaPath+e.util.getProperty(r),l=e.errSchemaPath+"/"+r,u=!e.opts.allErrors,c="data"+(o||""),h="valid"+s,d=e.opts.$data&&i&&i.$data;d&&(a+=" var schema"+s+" = "+e.util.getData(i.$data,o,e.dataPathArr)+"; ");var f="schema"+s;if(!d)if(i.length<e.opts.loopRequired&&e.schema.properties&&Object.keys(e.schema.properties).length){var p=[],m=i;if(m)for(var v,g=-1,y=m.length-1;g<y;){v=m[g+=1];var P=e.schema.properties[v];P&&e.util.schemaHasRules(P,e.RULES.all)||(p[p.length]=v)}}else p=i;if(d||p.length){var E=e.errorPath,w=d||e.opts.loopRequired<=p.length,S=e.opts.ownProperties;if(u)if(a+=" var missing"+s+"; ",w){d||(a+=" var "+f+" = validate.schema"+n+"; ");var b="' + "+(D="schema"+s+"["+(x="i"+s)+"]")+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(E,D,e.opts.jsonPointers)),a+=" var "+h+" = true; ",d&&(a+=" if (schema"+s+" === undefined) "+h+" = true; else if (!Array.isArray(schema"+s+")) "+h+" = false; else {"),a+=" for (var "+x+" = 0; "+x+" < "+f+".length; "+x+"++) { "+h+" = "+c+"["+f+"["+x+"]] !== undefined ",S&&(a+=" &&   Object.prototype.hasOwnProperty.call("+c+", "+f+"["+x+"]) "),a+="; if (!"+h+") break; } ",d&&(a+="  }  "),($=$||[]).push(a+="  if (!"+h+") {   "),a="",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+b+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+b+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";var _=a;a=$.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+_+"]); ":" validate.errors = ["+_+"]; return false; ":" var err = "+_+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } else { "}else{a+=" if ( ";var F=p;if(F)for(var x=-1,R=F.length-1;x<R;){I=F[x+=1],x&&(a+=" || "),a+=" ( ( "+(k=c+(C=e.util.getProperty(I)))+" === undefined ",S&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(I)+"') "),a+=") && (missing"+s+" = "+e.util.toQuotedString(e.opts.jsonPointers?I:C)+") ) "}a+=") {  ";var $;b="' + "+(D="missing"+s)+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.opts.jsonPointers?e.util.getPathExpr(E,D,!0):E+" + "+D),($=$||[]).push(a),a="",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+b+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+b+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ";_=a;a=$.pop(),a+=!e.compositeRule&&u?e.async?" throw new ValidationError(["+_+"]); ":" validate.errors = ["+_+"]; return false; ":" var err = "+_+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",a+=" } else { "}else if(w){d||(a+=" var "+f+" = validate.schema"+n+"; ");var D;b="' + "+(D="schema"+s+"["+(x="i"+s)+"]")+" + '";e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPathExpr(E,D,e.opts.jsonPointers)),d&&(a+=" if ("+f+" && !Array.isArray("+f+")) {  var err =   ",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+b+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+b+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if ("+f+" !== undefined) { "),a+=" for (var "+x+" = 0; "+x+" < "+f+".length; "+x+"++) { if ("+c+"["+f+"["+x+"]] === undefined ",S&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", "+f+"["+x+"]) "),a+=") {  var err =   ",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+b+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+b+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ",d&&(a+="  }  ")}else{var j=p;if(j)for(var I,O=-1,A=j.length-1;O<A;){I=j[O+=1];var C=e.util.getProperty(I),k=(b=e.util.escapeQuotes(I),c+C);e.opts._errorDataPathProperty&&(e.errorPath=e.util.getPath(E,I,e.opts.jsonPointers)),a+=" if ( "+k+" === undefined ",S&&(a+=" || ! Object.prototype.hasOwnProperty.call("+c+", '"+e.util.escapeQuotes(I)+"') "),a+=") {  var err =   ",!1!==e.createErrors?(a+=" { keyword: 'required' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(l)+" , params: { missingProperty: '"+b+"' } ",!1!==e.opts.messages&&(a+=" , message: '",a+=e.opts._errorDataPathProperty?"is a required property":"should have required property \\'"+b+"\\'",a+="' "),e.opts.verbose&&(a+=" , schema: validate.schema"+n+" , parentSchema: validate.schema"+e.schemaPath+" , data: "+c+" "),a+=" } "):a+=" {} ",a+=";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "}}e.errorPath=E}else u&&(a+=" if (true) {");return a}},{}],36:[function(e,r,t){"use strict";r.exports=function(e,r,t){var a,s=" ",o=e.level,i=e.dataLevel,n=e.schema[r],l=e.schemaPath+e.util.getProperty(r),u=e.errSchemaPath+"/"+r,c=!e.opts.allErrors,h="data"+(i||""),d="valid"+o,f=e.opts.$data&&n&&n.$data;if(f?(s+=" var schema"+o+" = "+e.util.getData(n.$data,i,e.dataPathArr)+"; ",a="schema"+o):a=n,(n||f)&&!1!==e.opts.uniqueItems){f&&(s+=" var "+d+"; if ("+a+" === false || "+a+" === undefined) "+d+" = true; else if (typeof "+a+" != 'boolean') "+d+" = false; else { "),s+=" var i = "+h+".length , "+d+" = true , j; if (i > 1) { ";var p=e.schema.items&&e.schema.items.type,m=Array.isArray(p);if(!p||"object"==p||"array"==p||m&&(0<=p.indexOf("object")||0<=p.indexOf("array")))s+=" outer: for (;i--;) { for (j = i; j--;) { if (equal("+h+"[i], "+h+"[j])) { "+d+" = false; break outer; } } } ";else s+=" var itemIndices = {}, item; for (;i--;) { var item = "+h+"[i]; ",s+=" if ("+e.util["checkDataType"+(m?"s":"")](p,"item",!0)+") continue; ",m&&(s+=" if (typeof item == 'string') item = '\"' + item; "),s+=" if (typeof itemIndices[item] == 'number') { "+d+" = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ";s+=" } ",f&&(s+="  }  ");var v=v||[];v.push(s+=" if (!"+d+") {   "),s="",!1!==e.createErrors?(s+=" { keyword: 'uniqueItems' , dataPath: (dataPath || '') + "+e.errorPath+" , schemaPath: "+e.util.toQuotedString(u)+" , params: { i: i, j: j } ",!1!==e.opts.messages&&(s+=" , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "),e.opts.verbose&&(s+=" , schema:  ",s+=f?"validate.schema"+l:""+n,s+="         , parentSchema: validate.schema"+e.schemaPath+" , data: "+h+" "),s+=" } "):s+=" {} ";var g=s;s=v.pop(),s+=!e.compositeRule&&c?e.async?" throw new ValidationError(["+g+"]); ":" validate.errors = ["+g+"]; return false; ":" var err = "+g+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",s+=" } ",c&&(s+=" else { ")}else c&&(s+=" if (true) { ");return s}},{}],37:[function(e,r,t){"use strict";r.exports=function(a,e,r){var t="",s=!0===a.schema.$async,o=a.util.schemaHasRulesExcept(a.schema,a.RULES.all,"$ref"),i=a.self._getId(a.schema);if(a.isTop&&(t+=" var validate = ",s&&(a.async=!0,t+="async "),t+="function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ",i&&(a.opts.sourceCode||a.opts.processCode)&&(t+=" /*# sourceURL="+i+" */ ")),"boolean"==typeof a.schema||!o&&!a.schema.$ref){var n=a.level,l=a.dataLevel,u=a.schema[e="false schema"],c=a.schemaPath+a.util.getProperty(e),h=a.errSchemaPath+"/"+e,d=!a.opts.allErrors,f="data"+(l||""),p="valid"+n;if(!1===a.schema){a.isTop?d=!0:t+=" var "+p+" = false; ",(K=K||[]).push(t),t="",!1!==a.createErrors?(t+=" { keyword: 'false schema' , dataPath: (dataPath || '') + "+a.errorPath+" , schemaPath: "+a.util.toQuotedString(h)+" , params: {} ",!1!==a.opts.messages&&(t+=" , message: 'boolean schema is false' "),a.opts.verbose&&(t+=" , schema: false , parentSchema: validate.schema"+a.schemaPath+" , data: "+f+" "),t+=" } "):t+=" {} ";var m=t;t=K.pop(),t+=!a.compositeRule&&d?a.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}else t+=a.isTop?s?" return data; ":" validate.errors = null; return true; ":" var "+p+" = true; ";return a.isTop&&(t+=" }; return validate; "),t}if(a.isTop){var v=a.isTop;n=a.level=0,l=a.dataLevel=0,f="data";a.rootId=a.resolve.fullPath(a.self._getId(a.root.schema)),a.baseId=a.baseId||a.rootId,delete a.isTop,a.dataPathArr=[void 0],t+=" var vErrors = null; ",t+=" var errors = 0;     ",t+=" if (rootData === undefined) rootData = data; "}else{n=a.level,f="data"+((l=a.dataLevel)||"");if(i&&(a.baseId=a.resolve.url(a.baseId,i)),s&&!a.async)throw new Error("async schema in sync schema");t+=" var errs_"+n+" = errors;"}p="valid"+n,d=!a.opts.allErrors;var g="",y="",P=a.schema.type,E=Array.isArray(P);if(E&&1==P.length&&(P=P[0],E=!1),a.schema.$ref&&o){if("fail"==a.opts.extendRefs)throw new Error('$ref: validation keywords used in schema at path "'+a.errSchemaPath+'" (see option extendRefs)');!0!==a.opts.extendRefs&&(o=!1,a.logger.warn('$ref: keywords ignored in schema at path "'+a.errSchemaPath+'"'))}if(a.schema.$comment&&a.opts.$comment&&(t+=" "+a.RULES.all.$comment.code(a,"$comment")),P){if(a.opts.coerceTypes)var w=a.util.coerceToTypes(a.opts.coerceTypes,P);var S=a.RULES.types[P];if(w||E||!0===S||S&&!J(S)){c=a.schemaPath+".type",h=a.errSchemaPath+"/type",c=a.schemaPath+".type",h=a.errSchemaPath+"/type";if(t+=" if ("+a.util[E?"checkDataTypes":"checkDataType"](P,f,!0)+") { ",w){var b="dataType"+n,_="coerced"+n;t+=" var "+b+" = typeof "+f+"; ","array"==a.opts.coerceTypes&&(t+=" if ("+b+" == 'object' && Array.isArray("+f+")) "+b+" = 'array'; "),t+=" var "+_+" = undefined; ";var F="",x=w;if(x)for(var R,$=-1,D=x.length-1;$<D;)R=x[$+=1],$&&(t+=" if ("+_+" === undefined) { ",F+="}"),"array"==a.opts.coerceTypes&&"array"!=R&&(t+=" if ("+b+" == 'array' && "+f+".length == 1) { "+_+" = "+f+" = "+f+"[0]; "+b+" = typeof "+f+";  } "),"string"==R?t+=" if ("+b+" == 'number' || "+b+" == 'boolean') "+_+" = '' + "+f+"; else if ("+f+" === null) "+_+" = ''; ":"number"==R||"integer"==R?(t+=" if ("+b+" == 'boolean' || "+f+" === null || ("+b+" == 'string' && "+f+" && "+f+" == +"+f+" ","integer"==R&&(t+=" && !("+f+" % 1)"),t+=")) "+_+" = +"+f+"; "):"boolean"==R?t+=" if ("+f+" === 'false' || "+f+" === 0 || "+f+" === null) "+_+" = false; else if ("+f+" === 'true' || "+f+" === 1) "+_+" = true; ":"null"==R?t+=" if ("+f+" === '' || "+f+" === 0 || "+f+" === false) "+_+" = null; ":"array"==a.opts.coerceTypes&&"array"==R&&(t+=" if ("+b+" == 'string' || "+b+" == 'number' || "+b+" == 'boolean' || "+f+" == null) "+_+" = ["+f+"]; ");(K=K||[]).push(t+=" "+F+" if ("+_+" === undefined) {   "),t="",!1!==a.createErrors?(t+=" { keyword: 'type' , dataPath: (dataPath || '') + "+a.errorPath+" , schemaPath: "+a.util.toQuotedString(h)+" , params: { type: '",t+=E?""+P.join(","):""+P,t+="' } ",!1!==a.opts.messages&&(t+=" , message: 'should be ",t+=E?""+P.join(","):""+P,t+="' "),a.opts.verbose&&(t+=" , schema: validate.schema"+c+" , parentSchema: validate.schema"+a.schemaPath+" , data: "+f+" "),t+=" } "):t+=" {} ";m=t;t=K.pop(),t+=!a.compositeRule&&d?a.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",t+=" } else {  ";var j=l?"data"+(l-1||""):"parentData";t+=" "+f+" = "+_+"; ",l||(t+="if ("+j+" !== undefined)"),t+=" "+j+"["+(l?a.dataPathArr[l]:"parentDataProperty")+"] = "+_+"; } "}else{(K=K||[]).push(t),t="",!1!==a.createErrors?(t+=" { keyword: 'type' , dataPath: (dataPath || '') + "+a.errorPath+" , schemaPath: "+a.util.toQuotedString(h)+" , params: { type: '",t+=E?""+P.join(","):""+P,t+="' } ",!1!==a.opts.messages&&(t+=" , message: 'should be ",t+=E?""+P.join(","):""+P,t+="' "),a.opts.verbose&&(t+=" , schema: validate.schema"+c+" , parentSchema: validate.schema"+a.schemaPath+" , data: "+f+" "),t+=" } "):t+=" {} ";m=t;t=K.pop(),t+=!a.compositeRule&&d?a.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "}t+=" } "}}if(a.schema.$ref&&!o)t+=" "+a.RULES.all.$ref.code(a,"$ref")+" ",d&&(t+=" } if (errors === ",t+=v?"0":"errs_"+n,t+=") { ",y+="}");else{var I=a.RULES;if(I)for(var O=-1,A=I.length-1;O<A;)if(J(S=I[O+=1])){if(S.type&&(t+=" if ("+a.util.checkDataType(S.type,f)+") { "),a.opts.useDefaults&&!a.compositeRule)if("object"==S.type&&a.schema.properties){u=a.schema.properties;var C=Object.keys(u);if(C)for(var k,L=-1,z=C.length-1;L<z;){if(void 0!==(N=u[k=C[L+=1]]).default)t+="  if ("+(U=f+a.util.getProperty(k))+" === undefined) "+U+" = ",t+="shared"==a.opts.useDefaults?" "+a.useDefault(N.default)+" ":" "+JSON.stringify(N.default)+" ",t+="; "}}else if("array"==S.type&&Array.isArray(a.schema.items)){var T=a.schema.items;if(T){$=-1;for(var N,q=T.length-1;$<q;){var U;if(void 0!==(N=T[$+=1]).default)t+="  if ("+(U=f+"["+$+"]")+" === undefined) "+U+" = ",t+="shared"==a.opts.useDefaults?" "+a.useDefault(N.default)+" ":" "+JSON.stringify(N.default)+" ",t+="; "}}}var Q=S.rules;if(Q)for(var V,H=-1,M=Q.length-1;H<M;)if(Z(V=Q[H+=1])){var B=V.code(a,V.keyword,S.type);B&&(t+=" "+B+" ",d&&(g+="}"))}if(d&&(t+=" "+g+" ",g=""),S.type&&(t+=" } ",P&&P===S.type&&!w)){var K;c=a.schemaPath+".type",h=a.errSchemaPath+"/type";(K=K||[]).push(t+=" else { "),t="",!1!==a.createErrors?(t+=" { keyword: 'type' , dataPath: (dataPath || '') + "+a.errorPath+" , schemaPath: "+a.util.toQuotedString(h)+" , params: { type: '",t+=E?""+P.join(","):""+P,t+="' } ",!1!==a.opts.messages&&(t+=" , message: 'should be ",t+=E?""+P.join(","):""+P,t+="' "),a.opts.verbose&&(t+=" , schema: validate.schema"+c+" , parentSchema: validate.schema"+a.schemaPath+" , data: "+f+" "),t+=" } "):t+=" {} ";m=t;t=K.pop(),t+=!a.compositeRule&&d?a.async?" throw new ValidationError(["+m+"]); ":" validate.errors = ["+m+"]; return false; ":" var err = "+m+";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ",t+=" } "}d&&(t+=" if (errors === ",t+=v?"0":"errs_"+n,t+=") { ",y+="}")}}function J(e){for(var r=e.rules,t=0;t<r.length;t++)if(Z(r[t]))return!0}function Z(e){return void 0!==a.schema[e.keyword]||e.implements&&function(e){for(var r=e.implements,t=0;t<r.length;t++)if(void 0!==a.schema[r[t]])return!0}(e)}return d&&(t+=" "+y+" "),v?(s?(t+=" if (errors === 0) return data;           ",t+=" else throw new ValidationError(vErrors); "):(t+=" validate.errors = vErrors; ",t+=" return errors === 0;       "),t+=" }; return validate;"):t+=" var "+p+" = errors === errs_"+n+";",t=a.util.cleanUpCode(t),v&&(t=a.util.finalCleanUpCode(t,s)),t}},{}],38:[function(e,r,t){"use strict";var c=/^[a-z_$][a-z0-9_$-]*$/i,h=e("./dotjs/custom");r.exports={add:function(e,r){var n=this.RULES;if(n.keywords[e])throw new Error("Keyword "+e+" is already defined");if(!c.test(e))throw new Error("Keyword "+e+" is not a valid identifier");if(r){if(r.macro&&void 0!==r.valid)throw new Error('"valid" option cannot be used with macro keywords');var t=r.type;if(Array.isArray(t)){var a,s=t.length;for(a=0;a<s;a++)u(t[a]);for(a=0;a<s;a++)l(e,t[a],r)}else t&&u(t),l(e,t,r);var o=!0===r.$data&&this._opts.$data;if(o&&!r.validate)throw new Error('$data support: "validate" function is not defined');var i=r.metaSchema;i&&(o&&(i={anyOf:[i,{$ref:"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#"}]}),r.validateSchema=this.compile(i,!0))}function l(e,r,t){for(var a,s=0;s<n.length;s++){var o=n[s];if(o.type==r){a=o;break}}a||n.push(a={type:r,rules:[]});var i={keyword:e,definition:t,custom:!0,code:h,implements:t.implements};a.rules.push(i),n.custom[e]=i}function u(e){if(!n.types[e])throw new Error("Unknown type "+e)}return n.keywords[e]=n.all[e]=!0,this},get:function(e){var r=this.RULES.custom[e];return r?r.definition:this.RULES.keywords[e]||!1},remove:function(e){var r=this.RULES;delete r.keywords[e],delete r.all[e],delete r.custom[e];for(var t=0;t<r.length;t++)for(var a=r[t].rules,s=0;s<a.length;s++)if(a[s].keyword==e){a.splice(s,1);break}return this}}},{"./dotjs/custom":21}],39:[function(e,r,t){r.exports={$schema:"http://json-schema.org/draft-07/schema#",$id:"https://raw.githubusercontent.com/epoberezkin/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON Schema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1}},{}],40:[function(e,r,t){r.exports={$schema:"http://json-schema.org/draft-07/schema#",$id:"http://json-schema.org/draft-07/schema#",title:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},type:["object","boolean"],properties:{$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},$comment:{type:"string"},title:{type:"string"},description:{type:"string"},default:!0,readOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},propertyNames:{format:"regex"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{type:"array",items:!0,minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},contentMediaType:{type:"string"},contentEncoding:{type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},default:!0}},{}],41:[function(e,r,t){"use strict";var f=Array.isArray,p=Object.keys,m=Object.prototype.hasOwnProperty;r.exports=function e(r,t){if(r===t)return!0;if(r&&t&&"object"==typeof r&&"object"==typeof t){var a,s,o,i=f(r),n=f(t);if(i&&n){if((s=r.length)!=t.length)return!1;for(a=s;0!=a--;)if(!e(r[a],t[a]))return!1;return!0}if(i!=n)return!1;var l=r instanceof Date,u=t instanceof Date;if(l!=u)return!1;if(l&&u)return r.getTime()==t.getTime();var c=r instanceof RegExp,h=t instanceof RegExp;if(c!=h)return!1;if(c&&h)return r.toString()==t.toString();var d=p(r);if((s=d.length)!==p(t).length)return!1;for(a=s;0!=a--;)if(!m.call(t,d[a]))return!1;for(a=s;0!=a--;)if(!e(r[o=d[a]],t[o]))return!1;return!0}return r!=r&&t!=t}},{}],42:[function(e,r,t){"use strict";r.exports=function(e,r){r||(r={}),"function"==typeof r&&(r={cmp:r});var a,l="boolean"==typeof r.cycles&&r.cycles,u=r.cmp&&(a=r.cmp,function(t){return function(e,r){return a({key:e,value:t[e]},{key:r,value:t[r]})}}),c=[];return function e(r){if(r&&r.toJSON&&"function"==typeof r.toJSON&&(r=r.toJSON()),void 0!==r){if("number"==typeof r)return isFinite(r)?""+r:"null";if("object"!=typeof r)return JSON.stringify(r);var t,a;if(Array.isArray(r)){for(a="[",t=0;t<r.length;t++)t&&(a+=","),a+=e(r[t])||"null";return a+"]"}if(null===r)return"null";if(-1!==c.indexOf(r)){if(l)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var s=c.push(r)-1,o=Object.keys(r).sort(u&&u(r));for(a="",t=0;t<o.length;t++){var i=o[t],n=e(r[i]);n&&(a&&(a+=","),a+=JSON.stringify(i)+":"+n)}return c.splice(s,1),"{"+a+"}"}}(e)}},{}],43:[function(e,r,t){"use strict";var p=r.exports=function(e,r,t){"function"==typeof r&&(t=r,r={}),function e(r,t,a,s,o,i,n,l,u){if(a&&"object"==typeof a&&!Array.isArray(a))for(var c in t(a,s,o,i,n,l,u),a){var h=a[c];if(Array.isArray(h)){if(c in p.arrayKeywords)for(var d=0;d<h.length;d++)e(r,t,h[d],s+"/"+c+"/"+d,o,s,c,a,d)}else if(c in p.propsKeywords){if(h&&"object"==typeof h)for(var f in h)e(r,t,h[f],s+"/"+c+"/"+f.replace(/~/g,"~0").replace(/\//g,"~1"),o,s,c,a,f)}else(c in p.keywords||r.allKeys&&!(c in p.skipKeywords))&&e(r,t,h,s+"/"+c,o,s,c,a)}}(r,t,e,"",e)};p.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0},p.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0},p.propsKeywords={definitions:!0,properties:!0,patternProperties:!0,dependencies:!0},p.skipKeywords={enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0}},{}],44:[function(e,r,t){var a;a=this,function(e){"use strict";function C(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];if(1<r.length){r[0]=r[0].slice(0,-1);for(var a=r.length-1,s=1;s<a;++s)r[s]=r[s].slice(1,-1);return r[a]=r[a].slice(1),r.join("")}return r[0]}function k(e){return"(?:"+e+")"}function a(e){return void 0===e?"undefined":null===e?"null":Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase()}function p(e){return e.toUpperCase()}function r(e){var r="[A-Za-z]",t="[0-9]",a=C(t,"[A-Fa-f]"),s=k(k("%[EFef]"+a+"%"+a+a+"%"+a+a)+"|"+k("%[89A-Fa-f]"+a+"%"+a+a)+"|"+k("%"+a+a)),o="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",i=C("[\\:\\/\\?\\#\\[\\]\\@]",o),n=e?"[\\uE000-\\uF8FF]":"[]",l=C(r,t,"[\\-\\.\\_\\~]",e?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]"),u=k(r+C(r,t,"[\\+\\-\\.]")+"*"),c=k(k(s+"|"+C(l,o,"[\\:]"))+"*"),h=(k(k("25[0-5]")+"|"+k("2[0-4]"+t)+"|"+k("1"+t+t)+"|"+k("[1-9]"+t)+"|"+t),k(k("25[0-5]")+"|"+k("2[0-4]"+t)+"|"+k("1"+t+t)+"|"+k("0?[1-9]"+t)+"|0?0?"+t)),d=k(h+"\\."+h+"\\."+h+"\\."+h),f=k(a+"{1,4}"),p=k(k(f+"\\:"+f)+"|"+d),m=k([k(k(f+"\\:")+"{6}"+p),k("\\:\\:"+k(f+"\\:")+"{5}"+p),k(k(f)+"?\\:\\:"+k(f+"\\:")+"{4}"+p),k(k(k(f+"\\:")+"{0,1}"+f)+"?\\:\\:"+k(f+"\\:")+"{3}"+p),k(k(k(f+"\\:")+"{0,2}"+f)+"?\\:\\:"+k(f+"\\:")+"{2}"+p),k(k(k(f+"\\:")+"{0,3}"+f)+"?\\:\\:"+f+"\\:"+p),k(k(k(f+"\\:")+"{0,4}"+f)+"?\\:\\:"+p),k(k(k(f+"\\:")+"{0,5}"+f)+"?\\:\\:"+f),k(k(k(f+"\\:")+"{0,6}"+f)+"?\\:\\:")].join("|")),v=k(k(l+"|"+s)+"+"),g=(k(m+"\\%25"+v),k("\\["+k(k(m+k("\\%25|\\%(?!"+a+"{2})")+v)+"|"+m+"|"+k("[vV]"+a+"+\\."+C(l,o,"[\\:]")+"+"))+"\\]")),y=k(k(s+"|"+C(l,o))+"*"),P=k(g+"|"+d+"(?!"+y+")|"+y),E=k(t+"*"),w=k(k(c+"@")+"?"+P+k("\\:"+E)+"?"),S=k(s+"|"+C(l,o,"[\\:\\@]")),b=k(S+"*"),_=k(S+"+"),F=k(k(s+"|"+C(l,o,"[\\@]"))+"+"),x=k(k("\\/"+b)+"*"),R=k("\\/"+k(_+x)+"?"),$=k(F+x),D=k(_+x),j="(?!"+S+")",I=(k(x+"|"+R+"|"+$+"|"+D+"|"+j),k(k(S+"|"+C("[\\/\\?]",n))+"*")),O=k(k(S+"|[\\/\\?]")+"*"),A=k(k("\\/\\/"+w+x)+"|"+R+"|"+D+"|"+j);k(k(u+"\\:"+A+k("\\?"+I)+"?"+k("\\#"+O)+"?")+"|"+k(k(k("\\/\\/"+w+x)+"|"+R+"|"+$+"|"+j)+k("\\?"+I)+"?"+k("\\#"+O)+"?")),k(u+"\\:"+A+k("\\?"+I)+"?"),k(k("\\/\\/("+k("("+c+")@")+"?("+P+")"+k("\\:("+E+")")+"?)")+"?("+x+"|"+R+"|"+D+"|"+j+")"),k("\\?("+I+")"),k("\\#("+O+")"),k(k("\\/\\/("+k("("+c+")@")+"?("+P+")"+k("\\:("+E+")")+"?)")+"?("+x+"|"+R+"|"+$+"|"+j+")"),k("\\?("+I+")"),k("\\#("+O+")"),k(k("\\/\\/("+k("("+c+")@")+"?("+P+")"+k("\\:("+E+")")+"?)")+"?("+x+"|"+R+"|"+D+"|"+j+")"),k("\\?("+I+")"),k("\\#("+O+")"),k("("+c+")@"),k("\\:("+E+")");return{NOT_SCHEME:new RegExp(C("[^]",r,t,"[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(C("[^\\%\\:]",l,o),"g"),NOT_HOST:new RegExp(C("[^\\%\\[\\]\\:]",l,o),"g"),NOT_PATH:new RegExp(C("[^\\%\\/\\:\\@]",l,o),"g"),NOT_PATH_NOSCHEME:new RegExp(C("[^\\%\\/\\@]",l,o),"g"),NOT_QUERY:new RegExp(C("[^\\%]",l,o,"[\\:\\@\\/\\?]",n),"g"),NOT_FRAGMENT:new RegExp(C("[^\\%]",l,o,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(C("[^]",l,o),"g"),UNRESERVED:new RegExp(l,"g"),OTHER_CHARS:new RegExp(C("[^\\%]",l,i),"g"),PCT_ENCODED:new RegExp(s,"g"),IPV4ADDRESS:new RegExp("^("+d+")$"),IPV6ADDRESS:new RegExp("^\\[?("+m+")"+k(k("\\%25|\\%(?!"+a+"{2})")+"("+v+")")+"?\\]?$")}}var c=r(!1),h=r(!0),w=function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,r){var t=[],a=!0,s=!1,o=void 0;try{for(var i,n=e[Symbol.iterator]();!(a=(i=n.next()).done)&&(t.push(i.value),!r||t.length!==r);a=!0);}catch(e){s=!0,o=e}finally{try{!a&&n.return&&n.return()}finally{if(s)throw o}}return t}(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")},A=2147483647,t=/^xn--/,s=/[^\0-\x7E]/,o=/[\x2E\u3002\uFF0E\uFF61]/g,i={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},L=Math.floor,z=String.fromCharCode;function T(e){throw new RangeError(i[e])}function n(e,r){var t=e.split("@"),a="";return 1<t.length&&(a=t[0]+"@",e=t[1]),a+function(e,r){for(var t=[],a=e.length;a--;)t[a]=r(e[a]);return t}((e=e.replace(o,".")).split("."),r).join(".")}function N(e){for(var r=[],t=0,a=e.length;t<a;){var s=e.charCodeAt(t++);if(55296<=s&&s<=56319&&t<a){var o=e.charCodeAt(t++);56320==(64512&o)?r.push(((1023&s)<<10)+(1023&o)+65536):(r.push(s),t--)}else r.push(s)}return r}var q=function(e,r){return e+22+75*(e<26)-((0!=r)<<5)},U=function(e,r,t){var a=0;for(e=t?L(e/700):e>>1,e+=L(e/r);455<e;a+=36)e=L(e/35);return L(a+36*e/(e+38))},l=function(e){var r,t=[],a=e.length,s=0,o=128,i=72,n=e.lastIndexOf("-");n<0&&(n=0);for(var l=0;l<n;++l)128<=e.charCodeAt(l)&&T("not-basic"),t.push(e.charCodeAt(l));for(var u=0<n?n+1:0;u<a;){for(var c=s,h=1,d=36;;d+=36){a<=u&&T("invalid-input");var f=(r=e.charCodeAt(u++))-48<10?r-22:r-65<26?r-65:r-97<26?r-97:36;(36<=f||f>L((A-s)/h))&&T("overflow"),s+=f*h;var p=d<=i?1:i+26<=d?26:d-i;if(f<p)break;var m=36-p;h>L(A/m)&&T("overflow"),h*=m}var v=t.length+1;i=U(s-c,v,0==c),L(s/v)>A-o&&T("overflow"),o+=L(s/v),s%=v,t.splice(s++,0,o)}return String.fromCodePoint.apply(String,t)},u=function(e){var r=[],t=(e=N(e)).length,a=128,s=0,o=72,i=!0,n=!1,l=void 0;try{for(var u,c=e[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var h=u.value;h<128&&r.push(z(h))}}catch(e){n=!0,l=e}finally{try{!i&&c.return&&c.return()}finally{if(n)throw l}}var d=r.length,f=d;for(d&&r.push("-");f<t;){var p=A,m=!0,v=!1,g=void 0;try{for(var y,P=e[Symbol.iterator]();!(m=(y=P.next()).done);m=!0){var E=y.value;a<=E&&E<p&&(p=E)}}catch(e){v=!0,g=e}finally{try{!m&&P.return&&P.return()}finally{if(v)throw g}}var w=f+1;p-a>L((A-s)/w)&&T("overflow"),s+=(p-a)*w,a=p;var S=!0,b=!1,_=void 0;try{for(var F,x=e[Symbol.iterator]();!(S=(F=x.next()).done);S=!0){var R=F.value;if(R<a&&++s>A&&T("overflow"),R==a){for(var $=s,D=36;;D+=36){var j=D<=o?1:o+26<=D?26:D-o;if($<j)break;var I=$-j,O=36-j;r.push(z(q(j+I%O,0))),$=L(I/O)}r.push(z(q($,0))),o=U(s,w,f==d),s=0,++f}}}catch(e){b=!0,_=e}finally{try{!S&&x.return&&x.return()}finally{if(b)throw _}}++s,++a}return r.join("")},v={version:"2.1.0",ucs2:{decode:N,encode:function(e){return String.fromCodePoint.apply(String,function(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}(e))}},decode:l,encode:u,toASCII:function(e){return n(e,function(e){return s.test(e)?"xn--"+u(e):e})},toUnicode:function(e){return n(e,function(e){return t.test(e)?l(e.slice(4).toLowerCase()):e})}},d={};function m(e){var r=e.charCodeAt(0);return r<16?"%0"+r.toString(16).toUpperCase():r<128?"%"+r.toString(16).toUpperCase():r<2048?"%"+(r>>6|192).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase():"%"+(r>>12|224).toString(16).toUpperCase()+"%"+(r>>6&63|128).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase()}function f(e){for(var r="",t=0,a=e.length;t<a;){var s=parseInt(e.substr(t+1,2),16);if(s<128)r+=String.fromCharCode(s),t+=3;else if(194<=s&&s<224){if(6<=a-t){var o=parseInt(e.substr(t+4,2),16);r+=String.fromCharCode((31&s)<<6|63&o)}else r+=e.substr(t,6);t+=6}else if(224<=s){if(9<=a-t){var i=parseInt(e.substr(t+4,2),16),n=parseInt(e.substr(t+7,2),16);r+=String.fromCharCode((15&s)<<12|(63&i)<<6|63&n)}else r+=e.substr(t,9);t+=9}else r+=e.substr(t,3),t+=3}return r}function g(e,t){function r(e){var r=f(e);return r.match(t.UNRESERVED)?r:e}return e.scheme&&(e.scheme=String(e.scheme).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_SCHEME,"")),void 0!==e.userinfo&&(e.userinfo=String(e.userinfo).replace(t.PCT_ENCODED,r).replace(t.NOT_USERINFO,m).replace(t.PCT_ENCODED,p)),void 0!==e.host&&(e.host=String(e.host).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_HOST,m).replace(t.PCT_ENCODED,p)),void 0!==e.path&&(e.path=String(e.path).replace(t.PCT_ENCODED,r).replace(e.scheme?t.NOT_PATH:t.NOT_PATH_NOSCHEME,m).replace(t.PCT_ENCODED,p)),void 0!==e.query&&(e.query=String(e.query).replace(t.PCT_ENCODED,r).replace(t.NOT_QUERY,m).replace(t.PCT_ENCODED,p)),void 0!==e.fragment&&(e.fragment=String(e.fragment).replace(t.PCT_ENCODED,r).replace(t.NOT_FRAGMENT,m).replace(t.PCT_ENCODED,p)),e}function S(e){return e.replace(/^0*(.*)/,"$1")||"0"}function b(e,r){var t=e.match(r.IPV4ADDRESS)||[],a=w(t,2)[1];return a?a.split(".").map(S).join("."):e}function y(e,r){var t=e.match(r.IPV6ADDRESS)||[],a=w(t,3),s=a[1],o=a[2];if(s){for(var i=s.toLowerCase().split("::").reverse(),n=w(i,2),l=n[0],u=n[1],c=u?u.split(":").map(S):[],h=l.split(":").map(S),d=r.IPV4ADDRESS.test(h[h.length-1]),f=d?7:8,p=h.length-f,m=Array(f),v=0;v<f;++v)m[v]=c[v]||h[p+v]||"";d&&(m[f-1]=b(m[f-1],r));var g=m.reduce(function(e,r,t){if(!r||"0"===r){var a=e[e.length-1];a&&a.index+a.length===t?a.length++:e.push({index:t,length:1})}return e},[]).sort(function(e,r){return r.length-e.length})[0],y=void 0;if(g&&1<g.length){var P=m.slice(0,g.index),E=m.slice(g.index+g.length);y=P.join(":")+"::"+E.join(":")}else y=m.join(":");return o&&(y+="%"+o),y}return e}var P=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,E=void 0==="".match(/(){0}/)[1];function _(e){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},t={},a=!1!==r.iri?h:c;"suffix"===r.reference&&(e=(r.scheme?r.scheme+":":"")+"//"+e);var s=e.match(P);if(s){E?(t.scheme=s[1],t.userinfo=s[3],t.host=s[4],t.port=parseInt(s[5],10),t.path=s[6]||"",t.query=s[7],t.fragment=s[8],isNaN(t.port)&&(t.port=s[5])):(t.scheme=s[1]||void 0,t.userinfo=-1!==e.indexOf("@")?s[3]:void 0,t.host=-1!==e.indexOf("//")?s[4]:void 0,t.port=parseInt(s[5],10),t.path=s[6]||"",t.query=-1!==e.indexOf("?")?s[7]:void 0,t.fragment=-1!==e.indexOf("#")?s[8]:void 0,isNaN(t.port)&&(t.port=e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?s[4]:void 0)),t.host&&(t.host=y(b(t.host,a),a)),t.reference=void 0!==t.scheme||void 0!==t.userinfo||void 0!==t.host||void 0!==t.port||t.path||void 0!==t.query?void 0===t.scheme?"relative":void 0===t.fragment?"absolute":"uri":"same-document",r.reference&&"suffix"!==r.reference&&r.reference!==t.reference&&(t.error=t.error||"URI is not a "+r.reference+" reference.");var o=d[(r.scheme||t.scheme||"").toLowerCase()];if(r.unicodeSupport||o&&o.unicodeSupport)g(t,a);else{if(t.host&&(r.domainHost||o&&o.domainHost))try{t.host=v.toASCII(t.host.replace(a.PCT_ENCODED,f).toLowerCase())}catch(e){t.error=t.error||"Host's domain name can not be converted to ASCII via punycode: "+e}g(t,c)}o&&o.parse&&o.parse(t,r)}else t.error=t.error||"URI can not be parsed.";return t}var F=/^\.\.?\//,x=/^\/\.(\/|$)/,R=/^\/\.\.(\/|$)/,$=/^\/?(?:.|\n)*?(?=\/|$)/;function D(e){for(var r=[];e.length;)if(e.match(F))e=e.replace(F,"");else if(e.match(x))e=e.replace(x,"/");else if(e.match(R))e=e.replace(R,"/"),r.pop();else if("."===e||".."===e)e="";else{var t=e.match($);if(!t)throw new Error("Unexpected dot segment condition");var a=t[0];e=e.slice(a.length),r.push(a)}return r.join("")}function j(r){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=t.iri?h:c,a=[],s=d[(t.scheme||r.scheme||"").toLowerCase()];if(s&&s.serialize&&s.serialize(r,t),r.host)if(e.IPV6ADDRESS.test(r.host));else if(t.domainHost||s&&s.domainHost)try{r.host=t.iri?v.toUnicode(r.host):v.toASCII(r.host.replace(e.PCT_ENCODED,f).toLowerCase())}catch(e){r.error=r.error||"Host's domain name can not be converted to "+(t.iri?"Unicode":"ASCII")+" via punycode: "+e}g(r,e),"suffix"!==t.reference&&r.scheme&&(a.push(r.scheme),a.push(":"));var o,i,n,l=(i=!1!==t.iri?h:c,n=[],void 0!==(o=r).userinfo&&(n.push(o.userinfo),n.push("@")),void 0!==o.host&&n.push(y(b(String(o.host),i),i).replace(i.IPV6ADDRESS,function(e,r,t){return"["+r+(t?"%25"+t:"")+"]"})),"number"==typeof o.port&&(n.push(":"),n.push(o.port.toString(10))),n.length?n.join(""):void 0);if(void 0!==l&&("suffix"!==t.reference&&a.push("//"),a.push(l),r.path&&"/"!==r.path.charAt(0)&&a.push("/")),void 0!==r.path){var u=r.path;t.absolutePath||s&&s.absolutePath||(u=D(u)),void 0===l&&(u=u.replace(/^\/\//,"/%2F")),a.push(u)}return void 0!==r.query&&(a.push("?"),a.push(r.query)),void 0!==r.fragment&&(a.push("#"),a.push(r.fragment)),a.join("")}function I(e,r){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},a={};return arguments[3]||(e=_(j(e,t),t),r=_(j(r,t),t)),!(t=t||{}).tolerant&&r.scheme?(a.scheme=r.scheme,a.userinfo=r.userinfo,a.host=r.host,a.port=r.port,a.path=D(r.path||""),a.query=r.query):(void 0!==r.userinfo||void 0!==r.host||void 0!==r.port?(a.userinfo=r.userinfo,a.host=r.host,a.port=r.port,a.path=D(r.path||""),a.query=r.query):(r.path?("/"===r.path.charAt(0)?a.path=D(r.path):(a.path=void 0===e.userinfo&&void 0===e.host&&void 0===e.port||e.path?e.path?e.path.slice(0,e.path.lastIndexOf("/")+1)+r.path:r.path:"/"+r.path,a.path=D(a.path)),a.query=r.query):(a.path=e.path,a.query=void 0!==r.query?r.query:e.query),a.userinfo=e.userinfo,a.host=e.host,a.port=e.port),a.scheme=e.scheme),a.fragment=r.fragment,a}function O(e,r){return e&&e.toString().replace(r&&r.iri?h.PCT_ENCODED:c.PCT_ENCODED,f)}var Q={scheme:"http",domainHost:!0,parse:function(e,r){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,r){return e.port!==("https"!==String(e.scheme).toLowerCase()?80:443)&&""!==e.port||(e.port=void 0),e.path||(e.path="/"),e}},V={scheme:"https",domainHost:Q.domainHost,parse:Q.parse,serialize:Q.serialize},H={},M="[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]",B="[0-9A-Fa-f]",K=k(k("%[EFef]"+B+"%"+B+B+"%"+B+B)+"|"+k("%[89A-Fa-f]"+B+"%"+B+B)+"|"+k("%"+B+B)),J=C("[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",'[\\"\\\\]'),Z=new RegExp(M,"g"),G=new RegExp(K,"g"),Y=new RegExp(C("[^]","[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]","[\\.]",'[\\"]',J),"g"),W=new RegExp(C("[^]",M,"[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"),"g"),X=W;function ee(e){var r=f(e);return r.match(Z)?r:e}var re={scheme:"mailto",parse:function(e,r){var t=e,a=t.to=t.path?t.path.split(","):[];if(t.path=void 0,t.query){for(var s=!1,o={},i=t.query.split("&"),n=0,l=i.length;n<l;++n){var u=i[n].split("=");switch(u[0]){case"to":for(var c=u[1].split(","),h=0,d=c.length;h<d;++h)a.push(c[h]);break;case"subject":t.subject=O(u[1],r);break;case"body":t.body=O(u[1],r);break;default:s=!0,o[O(u[0],r)]=O(u[1],r)}}s&&(t.headers=o)}t.query=void 0;for(var f=0,p=a.length;f<p;++f){var m=a[f].split("@");if(m[0]=O(m[0]),r.unicodeSupport)m[1]=O(m[1],r).toLowerCase();else try{m[1]=v.toASCII(O(m[1],r).toLowerCase())}catch(e){t.error=t.error||"Email address's domain name can not be converted to ASCII via punycode: "+e}a[f]=m.join("@")}return t},serialize:function(e,r){var t,a=e,s=null!=(t=e.to)?t instanceof Array?t:"number"!=typeof t.length||t.split||t.setInterval||t.call?[t]:Array.prototype.slice.call(t):[];if(s){for(var o=0,i=s.length;o<i;++o){var n=String(s[o]),l=n.lastIndexOf("@"),u=n.slice(0,l).replace(G,ee).replace(G,p).replace(Y,m),c=n.slice(l+1);try{c=r.iri?v.toUnicode(c):v.toASCII(O(c,r).toLowerCase())}catch(e){a.error=a.error||"Email address's domain name can not be converted to "+(r.iri?"Unicode":"ASCII")+" via punycode: "+e}s[o]=u+"@"+c}a.path=s.join(",")}var h=e.headers=e.headers||{};e.subject&&(h.subject=e.subject),e.body&&(h.body=e.body);var d=[];for(var f in h)h[f]!==H[f]&&d.push(f.replace(G,ee).replace(G,p).replace(W,m)+"="+h[f].replace(G,ee).replace(G,p).replace(X,m));return d.length&&(a.query=d.join("&")),a}},te=/^([^\:]+)\:(.*)/,ae={scheme:"urn",parse:function(e,r){var t=e.path&&e.path.match(te),a=e;if(t){var s=r.scheme||a.scheme||"urn",o=t[1].toLowerCase(),i=t[2],n=d[s+":"+(r.nid||o)];a.nid=o,a.nss=i,a.path=void 0,n&&(a=n.parse(a,r))}else a.error=a.error||"URN can not be parsed.";return a},serialize:function(e,r){var t=e.nid,a=d[(r.scheme||e.scheme||"urn")+":"+(r.nid||t)];a&&(e=a.serialize(e,r));var s=e;return s.path=(t||r.nid)+":"+e.nss,s}},se=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,oe={scheme:"urn:uuid",parse:function(e,r){var t=e;return t.uuid=t.nss,t.nss=void 0,r.tolerant||t.uuid&&t.uuid.match(se)||(t.error=t.error||"UUID is not valid."),t},serialize:function(e,r){var t=e;return t.nss=(e.uuid||"").toLowerCase(),t}};d[Q.scheme]=Q,d[V.scheme]=V,d[re.scheme]=re,d[ae.scheme]=ae,d[oe.scheme]=oe,e.SCHEMES=d,e.pctEncChar=m,e.pctDecChars=f,e.parse=_,e.removeDotSegments=D,e.serialize=j,e.resolveComponents=I,e.resolve=function(e,r,t){var a=function(e,r){var t=e;if(r)for(var a in r)t[a]=r[a];return t}({scheme:"null"},t);return j(I(_(e,a),_(r,a),a,!0),a)},e.normalize=function(e,r){return"string"==typeof e?e=j(_(e,r),r):"object"===a(e)&&(e=_(j(e,r),r)),e},e.equal=function(e,r,t){return"string"==typeof e?e=j(_(e,t),t):"object"===a(e)&&(e=j(e,t)),"string"==typeof r?r=j(_(r,t),t):"object"===a(r)&&(r=j(r,t)),e===r},e.escapeComponent=function(e,r){return e&&e.toString().replace(r&&r.iri?h.ESCAPE:c.ESCAPE,m)},e.unescapeComponent=O,Object.defineProperty(e,"__esModule",{value:!0})}("object"==typeof t&&void 0!==r?t:a.URI=a.URI||{})},{}],ajv:[function(a,e,r){"use strict";var n=a("./compile"),d=a("./compile/resolve"),t=a("./cache"),f=a("./compile/schema_obj"),s=a("fast-json-stable-stringify"),o=a("./compile/formats"),i=a("./compile/rules"),l=a("./data"),u=a("./compile/util");(e.exports=g).prototype.validate=function(e,r){var t;if("string"==typeof e){if(!(t=this.getSchema(e)))throw new Error('no schema with key or ref "'+e+'"')}else{var a=this._addSchema(e);t=a.validate||this._compile(a)}var s=t(r);!0!==t.$async&&(this.errors=t.errors);return s},g.prototype.compile=function(e,r){var t=this._addSchema(e,void 0,r);return t.validate||this._compile(t)},g.prototype.addSchema=function(e,r,t,a){if(Array.isArray(e)){for(var s=0;s<e.length;s++)this.addSchema(e[s],void 0,t,a);return this}var o=this._getId(e);if(void 0!==o&&"string"!=typeof o)throw new Error("schema id must be string");return b(this,r=d.normalizeId(r||o)),this._schemas[r]=this._addSchema(e,t,a,!0),this},g.prototype.addMetaSchema=function(e,r,t){return this.addSchema(e,r,t,!0),this},g.prototype.validateSchema=function(e,r){var t=e.$schema;if(void 0!==t&&"string"!=typeof t)throw new Error("$schema must be a string");if(!(t=t||this._opts.defaultMeta||(a=this,s=a._opts.meta,a._opts.defaultMeta="object"==typeof s?a._getId(s)||s:a.getSchema(p)?p:void 0,a._opts.defaultMeta)))return this.logger.warn("meta-schema not available"),!(this.errors=null);var a,s;var o,i=this._formats.uri;this._formats.uri="function"==typeof i?this._schemaUriFormatFunc:this._schemaUriFormat;try{o=this.validate(t,e)}finally{this._formats.uri=i}if(!o&&r){var n="schema is invalid: "+this.errorsText();if("log"!=this._opts.validateSchema)throw new Error(n);this.logger.error(n)}return o},g.prototype.getSchema=function(e){var r=y(this,e);switch(typeof r){case"object":return r.validate||this._compile(r);case"string":return this.getSchema(r);case"undefined":return function(e,r){var t=d.schema.call(e,{schema:{}},r);if(t){var a=t.schema,s=t.root,o=t.baseId,i=n.call(e,a,s,void 0,o);return e._fragments[r]=new f({ref:r,fragment:!0,schema:a,root:s,baseId:o,validate:i}),i}}(this,e)}},g.prototype.removeSchema=function(e){if(e instanceof RegExp)return P(this,this._schemas,e),P(this,this._refs,e),this;switch(typeof e){case"undefined":return P(this,this._schemas),P(this,this._refs),this._cache.clear(),this;case"string":var r=y(this,e);return r&&this._cache.del(r.cacheKey),delete this._schemas[e],delete this._refs[e],this;case"object":var t=this._opts.serialize,a=t?t(e):e;this._cache.del(a);var s=this._getId(e);s&&(s=d.normalizeId(s),delete this._schemas[s],delete this._refs[s])}return this},g.prototype.addFormat=function(e,r){"string"==typeof r&&(r=new RegExp(r));return this._formats[e]=r,this},g.prototype.errorsText=function(e,r){if(!(e=e||this.errors))return"No errors";for(var t=void 0===(r=r||{}).separator?", ":r.separator,a=void 0===r.dataVar?"data":r.dataVar,s="",o=0;o<e.length;o++){var i=e[o];i&&(s+=a+i.dataPath+" "+i.message+t)}return s.slice(0,-t.length)},g.prototype._addSchema=function(e,r,t,a){if("object"!=typeof e&&"boolean"!=typeof e)throw new Error("schema should be object or boolean");var s=this._opts.serialize,o=s?s(e):e,i=this._cache.get(o);if(i)return i;a=a||!1!==this._opts.addUsedSchema;var n=d.normalizeId(this._getId(e));n&&a&&b(this,n);var l,u=!1!==this._opts.validateSchema&&!r;u&&!(l=n&&n==d.normalizeId(e.$schema))&&this.validateSchema(e,!0);var c=d.ids.call(this,e),h=new f({id:n,schema:e,localRefs:c,cacheKey:o,meta:t});"#"!=n[0]&&a&&(this._refs[n]=h);this._cache.put(o,h),u&&l&&this.validateSchema(e,!0);return h},g.prototype._compile=function(t,e){if(t.compiling)return(t.validate=s).schema=t.schema,s.errors=null,s.root=e||s,!0===t.schema.$async&&(s.$async=!0),s;var r,a;t.compiling=!0,t.meta&&(r=this._opts,this._opts=this._metaOpts);try{a=n.call(this,t.schema,e,t.localRefs)}finally{t.compiling=!1,t.meta&&(this._opts=r)}return t.validate=a,t.refs=a.refs,t.refVal=a.refVal,t.root=a.root,a;function s(){var e=t.validate,r=e.apply(this,arguments);return s.errors=e.errors,r}},g.prototype.compileAsync=a("./compile/async");var c=a("./keyword");g.prototype.addKeyword=c.add,g.prototype.getKeyword=c.get,g.prototype.removeKeyword=c.remove;var h=a("./compile/error_classes");g.ValidationError=h.Validation,g.MissingRefError=h.MissingRef,g.$dataMetaSchema=l;var p="http://json-schema.org/draft-07/schema",m=["removeAdditional","useDefaults","coerceTypes"],v=["/properties"];function g(e){if(!(this instanceof g))return new g(e);e=this._opts=u.copy(e)||{},function(e){var r=e._opts.logger;if(!1===r)e.logger={log:_,warn:_,error:_};else{if(void 0===r&&(r=console),!("object"==typeof r&&r.log&&r.warn&&r.error))throw new Error("logger must implement log, warn and error methods");e.logger=r}}(this),this._schemas={},this._refs={},this._fragments={},this._formats=o(e.format);var r=this._schemaUriFormat=this._formats["uri-reference"];this._schemaUriFormatFunc=function(e){return r.test(e)},this._cache=e.cache||new t,this._loadingSchemas={},this._compilations=[],this.RULES=i(),this._getId=function(e){switch(e.schemaId){case"auto":return S;case"id":return E;default:return w}}(e),e.loopRequired=e.loopRequired||1/0,"property"==e.errorDataPath&&(e._errorDataPathProperty=!0),void 0===e.serialize&&(e.serialize=s),this._metaOpts=function(e){for(var r=u.copy(e._opts),t=0;t<m.length;t++)delete r[m[t]];return r}(this),e.formats&&function(e){for(var r in e._opts.formats){var t=e._opts.formats[r];e.addFormat(r,t)}}(this),function(e){var r;e._opts.$data&&(r=a("./refs/data.json"),e.addMetaSchema(r,r.$id,!0));if(!1===e._opts.meta)return;var t=a("./refs/json-schema-draft-07.json");e._opts.$data&&(t=l(t,v));e.addMetaSchema(t,p,!0),e._refs["http://json-schema.org/schema"]=p}(this),"object"==typeof e.meta&&this.addMetaSchema(e.meta),function(e){var r=e._opts.schemas;if(!r)return;if(Array.isArray(r))e.addSchema(r);else for(var t in r)e.addSchema(r[t],t)}(this)}function y(e,r){return r=d.normalizeId(r),e._schemas[r]||e._refs[r]||e._fragments[r]}function P(e,r,t){for(var a in r){var s=r[a];s.meta||t&&!t.test(a)||(e._cache.del(s.cacheKey),delete r[a])}}function E(e){return e.$id&&this.logger.warn("schema $id ignored",e.$id),e.id}function w(e){return e.id&&this.logger.warn("schema id ignored",e.id),e.$id}function S(e){if(e.$id&&e.id&&e.$id!=e.id)throw new Error("schema $id is different from id");return e.$id||e.id}function b(e,r){if(e._schemas[r]||e._refs[r])throw new Error('schema with key or id "'+r+'" already exists')}function _(){}},{"./cache":1,"./compile":5,"./compile/async":2,"./compile/error_classes":3,"./compile/formats":4,"./compile/resolve":6,"./compile/rules":7,"./compile/schema_obj":8,"./compile/util":10,"./data":11,"./keyword":38,"./refs/data.json":39,"./refs/json-schema-draft-07.json":40,"fast-json-stable-stringify":42}]},{},[])("ajv")});
//# sourceMappingURL=ajv.min.js.map
var telemetrySchema = [{"$id":"http://api.ekstep.org/telemetry/actor","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/actor/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/actor/type","type":"string"}},"required":["type","id"]},{"$id":"http://api.ekstep.org/telemetry/assess","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["ASSESS"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["item","pass","score","resvalues","duration"],"properties":{"item":{"$ref":"http://api.ekstep.org/telemetry/question"},"index":{"$id":"http://api.ekstep.org/telemetry/edata/index","type":"number"},"pass":{"$id":"http://api.ekstep.org/telemetry/edata/pass","type":"string"},"score":{"$id":"http://api.ekstep.org/telemetry/edata/score","type":"number"},"resvalues":{"$id":"http://api.ekstep.org/telemetry/edata/resvalues","type":"array","items":{"type":"object"}},"duration":{"$id":"http://api.ekstep.org/telemetry/edata/duration","type":"number"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/audit","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["AUDIT"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"properties":{"props":{"$id":"http://api.ekstep.org/telemetry/edata/props","type":"array","items":{"type":"string"}},"state":{"$id":"http://api.ekstep.org/telemetry/edata/state","type":"string"},"prevstate":{"$id":"http://api.ekstep.org/telemetry/edata/prevstate","type":"string"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/cdata","type":"array","items":{"type":"object","properties":{"type":{"$id":"http://api.ekstep.org/telemetry/cdata/type","type":"string"},"id":{"$id":"http://api.ekstep.org/telemetry/cdata/id","type":"string"}},"additionalProperties":false,"required":["type","id"]}},{"$id":"http://api.ekstep.org/telemetry/common","type":"object","properties":{"ets":{"$id":"http://api.ekstep.org/telemetry/ets","type":"number","format":"date-time"},"ver":{"$id":"http://api.ekstep.org/telemetry/ver","type":"string","enum":["3.0"]},"mid":{"$id":"http://api.ekstep.org/telemetry/mid","type":"string","minLength":1},"actor":{"$ref":"http://api.ekstep.org/telemetry/actor"},"context":{"$ref":"http://api.ekstep.org/telemetry/context"},"object":{"$ref":"http://api.ekstep.org/telemetry/object"},"tags":{"type":"array","items":{"type":"string"}}}},{"$id":"http://api.ekstep.org/telemetry/context","type":"object","properties":{"channel":{"$id":"http://api.ekstep.org/telemetry/context/channel","type":"string","minLength":1},"pdata":{"$ref":"http://api.ekstep.org/telemetry/pdata"},"env":{"$id":"http://api.ekstep.org/telemetry/context/env","type":"string"},"sid":{"$id":"http://api.ekstep.org/telemetry/context/sid","type":"string"},"did":{"$id":"http://api.ekstep.org/telemetry/context/did","type":"string"},"cdata":{"$ref":"http://api.ekstep.org/telemetry/cdata"}},"required":["channel","env","pdata"]},{"$id":"http://api.ekstep.org/telemetry/dspec","type":"object","properties":{"os":{"$id":"http://api.ekstep.org/telemetry/dspec/os","type":"string"},"make":{"$id":"http://api.ekstep.org/telemetry/dspec/make","type":"string"},"id":{"$id":"http://api.ekstep.org/telemetry/dspec/id","type":"string"},"mem":{"$id":"http://api.ekstep.org/telemetry/dspec/mem","type":"number","minimum":-1},"idisk":{"$id":"http://api.ekstep.org/telemetry/dspec/idisk","type":"number","minimum":-1},"edisk":{"$id":"http://api.ekstep.org/telemetry/dspec/edisk","type":"number","minimum":-1},"scrn":{"$id":"http://api.ekstep.org/telemetry/dspec/scrn","type":"number","minimum":-1},"camera":{"$id":"http://api.ekstep.org/telemetry/dspec/camera","type":"string"},"cpu":{"$id":"http://api.ekstep.org/telemetry/dspec/cpu","type":"string"},"sims":{"$id":"http://api.ekstep.org/telemetry/dspec/sims","type":"number","minimum":-1},"cap":{"$id":"http://api.ekstep.org/telemetry/dspec/cap","type":"array","items":{"type":"string"}}}},{"$id":"http://api.ekstep.org/telemetry/end","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["END"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"mode":{"$id":"http://api.ekstep.org/telemetry/edata/mode","type":"string"},"duration":{"$id":"http://api.ekstep.org/telemetry/edata/duration","type":"number"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"},"summary":{"$id":"http://api.ekstep.org/telemetry/edata/summary","type":"array","items":{"type":"object"}}}}}}]},{"$id":"http://api.ekstep.org/telemetry/error","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["ERROR"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["err","errtype","stacktrace"],"properties":{"err":{"$id":"http://api.ekstep.org/telemetry/edata/err","type":"string"},"errtype":{"$id":"http://api.ekstep.org/telemetry/edata/errtype","type":"string"},"stacktrace":{"$id":"http://api.ekstep.org/telemetry/edata/stacktrace","type":"string"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"},"object":{"$ref":"http://api.ekstep.org/telemetry/inlineobject"},"plugin":{"$ref":"http://api.ekstep.org/telemetry/plugin"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/exdata","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["EXDATA"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"data":{"$id":"http://api.ekstep.org/telemetry/edata/data","type":"string"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/feedback","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["FEEDBACK"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"properties":{"rating":{"$id":"http://api.ekstep.org/telemetry/edata/rating","type":"number"},"comments":{"$id":"http://api.ekstep.org/telemetry/edata/comments","type":"string"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/heartbeat","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["HEARTBEAT"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object"}}}]},{"$id":"http://api.ekstep.org/telemetry/impression","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["IMPRESSION"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type","pageid","uri"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"subtype":{"$id":"http://api.ekstep.org/telemetry/edata/subtype","type":"string"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"},"uri":{"$id":"http://api.ekstep.org/telemetry/edata/uri","type":"string"},"visits":{"$id":"http://api.ekstep.org/telemetry/edata/visits","type":"array","items":{"type":"object","properties":{"objid":{"$id":"http://api.ekstep.org/telemetry/edata/visits/objid","type":"string"},"objtype":{"$id":"http://api.ekstep.org/telemetry/edata/visits/objtype","type":"string"},"objver":{"$id":"http://api.ekstep.org/telemetry/edata/visits/objver","type":"string"},"section":{"$id":"http://api.ekstep.org/telemetry/edata/visits/section","type":"string"},"index":{"$id":"http://api.ekstep.org/telemetry/edata/visits/index","type":"number"}},"additionalProperties":false,"required":["objid","objtype"]}}}}}}]},{"$id":"http://api.ekstep.org/telemetry/inlineobject","type":"object","additionalProperties":false,"required":["id","type","ver"],"properties":{"id":{"$id":"http://api.ekstep.org/telemetry/inlineobject/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/inlineobject/type","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/inlineobject/ver","type":"string"},"subtype":{"$id":"http://api.ekstep.org/telemetry/inlineobject/subtype","type":"string"},"name":{"$id":"http://api.ekstep.org/telemetry/inlineobject/name","type":"string"},"code":{"$id":"http://api.ekstep.org/telemetry/inlineobject/code","type":"string"},"parent":{"$ref":"http://api.ekstep.org/telemetry/parent"}}},{"$id":"http://api.ekstep.org/telemetry/interact","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["INTERACT"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type","id"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"subtype":{"$id":"http://api.ekstep.org/telemetry/edata/subtype","type":"string"},"id":{"$id":"http://api.ekstep.org/telemetry/edata/id","type":"string"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"},"target":{"$ref":"http://api.ekstep.org/telemetry/target"},"plugin":{"$ref":"http://api.ekstep.org/telemetry/plugin"},"extra":{"$id":"http://api.ekstep.org/telemetry/edata/extra","type":"object"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/interrupt","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["INTERRUPT"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/items","type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"$id":"http://api.ekstep.org/telemetry/items/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/items/type","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/items/ver","type":"string"},"params":{"$id":"http://api.ekstep.org/telemetry/items/params","type":"array","items":{"type":"object"}},"origin":{"$id":"http://api.ekstep.org/telemetry/items/origin","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/items/origin/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/items/origin/type","type":"string"}}},"to":{"$id":"http://api.ekstep.org/telemetry/items/to","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/items/to/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/items/to/type","type":"string"}}}}}},{"$id":"http://api.ekstep.org/telemetry/log","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["LOG"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type","level","message"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"level":{"$id":"http://api.ekstep.org/telemetry/edata/level","type":"string"},"message":{"$id":"http://api.ekstep.org/telemetry/edata/message","type":"string"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"},"params":{"$id":"http://api.ekstep.org/telemetry/edata/params","type":"array","items":{"type":"object"}}}}}}]},{"$id":"http://api.ekstep.org/telemetry/object","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/object/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/object/type","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/object/ver","type":"string"},"rollup":{"$ref":"http://api.ekstep.org/telemetry/rollup"}}},{"$id":"http://api.ekstep.org/telemetry/parent","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/parent/id","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/parent/type","type":"string"}}},{"$id":"http://api.ekstep.org/telemetry/pdata","type":"object","properties":{"id":{"$id":"http://api.ekstep.org/telemetry/pdata/id","type":"string"},"pid":{"$id":"http://api.ekstep.org/telemetry/pdata/pid","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/pdata/ver","type":"string"}},"required":["id"]},{"$id":"http://api.ekstep.org/telemetry/plugin","type":"object","additionalProperties":false,"required":["id","ver"],"properties":{"id":{"$id":"http://api.ekstep.org/telemetry/plugin/id","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/plugin/ver","type":"string"},"category":{"$id":"http://api.ekstep.org/telemetry/plugin/category","type":"string"}}},{"$id":"http://api.ekstep.org/telemetry/question","type":"object","additionalProperties":false,"required":["id"],"properties":{"id":{"$id":"http://api.ekstep.org/telemetry/question/id","type":"string"},"maxscore":{"$id":"http://api.ekstep.org/telemetry/question/maxscore","type":"number"},"exlength":{"$id":"http://api.ekstep.org/telemetry/question/exlength","type":"number"},"params":{"$id":"http://api.ekstep.org/telemetry/question/params","type":"array","items":{"type":"object"}},"uri":{"$id":"http://api.ekstep.org/telemetry/question/uri","type":"string"},"desc":{"$id":"http://api.ekstep.org/telemetry/question/desc","type":"string"},"title":{"$id":"http://api.ekstep.org/telemetry/question/title","type":"string"},"mmc":{"$id":"http://api.ekstep.org/telemetry/question/mmc","type":"array","items":{"type":"string"}},"mc":{"$id":"http://api.ekstep.org/telemetry/question/mc","type":"array","items":{"type":"string"}}}},{"$id":"http://api.ekstep.org/telemetry/response","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["RESPONSE"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["target","type","values"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/type","type":"string"},"target":{"$ref":"http://api.ekstep.org/telemetry/target"},"values":{"type":"array","items":{"type":"object"}}}}}}]},{"$id":"http://api.ekstep.org/telemetry/rollup","type":"object","properties":{"l1":{"$id":"http://api.ekstep.org/telemetry/context/rollup/l1","type":"string"},"l2":{"$id":"http://api.ekstep.org/telemetry/context/rollup/l2","type":"string"},"l3":{"$id":"http://api.ekstep.org/telemetry/context/rollup/l3","type":"string"},"l4":{"$id":"http://api.ekstep.org/telemetry/context/rollup/l4","type":"string"}}},{"$id":"http://api.ekstep.org/telemetry/search","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["SEARCH"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["query","size","topn"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"query":{"$id":"http://api.ekstep.org/telemetry/edata/query","type":"string"},"filters":{"$id":"http://api.ekstep.org/telemetry/edata/filters","type":"object"},"sort":{"$id":"http://api.ekstep.org/telemetry/edata/sort","type":"object"},"correlationid":{"$id":"http://api.ekstep.org/telemetry/edata/correlationid","type":"string"},"size":{"$id":"http://api.ekstep.org/telemetry/edata/size","type":"number"},"topn":{"$id":"http://api.ekstep.org/telemetry/edata/topn","type":"array","items":{"type":"object"}}}}}}]},{"$id":"http://api.ekstep.org/telemetry/share","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["SHARE"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["items"],"properties":{"dir":{"$id":"http://api.ekstep.org/telemetry/edata/dir","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"items":{"$ref":"http://api.ekstep.org/telemetry/items"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/start","type":"object","required":["eid","ets","ver","mid","actor","context","edata"],"allOf":[{"$ref":"http://api.ekstep.org/telemetry/common"},{"properties":{"eid":{"$id":"http://api.ekstep.org/telemetry/eid","enum":["START"]},"edata":{"$id":"http://api.ekstep.org/telemetry/edata","type":"object","additionalProperties":false,"required":["type"],"properties":{"type":{"$id":"http://api.ekstep.org/telemetry/edata/type","type":"string"},"dspec":{"$ref":"http://api.ekstep.org/telemetry/dspec"},"uaspec":{"$ref":"http://api.ekstep.org/telemetry/uaspec"},"loc":{"$id":"http://api.ekstep.org/telemetry/edata/loc","type":"string"},"mode":{"$id":"http://api.ekstep.org/telemetry/edata/mode","type":"string"},"duration":{"$id":"http://api.ekstep.org/telemetry/edata/duration","type":"number"},"pageid":{"$id":"http://api.ekstep.org/telemetry/edata/pageid","type":"string"}}}}}]},{"$id":"http://api.ekstep.org/telemetry/target","type":"object","additionalProperties":false,"required":["id","ver","type"],"properties":{"id":{"$id":"http://api.ekstep.org/telemetry/target/id","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/target/ver","type":"string"},"type":{"$id":"http://api.ekstep.org/telemetry/target/type","type":"string"},"parent":{"$ref":"http://api.ekstep.org/telemetry/parent"}}},{"$id":"http://api.ekstep.org/telemetry/uaspec","type":"object","properties":{"agent":{"$id":"http://api.ekstep.org/telemetry/uaspec/agent","type":"string"},"ver":{"$id":"http://api.ekstep.org/telemetry/uaspec/ver","type":"string"},"system":{"$id":"http://api.ekstep.org/telemetry/uaspec/system","type":"string"},"platform":{"$id":"http://api.ekstep.org/telemetry/uaspec/platform","type":"string"},"raw":{"$id":"http://api.ekstep.org/telemetry/uaspec/raw","type":"string"}}}]
/**
 * @author Krushanu Mohapatra<Krushanu.Mohapatra@tarento.com>
 */
var detectClient = function() {

        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var nameOffset, verOffset, ix;

        // In Opera
        /* istanbul ignore next. Cannot test this as the test cases runs in phatomjs browser */
        if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browserName = "opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        // In MSIE
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "IE";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // In Chrome
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        // In Firefox
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }

        // trim the fullVersion string at semicolon/space if present
        /* istanbul ignore next. Cannot test this as the test cases runs in phatomjs browser */
        if ((ix = fullVersion.indexOf(";")) != -1)
            fullVersion = fullVersion.substring(0, ix);
        /* istanbul ignore next. Cannot test this as the test cases runs in phatomjs browser */
        if ((ix = fullVersion.indexOf(" ")) != -1)
            fullVersion = fullVersion.substring(0, ix);

        return { browser: browserName, browserver: fullVersion, os: navigator.platform };
    }

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function(s, p) {
    var m = {},
        l = m.lib = {},
        n = function() {},
        r = l.Base = {
            extend: function(b) {
                n.prototype = this;
                var h = new n;
                b && h.mixIn(b);
                h.hasOwnProperty("init") || (h.init = function() {
                    h.$super.init.apply(this, arguments)
                });
                h.init.prototype = h;
                h.$super = this;
                return h
            },
            create: function() {
                var b = this.extend();
                b.init.apply(b, arguments);
                return b
            },
            init: function() {},
            mixIn: function(b) {
                for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]);
                b.hasOwnProperty("toString") && (this.toString = b.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        q = l.WordArray = r.extend({
            init: function(b, h) {
                b = this.words = b || [];
                this.sigBytes = h != p ? h : 4 * b.length
            },
            toString: function(b) {
                return (b || t).stringify(this)
            },
            concat: function(b) {
                var h = this.words,
                    a = b.words,
                    j = this.sigBytes;
                b = b.sigBytes;
                this.clamp();
                if (j % 4)
                    for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4);
                else if (65535 < a.length)
                    for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2];
                else h.push.apply(h, a);
                this.sigBytes += b;
                return this
            },
            clamp: function() {
                var b = this.words,
                    h = this.sigBytes;
                b[h >>> 2] &= 4294967295 <<
                    32 - 8 * (h % 4);
                b.length = s.ceil(h / 4)
            },
            clone: function() {
                var b = r.clone.call(this);
                b.words = this.words.slice(0);
                return b
            },
            random: function(b) {
                for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0);
                return new q.init(h, b)
            }
        }),
        v = m.enc = {},
        t = v.Hex = {
            stringify: function(b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) {
                    var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                    g.push((k >>> 4).toString(16));
                    g.push((k & 15).toString(16))
                }
                return g.join("")
            },
            parse: function(b) {
                for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j,
                    2), 16) << 24 - 4 * (j % 8);
                return new q.init(g, a / 2)
            }
        },
        a = v.Latin1 = {
            stringify: function(b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
                return g.join("")
            },
            parse: function(b) {
                for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
                return new q.init(g, a)
            }
        },
        u = v.Utf8 = {
            stringify: function(b) {
                try {
                    return decodeURIComponent(escape(a.stringify(b)))
                } catch (g) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(b) {
                return a.parse(unescape(encodeURIComponent(b)))
            }
        },
        g = l.BufferedBlockAlgorithm = r.extend({
            reset: function() {
                this._data = new q.init;
                this._nDataBytes = 0
            },
            _append: function(b) {
                "string" == typeof b && (b = u.parse(b));
                this._data.concat(b);
                this._nDataBytes += b.sigBytes
            },
            _process: function(b) {
                var a = this._data,
                    g = a.words,
                    j = a.sigBytes,
                    k = this.blockSize,
                    m = j / (4 * k),
                    m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0);
                b = m * k;
                j = s.min(4 * b, j);
                if (b) {
                    for (var l = 0; l < b; l += k) this._doProcessBlock(g, l);
                    l = g.splice(0, b);
                    a.sigBytes -= j
                }
                return new q.init(l, j)
            },
            clone: function() {
                var b = r.clone.call(this);
                b._data = this._data.clone();
                return b
            },
            _minBufferSize: 0
        });
    l.Hasher = g.extend({
        cfg: r.extend(),
        init: function(b) {
            this.cfg = this.cfg.extend(b);
            this.reset()
        },
        reset: function() {
            g.reset.call(this);
            this._doReset()
        },
        update: function(b) {
            this._append(b);
            this._process();
            return this
        },
        finalize: function(b) {
            b && this._append(b);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(b) {
            return function(a, g) {
                return (new b.init(g)).finalize(a)
            }
        },
        _createHmacHelper: function(b) {
            return function(a, g) {
                return (new k.HMAC.init(b,
                    g)).finalize(a)
            }
        }
    });
    var k = m.algo = {};
    return m
}(Math);
(function(s) {
    function p(a, k, b, h, l, j, m) {
        a = a + (k & b | ~k & h) + l + m;
        return (a << j | a >>> 32 - j) + k
    }

    function m(a, k, b, h, l, j, m) {
        a = a + (k & h | b & ~h) + l + m;
        return (a << j | a >>> 32 - j) + k
    }

    function l(a, k, b, h, l, j, m) {
        a = a + (k ^ b ^ h) + l + m;
        return (a << j | a >>> 32 - j) + k
    }

    function n(a, k, b, h, l, j, m) {
        a = a + (b ^ (k | ~h)) + l + m;
        return (a << j | a >>> 32 - j) + k
    }
    for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0;
    q = q.MD5 = t.extend({
        _doReset: function() {
            this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(g, k) {
            for (var b = 0; 16 > b; b++) {
                var h = k + b,
                    w = g[h];
                g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360
            }
            var b = this._hash.words,
                h = g[k + 0],
                w = g[k + 1],
                j = g[k + 2],
                q = g[k + 3],
                r = g[k + 4],
                s = g[k + 5],
                t = g[k + 6],
                u = g[k + 7],
                v = g[k + 8],
                x = g[k + 9],
                y = g[k + 10],
                z = g[k + 11],
                A = g[k + 12],
                B = g[k + 13],
                C = g[k + 14],
                D = g[k + 15],
                c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                c = p(c, d, e, f, h, 7, a[0]),
                f = p(f, c, d, e, w, 12, a[1]),
                e = p(e, f, c, d, j, 17, a[2]),
                d = p(d, e, f, c, q, 22, a[3]),
                c = p(c, d, e, f, r, 7, a[4]),
                f = p(f, c, d, e, s, 12, a[5]),
                e = p(e, f, c, d, t, 17, a[6]),
                d = p(d, e, f, c, u, 22, a[7]),
                c = p(c, d, e, f, v, 7, a[8]),
                f = p(f, c, d, e, x, 12, a[9]),
                e = p(e, f, c, d, y, 17, a[10]),
                d = p(d, e, f, c, z, 22, a[11]),
                c = p(c, d, e, f, A, 7, a[12]),
                f = p(f, c, d, e, B, 12, a[13]),
                e = p(e, f, c, d, C, 17, a[14]),
                d = p(d, e, f, c, D, 22, a[15]),
                c = m(c, d, e, f, w, 5, a[16]),
                f = m(f, c, d, e, t, 9, a[17]),
                e = m(e, f, c, d, z, 14, a[18]),
                d = m(d, e, f, c, h, 20, a[19]),
                c = m(c, d, e, f, s, 5, a[20]),
                f = m(f, c, d, e, y, 9, a[21]),
                e = m(e, f, c, d, D, 14, a[22]),
                d = m(d, e, f, c, r, 20, a[23]),
                c = m(c, d, e, f, x, 5, a[24]),
                f = m(f, c, d, e, C, 9, a[25]),
                e = m(e, f, c, d, q, 14, a[26]),
                d = m(d, e, f, c, v, 20, a[27]),
                c = m(c, d, e, f, B, 5, a[28]),
                f = m(f, c,
                    d, e, j, 9, a[29]),
                e = m(e, f, c, d, u, 14, a[30]),
                d = m(d, e, f, c, A, 20, a[31]),
                c = l(c, d, e, f, s, 4, a[32]),
                f = l(f, c, d, e, v, 11, a[33]),
                e = l(e, f, c, d, z, 16, a[34]),
                d = l(d, e, f, c, C, 23, a[35]),
                c = l(c, d, e, f, w, 4, a[36]),
                f = l(f, c, d, e, r, 11, a[37]),
                e = l(e, f, c, d, u, 16, a[38]),
                d = l(d, e, f, c, y, 23, a[39]),
                c = l(c, d, e, f, B, 4, a[40]),
                f = l(f, c, d, e, h, 11, a[41]),
                e = l(e, f, c, d, q, 16, a[42]),
                d = l(d, e, f, c, t, 23, a[43]),
                c = l(c, d, e, f, x, 4, a[44]),
                f = l(f, c, d, e, A, 11, a[45]),
                e = l(e, f, c, d, D, 16, a[46]),
                d = l(d, e, f, c, j, 23, a[47]),
                c = n(c, d, e, f, h, 6, a[48]),
                f = n(f, c, d, e, u, 10, a[49]),
                e = n(e, f, c, d,
                    C, 15, a[50]),
                d = n(d, e, f, c, s, 21, a[51]),
                c = n(c, d, e, f, A, 6, a[52]),
                f = n(f, c, d, e, q, 10, a[53]),
                e = n(e, f, c, d, y, 15, a[54]),
                d = n(d, e, f, c, w, 21, a[55]),
                c = n(c, d, e, f, v, 6, a[56]),
                f = n(f, c, d, e, D, 10, a[57]),
                e = n(e, f, c, d, t, 15, a[58]),
                d = n(d, e, f, c, B, 21, a[59]),
                c = n(c, d, e, f, r, 6, a[60]),
                f = n(f, c, d, e, z, 10, a[61]),
                e = n(e, f, c, d, j, 15, a[62]),
                d = n(d, e, f, c, x, 21, a[63]);
            b[0] = b[0] + c | 0;
            b[1] = b[1] + d | 0;
            b[2] = b[2] + e | 0;
            b[3] = b[3] + f | 0
        },
        _doFinalize: function() {
            var a = this._data,
                k = a.words,
                b = 8 * this._nDataBytes,
                h = 8 * a.sigBytes;
            k[h >>> 5] |= 128 << 24 - h % 32;
            var l = s.floor(b /
                4294967296);
            k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
            k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
            a.sigBytes = 4 * (k.length + 1);
            this._process();
            a = this._hash;
            k = a.words;
            for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            return a
        },
        clone: function() {
            var a = t.clone.call(this);
            a._hash = this._hash.clone();
            return a
        }
    });
    r.MD5 = t._createHelper(q);
    r.HmacMD5 = t._createHmacHelper(q)
})(Math);
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
/**
 * Telemetry V3 Library
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 * @author Akash Gupta <Akash.Gupta@tarento.com> 
 */

// To support for node server environment 
if (typeof require === "function") {
   var Ajv = require('ajv');
	
	//To reduce size removing dependancy on ua-parser-js and userAgent will be defaulted to `defaultUserAgent` value
    //var UAParser = require("ua-parser-js");
}


var libraryDispatcher = {
    dispatch: function(event) {
        if (typeof document != 'undefined') {
            //To Support for external user who ever lisenting on this 'TelemetryEvent' event.
            // IT  WORKS ONLY FOR CLIENT SIDE
            document.dispatchEvent(new CustomEvent('TelemetryEvent', { detail: event }));
        } else {
            console.info("Library dispatcher supports only for client side.");
        }
    }
};


var Telemetry = (function() {
    this.telemetry = function() {};
    var instance = function() {};
    var telemetryInstance = this;
    this.telemetry.initialized = false;
    this.telemetry.config = {};
    this.telemetry._version = "3.0";
    this.telemetry.fingerPrintId = undefined;
    this.dispatcher = libraryDispatcher;
    this._defaultValue = {
            uid: "anonymous",
            authtoken: "",
            batchsize: 20,
            host: "https://api.ekstep.in",
            endpoint: "/data/v3/telemetry",
            apislug: "/action",
        },
        this.telemetryEnvelop = {
            "eid": "",
            "ets": "",
            "ver": "",
            "mid": '',
            "actor": {},
            "context": {},
            "object": {},
            "tags": [],
            "edata": ""
        }
    this._globalContext = {
        "channel": 'in.ekstep',
        "pdata": { id: "in.ekstep", ver: "1.0", pid: "" },
        "env": "contentplayer",
        "sid": "",
        "did": "",
        "cdata": [],
        "rollup": {}
    };
    this.runningEnv = 'client';
    this.enableValidation = false;
    this._globalObject = {};
    this.startData = [];
    this.ajv = new Ajv({ schemas: telemetrySchema });

    /**
     * Which is used to initialize the telemetry event
     * @param  {object} config - Configurations for the telemetry lib to initialize the service. " Example: config = { batchsize:10,host:"" } "
     */
    this.telemetry.initialize = function(config) {
        instance.init(config);
    }

    /**
     * Which is used to start and initialize the telemetry event. 
     * If the telemetry is already initialzed then it will trigger only start event.
     * @param  {object} config     [Telemetry lib configurations]
     * @param  {string} contentId  [Content Identifier]
     * @param  {string} contentVer [Content version]
     * @param  {object} data       [Can have userAgent,device spec object]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.start = function(config, contentId, contentVer, data, options) {
        data.duration = data.duration || (((new Date()).getTime()) * 0.001); // Converting duration miliSeconds to seconds
        if (contentId && contentVer) {
            telemetryInstance._globalObject.id = contentId;
            telemetryInstance._globalObject.ver = contentVer;
        }

        if (!Telemetry.initialized && config) {
            instance.init(config, contentId, contentVer)

        }
        instance.updateValues(options);
        var startEventObj = instance.getEvent('START', data);
        instance._dispatch(startEventObj)
        telemetryInstance.startData.push(JSON.parse(JSON.stringify(startEventObj)));
    }

    /**
     * Which is used to log the impression telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.impression = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('IMPRESSION', data));
    }

    /**
     * Which is used to log the interact telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.interact = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('INTERACT', data));
    }

    /**
     * Which is used to log the assess telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.assess = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('ASSESS', data));
    }

    /**
     * Which is used to log the response telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.response = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('RESPONSE', data));
    }

    /**
     * Which is used to log the interrupt telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.interrupt = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('INTERRUPT', data));
    }

    /**
     * Which is used to log the feedback telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.feedback = function(data, options) {
        var eksData = {
            "rating": data.rating,
            "comments": data.comments || ''
        }
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('FEEDBACK', eksData));
    }

    /**
     * Which is used to log the share telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.share = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('SHARE', data));
    }

    /**
     * Which is used to log the audit telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.audit = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('AUDIT', data));
    }

    /**
     * Which is used to log the error telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.error = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('ERROR', data));
    }

    /**
     * Which is used to log the heartbeat telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.heartbeat = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('HEARTBEAT', data));
    }

    /**
     * Which is used to log the log event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.log = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('LOG', data));
    }

    /**
     * Which is used to log the search event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.search = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('SEARCH', data));
    }

    /**
     * Which is used to log the metrics event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.metrics = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('METRICS', data));
    }

    /**
     * Which is used to log the exdata event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.exdata = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('EXDATA', data));
    }

    /**
     * Which is used to log the summary event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.summary = function(data, options) {
        instance.updateValues(options);
        instance._dispatch(instance.getEvent('SUMMARY', data));
    }

    /**
     * Which is used to log the end telemetry event.
     * @param  {object} data       [data which is need to pass in this event ex: {"type":"player","mode":"ContentPlayer","pageid":"splash"}]
     * @param  {object} options    [It can have `context, object, actor` can be explicitly passed in this event]
     */
    this.telemetry.end = function(data, options) {
        if (telemetryInstance.startData.length) {
            var startEventObj = telemetryInstance.startData.pop();
            data.duration = ((new Date()).getTime() - startEventObj.ets) * 0.001; // Converting duration miliSeconds to seconds
            instance.updateValues(options);
            instance._dispatch(instance.getEvent('END', data));
        } else {
            console.info("Please invoke start before invoking end event.")
        }
    }

    /**
     * Which is used to know the whether telemetry is initialized or not. 
     * @return {Boolean} 
     */
    this.telemetry.isInitialized = function() {
        return Telemetry.initialized;
    }

    /**
     * Which is used to reset the current context
     * @param  {object} context [Context value]
     */
    this.telemetry.resetContext = function(context) {
        telemetryInstance._currentContext = context || {};
    }

    /**
     * Which is used to reset the current object value.
     * @param  {object} object [Object value]
     */
    this.telemetry.resetObject = function(object) {
            telemetryInstance._currentObject = object || {};
        },

        /**
         * Which is used to reset the current actor value.
         * @param  {object} object [Object value]
         */
        this.telemetry.resetActor = function(actor) {
            telemetryInstance._currentActor = actor || {};
        }


    /**
     * Which is used to reset the current actor value.
     * @param  {object} object [Object value]
     */
    this.telemetry.resetTags = function(tags) {
        telemetryInstance._currentTags = tags || [];
    }

    this.telemetry.syncEvents = function() {
        if (typeof TelemetrySyncManager != 'undefined') {
            TelemetrySyncManager.syncEvents();
        }
    }

    /**
     * Which is used to initialize the telemetry in globally.
     * @param  {object} config     [Telemetry configurations]
     * @param  {string} contentId  [Identifier value]
     * @param  {string} contentVer [Version]
     * @param  {object} type       [object type]
     */
    instance.init = function(config, contentId, contentVer) {
        if (Telemetry.initialized) {
            console.log("Telemetry is already initialized..");
            return;
        }!config && (config = {})
        contentId && (telemetryInstance._globalObject.id = contentId);
        contentVer && (telemetryInstance._globalObject.ver = contentVer);
        config.runningEnv && (telemetryInstance.runningEnv = config.runningEnv);
        if (typeof config.enableValidation !== 'undefined') {
            telemetryInstance.enableValidation = config.enableValidation;
        }
        config.batchsize = config.batchsize ? (config.batchsize < 1 ? 1 : (config.batchsize > 1000 ? 1000 : config.batchsize)) : _defaultValue.batchsize;
        Telemetry.config = Object.assign(_defaultValue, config);
        Telemetry.initialized = true;
        telemetryInstance.dispatcher = Telemetry.config.dispatcher ? Telemetry.config.dispatcher : libraryDispatcher;
        instance.updateConfigurations(config);
        console.info("Telemetry is initialized.")
    }

    /**
     * Which is used to dispatch a telemetry events.
     * @param  {object} message [Telemetry event object]
     */
    instance._dispatch = function(message) {
        message.mid = message.eid + ':' + CryptoJS.MD5(JSON.stringify(message)).toString();
        if (telemetryInstance.enableValidation) {
            var validate = ajv.getSchema('http://api.ekstep.org/telemetry/' + message.eid.toLowerCase())
            var valid = validate(message)
            if (!valid) {
                console.error('Invalid ' + message.eid + ' Event: ' + ajv.errorsText(validate.errors))
                return
            }
        }
        if (telemetryInstance.runningEnv === 'client') {
            if (!message.context.did) {
                if (!Telemetry.fingerPrintId) {
					//To reduce size removing dependancy on fingerprintjs2, fingerPrintId and did will be defaulted to `defaultDId` value
                 /*   Telemetry.getFingerPrint(function(result, components) {
                        message.context.did = result;
                        Telemetry.fingerPrintId = result;
                        dispatcher.dispatch(message);
                    })*/
					message.context.did = "defaultDId";
					Telemetry.fingerPrintId = "defaultDId";
					dispatcher.dispatch(message);
                } else {
                    message.context.did = Telemetry.fingerPrintId;
                    dispatcher.dispatch(message);
                }
            } else {
                dispatcher.dispatch(message);
            }
        } else {
            dispatcher.dispatch(message);
        }
    }

    /**
     * Which is used to get the telemetry envelop data
     * @param  {string} eventId [Name of the event]
     * @param  {object} data    [Event data]
     * @return {object}         [Telemetry envelop data]
     */
    instance.getEvent = function(eventId, data) {
        telemetryInstance.telemetryEnvelop.eid = eventId;
        telemetryInstance.telemetryEnvelop.ets = (new Date()).getTime();
        telemetryInstance.telemetryEnvelop.ver = Telemetry._version;
        telemetryInstance.telemetryEnvelop.mid = '';
        telemetryInstance.telemetryEnvelop.actor = Object.assign({}, { "id": Telemetry.config.uid || 'anonymous', "type": 'User' }, instance.getUpdatedValue('actor'));
        telemetryInstance.telemetryEnvelop.context = Object.assign({}, instance.getGlobalContext(), instance.getUpdatedValue('context'));
        telemetryInstance.telemetryEnvelop.object = Object.assign({}, instance.getGlobalObject(), instance.getUpdatedValue('object'));
        telemetryInstance.telemetryEnvelop.tags = Object.assign([], Telemetry.config.tags, instance.getUpdatedValue('tags'));
        telemetryInstance.telemetryEnvelop.edata = data;
        return telemetryInstance.telemetryEnvelop;
    }

    /**
     * Which is used to assing to globalObject and globalContext value from the telemetry configurations.
     * @param  {object} config [Telemetry configurations]
     */
    instance.updateConfigurations = function(config) {
        config.object && (telemetryInstance._globalObject = config.object);
        config.channel && (telemetryInstance._globalContext.channel = config.channel);
        config.env && (telemetryInstance._globalContext.env = config.env);
        config.rollup && (telemetryInstance._globalContext.rollup = config.rollup);
        config.sid && (telemetryInstance._globalContext.sid = config.sid);
        config.did && (telemetryInstance._globalContext.did = config.did);
        config.cdata && (telemetryInstance._globalContext.cdata = config.cdata);
        config.pdata && (telemetryInstance._globalContext.pdata = config.pdata);


    }

    /**
     * Which is used to get the current updated global context value.
     * @return {object} 
     */
    instance.getGlobalContext = function() {
        return telemetryInstance._globalContext;
    }

    /**
     * Which is used to get the current global object value.
     * @return {object} 
     */
    instance.getGlobalObject = function() {
        return telemetryInstance._globalObject;
    }

    /**
     * Which is used to update the both context and object vlaue.
     * For any event explicitly context and object value can be passed.
     * @param  {object} context [Context value object]
     * @param  {object} object  [Object value]
     */
    instance.updateValues = function(options) {
        if (options) {
            options.context && (telemetryInstance._currentContext = options.context);
            options.object && (telemetryInstance._currentObject = options.object);
            options.actor && (telemetryInstance._currentActor = options.actor);
            options.tags && (telemetryInstance._currentTags = options.tags);
            options.runningEnv && (telemetryInstance.runningEnv = options.runningEnv);
        }
    }

    /**
     * Which is used to get the value of 'context','actor','object'
     * @param  {string} key [ Name of object which we is need to get ]
     * @return {object}     
     */
    instance.getUpdatedValue = function(key) {
        switch (key.toLowerCase()) {
            case 'context':
                return telemetryInstance._currentContext || {};
                break;
            case 'object':
                return telemetryInstance._currentObject || {};
                break;
            case 'actor':
                return telemetryInstance._currentActor || {};
                break;
            case 'tags':
                return telemetryInstance._currentTags || [];
                break;
        }
    }

    /**
     * Which is used to support for lower end deviecs.
     * If any of the devices which is not supporting ECMAScript 6 version
     */
    instance.objectAssign = function() {
        Object.assign = function(target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        }
    }
    var FPoptions = {
        preprocessor: function (key, value) {
            if (key == "userAgent") {
				//To reduce size removing dependancy on ua-parser-js and userAgent will be defaulted to `defaultUserAgent` value
                /*var parser = new UAParser(value); // https://github.com/faisalman/ua-parser-js
                var userAgentMinusVersion = parser.getOS().name + ' ' + parser.getBrowser().name
                return defaultUserAgent*/
				return "defaultUserAgent";
            }
            return value
        },
        audio: {
            timeout: 1000,
            // On iOS 11, audio context can only be used in response to user interaction.
            // We require users to explicitly enable audio fingerprinting on iOS 11.
            // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
            excludeIOS11: true
        },
        fonts: {
            swfContainerId: 'fingerprintjs2',
            swfPath: 'flash/compiled/FontList.swf',
            userDefinedFonts: [],
            extendedJsFonts: false
        },
        screen: {
            // To ensure consistent fingerprints when users rotate their mobile devices
            detectScreenOrientation: true
        },
        plugins: {
            sortPluginsFor: [/palemoon/i],
            excludeIE: false
        },
        extraComponents: [],
        excludes: {
            // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
            'enumerateDevices': true,
            // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
            'pixelRatio': true,
            // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
            'doNotTrack': true,
            // uses js fonts already
            'fontsFlash': true,
            'canvas': true,
            'screenResolution': true,
            'availableScreenResolution': true,
            'touchSupport': true,
            'plugins': true,
            'webgl': true,
            'audio': true,
            'language': true,
            'deviceMemory': true
        },
        NOT_AVAILABLE: 'not available',
        ERROR: 'error',
        EXCLUDED: 'excluded'
    }
    this.telemetry.getFingerPrint = function (cb) {
		//To reduce size removing dependancy on fingerprintjs2, fingerPrintId and did will be defaulted to `defaultDId` value
        /*Fingerprint2.getV18(FPoptions, function (result, components) {
            if (cb) cb(result, components)
        })*/
    }
    if (typeof Object.assign != 'function') {
        instance.objectAssign();
    }

    return this.telemetry;
})();

/**
 * Name space which is being fallowed
 * @type {[type]}
 */

EkTelemetry = $t = Telemetry;



/**
 * To support for the node backEnd, So any node developer can import this telemetry lib.
 */
if (typeof module != 'undefined') {
    module.exports = Telemetry;
}