(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['nonemanifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"dest") || (depth0 != null ? lookupProperty(depth0,"dest") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dest","hash":{},"data":data,"loc":{"start":{"line":13,"column":33},"end":{"line":13,"column":41}}}) : helper)))
    + "\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" standalone=\"no\"?>\n<manifest>\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":40}}}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":44}}}) : helper)))
    + "\">\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":35}}}) : helper)))
    + "</title>\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":25},"end":{"line":6,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":56},"end":{"line":6,"column":69}}}) : helper)))
    + "\">\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":37}}}) : helper)))
    + "</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":12,"column":27},"end":{"line":12,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":0},"end":{"line":14,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\n  </resources>\n</manifest>";
},"useData":true});
templates['outputcss'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "/*\n.plyr {\n  height: 100vh !important;\n}\n\n.plyr__video-wrapper {\n  padding-bottom: 0px !important;\n  height: 100vh !important;\n}\n\n.plyr__video-embed__container {\n  -webkit-transform: translateY(0) !important;\n      -ms-transform: translateY(0) !important;\n  transform: translateY(0) !important;\n  height: 100% !important;\n  padding-bottom: 0px !important;\n}\n*/\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"hideScrub") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":0},"end":{"line":54,"column":7}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return ".plyr__progress__container {\n  display: none !important;\n}\n";
},"4":function(container,depth0,helpers,partials,data) {
    return ".mejs-overlay,\n.mejs-poster,\n.mejs__container,\nmediaelementwrapper > iframe,\nmediaelementwrapper > video,\nmediaelementwrapper > div {\n  width: 100% !important;\n  height: 100% !important;\n}\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\nbody {\n  height:100vh;\n  margin:0;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:column;\n          flex-direction:column;\n  background-color:black;\n  color:white;\n  font-family: sans-serif;\n  overflow:hidden;\n}\n#frameContainer {\n  -webkit-box-flex:1;\n      -ms-flex:1;\n          flex:1;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n#frameContainer>div{\n  -webkit-box-flex:1;\n      -ms-flex:1;\n          flex:1;\n}\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isPlyr") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":31,"column":0},"end":{"line":65,"column":7}}})) != null ? stack1 : "");
},"useData":true});
templates['outputhtml'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<link href=\"https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelementplayer.min.css\" rel=\"stylesheet\" type=\"text/css\">\n		<script src=\"https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelement-and-player.js\" type=\"text/javascript\"></script>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<link href=\"https://cdn.plyr.io/3.5.6/plyr.css\" rel=\"stylesheet\" type=\"text/css\">\n		<script src=\"https://cdn.plyr.io/3.5.6/plyr.js\" type=\"text/javascript\"></script>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<script>\n			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n			ga('create','"
    + alias4(((helper = (helper = lookupProperty(helpers,"analytics") || (depth0 != null ? lookupProperty(depth0,"analytics") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"analytics","hash":{},"data":data,"loc":{"start":{"line":27,"column":16},"end":{"line":27,"column":29}}}) : helper)))
    + "','auto');ga('set','anonymizeIp',true);\n			document.addEventListener(\"DOMContentLoaded\",function(dom){document.body.addEventListener('pageview',function(event){\n			ga('send','event','"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":29,"column":22},"end":{"line":29,"column":30}}}) : helper)))
    + "','page',event.detail,{nonInteraction:true});},false)});\n		</script>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<video id=\"player\""
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playerApi") : depth0)) != null ? lookupProperty(stack1,"src") : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":21},"end":{"line":36,"column":73}}})) != null ? stack1 : "")
    + "></video>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"playerApi") : depth0)) != null ? lookupProperty(stack1,"src") : stack1), depth0))
    + "\"";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<audio id=\"player\""
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playerApi") : depth0)) != null ? lookupProperty(stack1,"src") : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":21},"end":{"line":38,"column":73}}})) != null ? stack1 : "")
    + "></audio>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n	<head>\n		<meta charset=\"utf-8\" />\n		<meta name=\"title\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":30},"end":{"line":5,"column":38}}}) : helper)))
    + "\" />\n		<meta name=\"description\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":6,"column":36},"end":{"line":6,"column":51}}}) : helper)))
    + "\" />\n		<meta name=\"copyright\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"copyright") || (depth0 != null ? lookupProperty(depth0,"copyright") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"copyright","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":47}}}) : helper)))
    + "\" />\n		<meta name=\"timestamp\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":8,"column":34},"end":{"line":8,"column":47}}}) : helper)))
    + "\" />\n		<meta name=\"author\" content=\"https://video.to-scorm.com\" />\n		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n		<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":9},"end":{"line":11,"column":17}}}) : helper)))
    + "</title>\n		<script crossorigin=\"anonymous\" src=\"https://polyfill.io/v3/polyfill.min.js\"></script>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isMediaElement") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":13,"column":0},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "		<link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"analytics") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":0},"end":{"line":31,"column":7}}})) != null ? stack1 : "")
    + "	</head>\n	<body>\n		<div id=\"frameContainer\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":35,"column":0},"end":{"line":39,"column":7}}})) != null ? stack1 : "")
    + "		</div>\n		<script src=\"run.js\" type=\"text/javascript\"></script>\n	</body>\n</html>";
},"useData":true});
templates['outputjs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "// global variables for scorm and the runtime\nvar _sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?\"API\":\"\",_timeSessionStart=null,_timeout,_now,_unloaded=!1,alreadyShown=0;\n\nfunction resume() {\n  var data = getSuspendData();\n  return (data.length&&data.substr(0,3)===\"lz;\"?LZString.decompressFromUTF16(data.substr(3)):data);\n}\n\nfunction suspend(data) {\n  if (data.length>4090) data = \"lz;\" + LZString.compressToUTF16(data);\n  setSuspendData(data);\n}\n\n// scorm 1.2 / 2004 common runtime / utils\nfunction learnerWillReturn(a){\"API_1484_11\"==_sAPI?a?scormSetValue(\"cmi.exit\",\"suspend\"):scormSetValue(\"cmi.exit\",\"normal\"):\"API\"==_sAPI&&(a?scormSetValue(\"cmi.core.exit\",\"suspend\"):scormSetValue(\"cmi.core.exit\",\"\"))}\nfunction isFirstLaunch(){if(\"API_1484_11\"==_sAPI)var a=scormGetValue(\"cmi.entry\");else if(\"API\"==_sAPI)a=scormGetValue(\"cmi.core.entry\");else return!0;return\"ab-initio\"!=a?!1:!0}\nfunction startSessionTime(){return _timeSessionStart=new Date}\nfunction setSessionTime(a){var b=(new Date).getTime();a=Math.round((b-a)/1E3);a=formatTime(a);\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.session_time\",a):\"API\"==_sAPI&&scormSetValue(\"cmi.core.session_time\",a)}\nfunction getBookmark(){return\"API_1484_11\"==_sAPI?scormGetValue(\"cmi.location\"):\"API\"==_sAPI?scormGetValue(\"cmi.core.lesson_location\"):\"\"}\nfunction setBookmark(a){\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.location\",a+\"\"):\"API\"==_sAPI&&scormSetValue(\"cmi.core.lesson_location\",a+\"\");emitEvent('pageview',a);}\nfunction getSuspendData(){return\"API_1484_11\"==_sAPI||\"API\"==_sAPI?scormGetValue(\"cmi.suspend_data\"):\"\"}\nfunction setSuspendData(a){\"API_1484_11\"!=_sAPI&&\"API\"!=_sAPI||scormSetValue(\"cmi.suspend_data\",a+\"\")}\nfunction setCompletionStatus(a){if(\"API_1484_11\"==_sAPI)scormSetValue(\"cmi.completion_status\",a+\"\");else if(\"API\"==_sAPI&&(\"completed\"==a||\"incomplete\"==a||\"not attempted\"==a)){var b=scormGetValue(\"cmi.core.lesson_status\");\"passed\"==b||\"failed\"==b?\"incomplete\"!=a&&\"not attempted\"!=a||scormSetValue(\"cmi.core.lesson_status\",a+\"\"):scormSetValue(\"cmi.core.lesson_status\",a+\"\")}}\nfunction getCompletionStatus(){if(\"API_1484_11\"==_sAPI)return scormGetValue(\"cmi.completion_status\");if(\"API\"==_sAPI){var a=scormGetValue(\"cmi.core.lesson_status\");return\"passed\"==a||\"failed\"==a?\"completed\":a}return\"not attempted\"}\nfunction setPassFail(a){\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.success_status\",a+\"\"):\"API\"==_sAPI&&scormSetValue(\"cmi.core.lesson_status\",a+\"\")}\nfunction setScore(a){if(\"API_1484_11\"==_sAPI)scormSetValue(\"cmi.score.scaled\",a+\"\");else if(\"API\"==_sAPI){scormSetValue(\"cmi.core.score.min\",\"0\");scormSetValue(\"cmi.core.score.max\",\"100\");var b=100*a;100<b&&(b=100);0>a-0?scormSetValue(\"cmi.core.score.raw\",\"0\"):scormSetValue(\"cmi.core.score.raw\",Math.round(b)+\"\")}}\nfunction scormInitialize(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSInitialize(\"\"):a.Initialize(\"\");return a}\nfunction scormTerminate(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSFinish(\"\"):a.Terminate(\"\");return a}\nfunction scormCommit(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSCommit(\"\"):a.Commit(\"\");return a}\nfunction scormGetValue(a){var b=getAPI();if(null==b)return\"\";if(\"API\"==_sAPI)var c=b.LMSGetValue(a),b=b.LMSGetLastError();else c=b.GetValue(a),b=b.GetLastError();return\"0\"!=b?\"\":c}\nfunction scormSetValue(a,b){var c=getAPI();if(null==c)return\"true\";c=\"API\"==_sAPI?c.LMSSetValue(a,b):c.SetValue(a,b);return c}\nfunction formatTime(a){var b=Math.floor(a/3600);a-=3600*b;var c=Math.floor(a/60);a-=60*c;return\"API_1484_11\"==_sAPI?\"PT\"+b+\"H\"+c+\"M\"+a+\"S\":\"API\"==_sAPI?(10>b&&(b=\"0\"+b),10>c&&(c=\"0\"+c),10>a&&(a=\"0\"+a),b+\":\"+c+\":\"+a):\"\"}\nfunction findAPI(a,b){var c=0;try{for(;null==a[b]&&null!=a.parent&&a.parent!=a;){c++;if(7<c)return console.log(\"findAPI gave up\",a,b),alert(\"Error finding API -- too deeply nested.\"),null;a=a.parent}}catch(d){return console.log(\"findAPI forced to stop at domain boundary\",a,b),null}return a[b]}\nfunction getAPI(){if(null!=apiHandle)return apiHandle;var a=findAPI(window,\"API_1484_11\");null==a&&null!=window.opener&&\"undefined\"!=typeof window.opener&&(a=findAPI(window.opener,\"API_1484_11\"));null==a?(a=findAPI(window,\"API\"),null==a&&null!=window.opener&&\"undefined\"!=typeof window.opener&&(a=findAPI(window.opener,\"API\")),null!=a&&(_sAPI=\"API\")):_sAPI=\"API_1484_11\";if(null==a&&!alreadyShown){alreadyShown=1;alert(\"Unable to find an API adapter - no SCORM data will be saved in this session\")};return a};\nfunction isJSON(b){try{var a=JSON.parse(b);if(a&&\"object\"===typeof a)return!0}catch(c){}return!1};\nfunction findInJson(obj,prop,value){ for(var i=0,j=obj.length,k;i<j,k=obj[i];i++)if(value===k[prop])return k}\nfunction emitEvent(name,data){var event=new CustomEvent(name,{detail:data});document.body.dispatchEvent(event);}\n\n// create a proxy for sub-runtimes bound to pages\nfunction apiProxy() {\n	this.LMSInitialize = function() { return \"true\"; };\n	this.LMSFinish = function () { return \"true\"; };\n	this.LMSCommit = function (param) { return \"true\"; };\n	this.LMSGetLastError = function () { return 0; };\n	this.LMSGetErrorString = function () { return \"No error\"; };\n	this.LMSGetDiagnostic = function (param) { return param; };\n	this.LMSGetValue = function (param) { switch(param){default: return \"\";}; };\n	this.LMSSetValue = function (param,value) { switch(param){default: return \"true\";}; };\n}\nwindow.ninjaApiProxy = new apiProxy();\n\n// find scorm API; getAPI() also sets _sAPI; apiHandle is the object reference\nvar apiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI();\nscormInitialize();\nvar complete = false;\n\nfunction doUnload() {\n	if (!_unloaded) {\n		scormCommit();\n		setSessionTime(_timeSessionStart);\n		scormTerminate();\n		_unloaded = true;\n	}\n}\nfunction setComplete() {\n	if (!complete) {\n		learnerWillReturn(false);\n		if (\"API_1484_11\"==_sAPI) setPassFail(\"passed\");\n		setCompletionStatus(\"completed\");\n		setScore(100);\n		scormCommit();\n	}\n}\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "function setComplete(){}\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "	startSessionTime();\n	setCompletionStatus(\"incomplete\");\n	learnerWillReturn(true);\n	scormCommit();\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	var Player = new Plyr(document.getElementById('player'), {\n	  settings: ['quality','speed'],\n	  duration: "
    + alias4(((helper = (helper = lookupProperty(helpers,"ends") || (depth0 != null ? lookupProperty(depth0,"ends") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data,"loc":{"start":{"line":92,"column":13},"end":{"line":92,"column":21}}}) : helper)))
    + ",\n	  youtube: {noCookie: true},\n	});\n	Player.source = {\n	  type: 'video',\n	  sources: [{\n		src: \""
    + alias4(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":98,"column":8},"end":{"line":98,"column":19}}}) : helper)))
    + "\",\n		"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"provider") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":99,"column":2},"end":{"line":99,"column":50}}})) != null ? stack1 : "")
    + "\n		"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"provider") : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":100,"column":2},"end":{"line":100,"column":50}}})) != null ? stack1 : "")
    + "\n	  }]\n	};\n	Player.on('timeupdate', function(e){\n		if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"completes") || (depth0 != null ? lookupProperty(depth0,"completes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"completes","hash":{},"data":data,"loc":{"start":{"line":104,"column":28},"end":{"line":104,"column":41}}}) : helper)))
    + ") {\n			setComplete()\n		}\n		if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"ends") || (depth0 != null ? lookupProperty(depth0,"ends") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data,"loc":{"start":{"line":107,"column":28},"end":{"line":107,"column":36}}}) : helper)))
    + ") {\n			Player.pause()\n		}\n		setBookmark(Player.currentTime);\n	});\n	Player.on('play', function(e) {\n		if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"ends") || (depth0 != null ? lookupProperty(depth0,"ends") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data,"loc":{"start":{"line":113,"column":28},"end":{"line":113,"column":36}}}) : helper)))
    + ") {\n			Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":114,"column":24},"end":{"line":114,"column":34}}}) : helper)))
    + ";\n		}\n		if (Player.currentTime < "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":116,"column":27},"end":{"line":116,"column":37}}}) : helper)))
    + ") {\n			Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":117,"column":24},"end":{"line":117,"column":34}}}) : helper)))
    + ";\n		}\n	});\n	Player.on('loadedmetadata', function(e) {\n		Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":121,"column":23},"end":{"line":121,"column":33}}}) : helper)))
    + ";\n	});\n	var plyrEl = document.querySelector('.plyr'),\n		contain = document.getElementById('frameContainer'),\n		wrap = document.querySelector('.plyr__video-wrapper');\n	if (plyrEl) {\n		fit(plyrEl, contain);\n		fit(wrap, plyrEl);\n	}\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "provider: \""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"provider") || (depth0 != null ? lookupProperty(depth0,"provider") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"provider","hash":{},"data":data,"loc":{"start":{"line":99,"column":29},"end":{"line":99,"column":41}}}) : helper)))
    + "\",";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "type: \""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"mime") || (depth0 != null ? lookupProperty(depth0,"mime") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mime","hash":{},"data":data,"loc":{"start":{"line":100,"column":29},"end":{"line":100,"column":37}}}) : helper)))
    + "\",";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	var Player = new MediaElementPlayer(document.getElementById('player'), {\n		features: ['playpause','current', 'duration', 'volume'"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"hideScrub") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":132,"column":56},"end":{"line":132,"column":100}}})) != null ? stack1 : "")
    + "],\n		startVolume: 0.5,\n		youtube: {\n			nocookie: true,\n			autoplay: 0,\n			controls: 0,\n			modestbranding: 1\n		},\n		poster: '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"poster") || (depth0 != null ? lookupProperty(depth0,"poster") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data,"loc":{"start":{"line":140,"column":11},"end":{"line":140,"column":23}}}) : helper))) != null ? stack1 : "")
    + "',\n		showPosterWhenPaused: false,\n		showPosterWhenEnded: true,\n		stretching: 'auto',\n		videoHeight: '100%',\n		videoWidth: '100%',\n		src: '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":146,"column":8},"end":{"line":146,"column":17}}}) : helper))) != null ? stack1 : "")
    + "',\n		success: function(me, node) {\n			me.addEventListener('timeupdate', function() {\n				if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"completes") || (depth0 != null ? lookupProperty(depth0,"completes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"completes","hash":{},"data":data,"loc":{"start":{"line":149,"column":30},"end":{"line":149,"column":43}}}) : helper)))
    + ") {\n					setComplete();\n				}\n				if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"ends") || (depth0 != null ? lookupProperty(depth0,"ends") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data,"loc":{"start":{"line":152,"column":30},"end":{"line":152,"column":38}}}) : helper)))
    + ") {\n					Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":153,"column":26},"end":{"line":153,"column":36}}}) : helper)))
    + ";\n					Player.pause();\n				}\n				setBookmark(Player.currentTime);\n			})\n			me.addEventListener('play', function() {\n				if (Player.currentTime >= "
    + alias4(((helper = (helper = lookupProperty(helpers,"ends") || (depth0 != null ? lookupProperty(depth0,"ends") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data,"loc":{"start":{"line":159,"column":30},"end":{"line":159,"column":38}}}) : helper)))
    + ") {\n					Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":160,"column":26},"end":{"line":160,"column":36}}}) : helper)))
    + ";\n				}\n				if (Player.currentTime < "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":162,"column":29},"end":{"line":162,"column":39}}}) : helper)))
    + ") {\n					Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":163,"column":26},"end":{"line":163,"column":36}}}) : helper)))
    + ";\n				}\n			})\n			me.addEventListener('loadedmetadata', function() {\n				Player.currentTime = "
    + alias4(((helper = (helper = lookupProperty(helpers,"starts") || (depth0 != null ? lookupProperty(depth0,"starts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data,"loc":{"start":{"line":167,"column":25},"end":{"line":167,"column":35}}}) : helper)))
    + ";\n			})\n		}\n	});\n	Player.setSrc(\""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":171,"column":16},"end":{"line":171,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\");\n	Player.setPoster(\""
    + alias4(((helper = (helper = lookupProperty(helpers,"poster") || (depth0 != null ? lookupProperty(depth0,"poster") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data,"loc":{"start":{"line":172,"column":19},"end":{"line":172,"column":29}}}) : helper)))
    + "\");\n	Player.load();\n";
},"13":function(container,depth0,helpers,partials,data) {
    return ", 'progress'";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "// fit.js\nvar fit=function(){\"use strict\";function t(t){return t.toUpperCase()}function e(t){return\"number\"==typeof t&&!isNaN(t)}function n(){return(new Date).getTime()}function i(t,e){for(var n=[],i=0,r=t.length;r>i;i++)n[i]=e(t[i]);return n}function r(t,e){for(var n in e)n in t||(t[n]=e[n]);return t}function o(e){if(!d)for(var n,i=H(C.body),r=w,o=0,a=T.length;a>o&&(d=T[o],n=d+r,!(n in i))&&(d=d.replace(/^(\\w)/,t),n=d+r,!(n in i));o++);return d+e}function a(t){var e=H(t),n=e[o(w)].replace(/[a-z()]/gi,\"\").split(\",\");if(n.length<6)return[1,0,0,1,0,0];for(var i=0;6>i;i++)n[i]=parseFloat(n[i]);return n}function f(t,e){var n=a(e);n[0]=t.scale,n[3]=t.scale,n[4]+=t.tx,n[5]+=t.ty;var r=i(n,function(t){return t.toFixed(6)});e.style[o(m)]=\"0 0\",e.style[o(w)]=\"matrix(\"+r.join(\",\")+\")\"}function s(t,e){var n=H(e),i=parseFloat(n.left)||0,r=parseFloat(n.top)||0;\"static\"===n.position&&(e.style.position=\"relative\"),e.style.left=i+t.tx+b,e.style.top=r+t.ty+b,e.style.height=t.height+b,e.style.width=t.width+b}function l(t,e){var n=H(e),i=parseFloat(n.marginLeft)||0,r=parseFloat(n.marginTop)||0;e.style.marginLeft=i+t.tx+b,e.style.marginTop=r+t.ty+b,e.style.height=t.height+b,e.style.width=t.width+b}function h(t,e){e.height*=t.scale,e.width*=t.scale,e.x+=t.tx,e.y+=t.ty}function u(t){if(t.nodeType&&1==t.nodeType){var n=t.getBoundingClientRect();t={height:t.offsetHeight,width:t.offsetWidth,x:n.left,y:n.top}}return!e(t.x)&&e(t.left)&&(t.x=t.left),!e(t.y)&&e(t.top)&&(t.y=t.top),t}function c(){var t=n(),e=t-y;if(x>=e)clearInterval(v),v=setTimeout(c,x-e);else{for(var i=0,r=M.length;r>i;i++)M[i]();y=t}}function g(t,e,n,i,r){var o=u(t),a=u(e),s=0===o.width?R:o.width,l=0===o.height?P:o.height,c=0===a.width?I:a.width,g=0===a.height?P:a.height;R=s,B=l,I=c,P=g;var p=c/s,d=g/l,y=s/l,v=c/g,x=n.cover?d:p,m=n.cover?p:d,w=y>=v?x:m,T=s*w,O=l*w,F=n.hAlign==E?.5*(T-c):n.hAlign==L?T-c:0,b=n.vAlign==E?.5*(O-g):n.vAlign==A?O-g:0;return r=r||{},r.tx=a.x-F-o.x,r.ty=a.y-b-o.y,r.x=a.x-F-o.x*w,r.y=a.y-b-o.y*w,r.height=o.height*w,r.width=o.width*w,r.scale=w,i?i(r,t):n.apply&&(i=\"undefined\"!=typeof HTMLElement&&t instanceof HTMLElement?f:h)(r,t),r}function p(t,e,n,i){if(!t||!e)throw\"You must supply a target and a container\";\"function\"==typeof n&&(i=n,n={}),n=r(n||{},N);var o=g(t,e,n,i);return n.watch&&(M.length||(z.addEventListener?(z.addEventListener(\"resize\",c),z.addEventListener(\"orientationchange\",c)):(z.attachEvent(\"onresize\",c),z.attachEvent(\"onorientationchange\",c))),o.trigger=function(){g(t,e,n,i,o)},o.on=function(t){var e=M.indexOf(o.trigger);~e||M.push(o.trigger),t||o.trigger()},o.off=function(){var t=M.indexOf(o.trigger);~t&&M.splice(t,1)},o.on(!0)),o}var d,y,v,x=50,m=\"TransformOrigin\",w=\"Transform\",T=\"moz ms o webkit\".split(\" \"),E=\"center\",A=\"bottom\",L=\"right\",O=\"left\",F=\"top\",b=\"px\",z=window||self,C=document,H=z.getComputedStyle,M=[],N={hAlign:E,vAlign:E,watch:!1,cover:!1,apply:!0};Array.prototype.indexOf||(Array.prototype.indexOf=function(t){for(var e=0;e<this.length;++e)if(this[e]==t)return e;return-1});var R,B,I,P;return r(p,{watching:M,defaults:N,cssTransform:f,cssPosition:s,cssMargin:l,CENTER:E,BOTTOM:A,RIGHT:L,LEFT:O,TOP:F})}();\"undefined\"!=typeof exports&&(\"undefined\"!=typeof module&&module.exports&&(exports=module.exports=fit),exports.fit=fit);\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasApi") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":0},"end":{"line":80,"column":7}}})) != null ? stack1 : "")
    + "\ndocument.addEventListener(\"DOMContentLoaded\", function domLoader(event) {\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasApi") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":83,"column":0},"end":{"line":88,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isPlyr") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":89,"column":0},"end":{"line":174,"column":7}}})) != null ? stack1 : "")
    + "});";
},"useData":true});
templates['popup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"cs-overlay\" class=\"pi\" style=\"z-index:"
    + alias4(((helper = (helper = lookupProperty(helpers,"zindex") || (depth0 != null ? lookupProperty(depth0,"zindex") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zindex","hash":{},"data":data,"loc":{"start":{"line":1,"column":47},"end":{"line":1,"column":57}}}) : helper)))
    + "\">\n	<div class=\"pi-wrapper\">\n		<div class=\"pi-toolbar\">\n			<div class=\"pi-icon\">URL:</div>\n			<a class=\"pi-url\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":5,"column":27},"end":{"line":5,"column":34}}}) : helper)))
    + "\" target=\"_blank\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":5,"column":52},"end":{"line":5,"column":59}}}) : helper)))
    + "</a>\n			<div class=\"pi-close\" onclick=\"popIframe()\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path stroke=\"white\" stroke-width=\"3px\" d=\"M0 0l24 24M0 24L24 0\"/></svg></div>\n		</div>\n		<iframe class=\"pi-content\" allowfullscreen src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":8,"column":50},"end":{"line":8,"column":57}}}) : helper)))
    + "\"></iframe>\n	</div>\n</div>";
},"useData":true});
templates['scorm12manifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"dest") || (depth0 != null ? lookupProperty(depth0,"dest") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dest","hash":{},"data":data,"loc":{"start":{"line":23,"column":33},"end":{"line":23,"column":41}}}) : helper)))
    + "\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" ?>\n<manifest identifier=\"ninja.scormification.document.scorm12.I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":2,"column":61},"end":{"line":2,"column":74}}}) : helper)))
    + "\" version=\"1\"\n       xmlns=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2\"\n       xmlns:adlcp=\"http://www.adlnet.org/xsd/adlcp_rootv1p2\"\n       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n       xsi:schemaLocation=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd\n                           http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd\n                           http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd\">\n  <metadata>\n    <schema>ADL SCORM</schema>\n    <schemaversion>1.2</schemaversion>\n  </metadata>\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":13,"column":27},"end":{"line":13,"column":40}}}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":14,"column":31},"end":{"line":14,"column":44}}}) : helper)))
    + "\">\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":15,"column":13},"end":{"line":15,"column":21}}}) : helper)))
    + "</title>\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":16,"column":25},"end":{"line":16,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":16,"column":56},"end":{"line":16,"column":69}}}) : helper)))
    + "\" isvisible=\"true\">\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":17,"column":15},"end":{"line":17,"column":23}}}) : helper)))
    + "</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":22,"column":27},"end":{"line":22,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":0},"end":{"line":24,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\n  </resources>\n</manifest>";
},"useData":true});
templates['scorm2004manifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"dest") || (depth0 != null ? lookupProperty(depth0,"dest") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dest","hash":{},"data":data,"loc":{"start":{"line":32,"column":33},"end":{"line":32,"column":41}}}) : helper)))
    + "\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "﻿<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<manifest xmlns=\"http://www.imsglobal.org/xsd/imscp_v1p1\" xmlns:imsmd=\"http://ltsc.ieee.org/xsd/LOM\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:adlcp=\"http://www.adlnet.org/xsd/adlcp_v1p3\" xmlns:imsss=\"http://www.imsglobal.org/xsd/imsss\" xmlns:adlseq=\"http://www.adlnet.org/xsd/adlseq_v1p3\" xmlns:adlnav=\"http://www.adlnet.org/xsd/adlnav_v1p3\" identifier=\"MANIFEST-"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":2,"column":382},"end":{"line":2,"column":395}}}) : helper)))
    + "\" xsi:schemaLocation=\"http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://ltsc.ieee.org/xsd/LOM lom.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd\">\r\n  <metadata>\r\n    <schema>ADL SCORM</schema>\r\n    <schemaversion>2004 4th Edition</schemaversion>\r\n    <imsmd:lom>\r\n      <imsmd:general>\r\n        <imsmd:title>\r\n          <imsmd:string>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":24},"end":{"line":9,"column":32}}}) : helper)))
    + "</imsmd:string>\r\n        </imsmd:title>\r\n        <imsmd:language>en</imsmd:language>\r\n        <imsmd:description>\r\n          <imsmd:string><![CDATA["
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-description") || (depth0 != null ? lookupProperty(depth0,"option-course-description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-description","hash":{},"data":data,"loc":{"start":{"line":13,"column":33},"end":{"line":13,"column":62}}}) : helper)))
    + "]]></imsmd:string>\r\n        </imsmd:description>\r\n      </imsmd:general>\r\n    </imsmd:lom>\r\n  </metadata>\r\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":18,"column":27},"end":{"line":18,"column":40}}}) : helper)))
    + "\">\r\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":19,"column":31},"end":{"line":19,"column":44}}}) : helper)))
    + "\" structure=\"hierarchical\">\r\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":20,"column":13},"end":{"line":20,"column":21}}}) : helper)))
    + "</title>\r\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":21,"column":25},"end":{"line":21,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":21,"column":56},"end":{"line":21,"column":69}}}) : helper)))
    + "\" isvisible=\"true\">\r\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":22,"column":15},"end":{"line":22,"column":23}}}) : helper)))
    + "</title>\r\n      </item>\r\n      <imsss:sequencing>\r\n        <imsss:controlMode choiceExit=\"true\" flow=\"true\" />\r\n        <imsss:deliveryControls completionSetByContent=\"true\" objectiveSetByContent=\"false\" />\r\n      </imsss:sequencing>\r\n    </organization>\r\n  </organizations>\r\n  <resources>\r\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":31,"column":27},"end":{"line":31,"column":40}}}) : helper)))
    + "\" adlcp:scormType=\"sco\" type=\"webcontent\" href=\"index.html\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":0},"end":{"line":33,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\r\n  </resources>\r\n</manifest>";
},"useData":true});
})();