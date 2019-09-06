(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['outputcss'] = template({"1":function(container,depth0,helpers,partials,data) {
    return ".plyr__progress__container {\n  display: none !important;\n}\n.mejs__time-slider {\n  display: none !important;\n}\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "#frameContainer {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n\n#frameContainer > iframe {\n  width: 100%;\n  height: 100%;\n}\n.plyr {\n  height: 100%;\n}\n\n.plyr__video-wrapper {\n  height: 100%;\n}\n\n.plyr__video-wrapper > video {\n  height: 100%;\n}\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hideScrub : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['outputhtml'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<video id=\"player\"></video>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<audio id=\"player\"></audio>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<!DOCTYPE html>\n<html>\n<head>\n  <title>MY VIDEO</title>\n  <script type=\"text/javascript\" src=\"https://cdn.plyr.io/3.5.6/plyr.js\"></script>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.plyr.io/3.5.6/plyr.css\">\n  <script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelement-and-player.js\"></script>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelementplayer.min.css\">\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"_package.css\">\n  <script type=\"text/javascript\" src=\""
    + container.escapeExpression(((helper = (helper = helpers.playerApi || (depth0 != null ? depth0.playerApi : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"playerApi","hash":{},"data":data}) : helper)))
    + "\"></script>\n</head>\n<body>\n<div id=\"frameContainer\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isVideo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n<script type=\"text/javascript\" src=\"_package.js\"></script>\n</body>\n</html>";
},"useData":true});
templates['outputjs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "provider: \""
    + container.escapeExpression(((helper = (helper = helpers.provider || (depth0 != null ? depth0.provider : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"provider","hash":{},"data":data}) : helper)))
    + "\",";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "type: \""
    + container.escapeExpression(((helper = (helper = helpers.mime || (depth0 != null ? depth0.mime : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mime","hash":{},"data":data}) : helper)))
    + "\",";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "// global variables for scorm and the runtime\nvar _sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?\"API\":\"\",_timeSessionStart=null,_timeout,_now,_unloaded=!1;\n\nfunction resume() {\n  var data = getSuspendData();\n  return (data.length&&data.substr(0,3)===\"lz;\"?LZString.decompressFromUTF16(data.substr(3)):data);\n}\n\nfunction suspend(data) {\n  if (data.length>4090) data = \"lz;\" + LZString.compressToUTF16(data);\n  setSuspendData(data);\n}\n\n// scorm 1.2 / 2004 common runtime / utils\nfunction learnerWillReturn(a){\"API_1484_11\"==_sAPI?a?scormSetValue(\"cmi.exit\",\"suspend\"):scormSetValue(\"cmi.exit\",\"normal\"):\"API\"==_sAPI&&(a?scormSetValue(\"cmi.core.exit\",\"suspend\"):scormSetValue(\"cmi.core.exit\",\"\"))}\nfunction isFirstLaunch(){if(\"API_1484_11\"==_sAPI)var a=scormGetValue(\"cmi.entry\");else if(\"API\"==_sAPI)a=scormGetValue(\"cmi.core.entry\");else return!0;return\"ab-initio\"!=a?!1:!0}\nfunction startSessionTime(){return _timeSessionStart=new Date}\nfunction setSessionTime(a){var b=(new Date).getTime();a=Math.round((b-a)/1E3);a=formatTime(a);\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.session_time\",a):\"API\"==_sAPI&&scormSetValue(\"cmi.core.session_time\",a)}\nfunction getBookmark(){return\"API_1484_11\"==_sAPI?scormGetValue(\"cmi.location\"):\"API\"==_sAPI?scormGetValue(\"cmi.core.lesson_location\"):\"\"}\nfunction setBookmark(a){\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.location\",a+\"\"):\"API\"==_sAPI&&scormSetValue(\"cmi.core.lesson_location\",a+\"\");emitEvent('pageview',a);}\nfunction getSuspendData(){return\"API_1484_11\"==_sAPI||\"API\"==_sAPI?scormGetValue(\"cmi.suspend_data\"):\"\"}\nfunction setSuspendData(a){\"API_1484_11\"!=_sAPI&&\"API\"!=_sAPI||scormSetValue(\"cmi.suspend_data\",a+\"\")}\nfunction setCompletionStatus(a){if(\"API_1484_11\"==_sAPI)scormSetValue(\"cmi.completion_status\",a+\"\");else if(\"API\"==_sAPI&&(\"completed\"==a||\"incomplete\"==a||\"not attempted\"==a)){var b=scormGetValue(\"cmi.core.lesson_status\");\"passed\"==b||\"failed\"==b?\"incomplete\"!=a&&\"not attempted\"!=a||scormSetValue(\"cmi.core.lesson_status\",a+\"\"):scormSetValue(\"cmi.core.lesson_status\",a+\"\")}}\nfunction getCompletionStatus(){if(\"API_1484_11\"==_sAPI)return scormGetValue(\"cmi.completion_status\");if(\"API\"==_sAPI){var a=scormGetValue(\"cmi.core.lesson_status\");return\"passed\"==a||\"failed\"==a?\"completed\":a}return\"not attempted\"}\nfunction setPassFail(a){\"API_1484_11\"==_sAPI?scormSetValue(\"cmi.success_status\",a+\"\"):\"API\"==_sAPI&&scormSetValue(\"cmi.core.lesson_status\",a+\"\")}\nfunction setScore(a){if(\"API_1484_11\"==_sAPI)scormSetValue(\"cmi.score.scaled\",a+\"\");else if(\"API\"==_sAPI){scormSetValue(\"cmi.core.score.min\",\"0\");scormSetValue(\"cmi.core.score.max\",\"100\");var b=100*a;100<b&&(b=100);0>a-0?scormSetValue(\"cmi.core.score.raw\",\"0\"):scormSetValue(\"cmi.core.score.raw\",Math.round(b)+\"\")}}\nfunction scormInitialize(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSInitialize(\"\"):a.Initialize(\"\");return a}\nfunction scormTerminate(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSFinish(\"\"):a.Terminate(\"\");return a}\nfunction scormCommit(){var a=getAPI();if(null==a)return\"false\";a=\"API\"==_sAPI?a.LMSCommit(\"\"):a.Commit(\"\");return a}\nfunction scormGetValue(a){var b=getAPI();if(null==b)return\"\";if(\"API\"==_sAPI)var c=b.LMSGetValue(a),b=b.LMSGetLastError();else c=b.GetValue(a),b=b.GetLastError();return\"0\"!=b?\"\":c}\nfunction scormSetValue(a,b){var c=getAPI();if(null==c)return\"true\";c=\"API\"==_sAPI?c.LMSSetValue(a,b):c.SetValue(a,b);return c}\nfunction formatTime(a){var b=Math.floor(a/3600);a-=3600*b;var c=Math.floor(a/60);a-=60*c;return\"API_1484_11\"==_sAPI?\"PT\"+b+\"H\"+c+\"M\"+a+\"S\":\"API\"==_sAPI?(10>b&&(b=\"0\"+b),10>c&&(c=\"0\"+c),10>a&&(a=\"0\"+a),b+\":\"+c+\":\"+a):\"\"}\nfunction findAPI(a,b){var c=0;try{for(;null==a[b]&&null!=a.parent&&a.parent!=a;){c++;if(7<c)return console.log(\"findAPI gave up\",a,b),alert(\"Error finding API -- too deeply nested.\"),null;a=a.parent}}catch(d){return console.log(\"findAPI forced to stop at domain boundary\",a,b),null}return a[b]}\nfunction getAPI(){if(null!=apiHandle)return apiHandle;var a=findAPI(window,\"API_1484_11\");null==a&&null!=window.opener&&\"undefined\"!=typeof window.opener&&(a=findAPI(window.opener,\"API_1484_11\"));null==a?(a=findAPI(window,\"API\"),null==a&&null!=window.opener&&\"undefined\"!=typeof window.opener&&(a=findAPI(window.opener,\"API\")),null!=a&&(_sAPI=\"API\")):_sAPI=\"API_1484_11\";null==a&&alert(\"Unable to find an API adapter\");return a};\nfunction isJSON(b){try{var a=JSON.parse(b);if(a&&\"object\"===typeof a)return!0}catch(c){}return!1};\nfunction findInJson(obj,prop,value){ for(var i=0,j=obj.length,k;i<j,k=obj[i];i++)if(value===k[prop])return k}\nfunction emitEvent(name,data){var event=new CustomEvent(name,{detail:data});document.body.dispatchEvent(event);}\n\n// create a proxy for sub-runtimes bound to pages\nfunction apiProxy() {\n  this.LMSInitialize = function() { return \"true\"; };\n  this.LMSFinish = function () { return \"true\"; };\n  this.LMSCommit = function (param) { return \"true\"; };\n  this.LMSGetLastError = function () { return 0; };\n  this.LMSGetErrorString = function () { return \"No error\"; };\n  this.LMSGetDiagnostic = function (param) { return param; };\n  this.LMSGetValue = function (param) { switch(param){default: return \"\";}; };\n  this.LMSSetValue = function (param,value) { switch(param){default: return \"true\";}; };\n}\nwindow.ninjaApiProxy = new apiProxy()\n\n// find scorm API; getAPI() also sets _sAPI; apiHandle is the object reference\nvar apiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI()\nscormInitialize()\n\nvar complete = false\n\nfunction doUnload() {\n    if (!_unloaded) {\n        scormCommit()\n        setSessionTime(_timeSessionStart)\n        scormTerminate()\n        _unloaded = true\n    }\n}\nfunction setComplete() {\n  if (!complete) {\n    learnerWillReturn(false)\n    if (\"API_1484_11\"==_sAPI) setPassFail(\"passed\")\n    setCompletionStatus(\"completed\")\n    setScore(100)\n    scormCommit()\n  }\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function domLoader(event) {\n  startSessionTime();\n  setCompletionStatus(\"incomplete\")\n  learnerWillReturn(true)\n  scormCommit()\n  if (\""
    + alias4(((helper = (helper = helpers.playerType || (depth0 != null ? depth0.playerType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playerType","hash":{},"data":data}) : helper)))
    + "\" === 'plyr') {\n    var Player = new Plyr(document.getElementById('player'), {\n      settings: ['quality','speed'],\n      duration: "
    + alias4(((helper = (helper = helpers.ends || (depth0 != null ? depth0.ends : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data}) : helper)))
    + ",\n      youtube: {noCookie: true},\n    })\n    Player.source = {\n      type: 'video',\n      sources: [{\n        src: \""
    + alias4(((helper = (helper = helpers.videoId || (depth0 != null ? depth0.videoId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"videoId","hash":{},"data":data}) : helper)))
    + "\",\n        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.provider : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.provider : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n      }]\n    }\n    Player.on('timeupdate', function(e){\n      if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.completes || (depth0 != null ? depth0.completes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"completes","hash":{},"data":data}) : helper)))
    + ") {\n        setComplete()\n      }\n      if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.ends || (depth0 != null ? depth0.ends : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data}) : helper)))
    + ") {\n        Player.pause()\n      }\n    })\n    Player.on('play', function(e) {\n      if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.ends || (depth0 != null ? depth0.ends : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data}) : helper)))
    + ") {\n        Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n      }\n      if (Player.currentTime < "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + ") {\n        Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n      }\n    })\n    Player.on('loadedmetadata', function(e) {\n      Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n    })\n  } else {\n    var Player = new MediaElementPlayer(document.getElementById('player'), {\n      features: ['playpause','current', 'duration', 'volume', 'progress'],\n      startVolume: 0.5,\n      youtube: {\n        nocookie: true,\n        autoplay: 0,\n        controls: 0,\n        modestbranding: 1\n      },\n      poster: \""
    + ((stack1 = ((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\",\n      showPosterWhenPaused: true,\n      showPosterWhenEnded: true,\n      stretching: 'auto',\n      videoHeight: '100%',\n      videoWidth: '100%',\n      src: \""
    + ((stack1 = ((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\",\n      success: function(me, node) {\n        me.addEventListener('timeupdate', function() {\n          if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.completes || (depth0 != null ? depth0.completes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"completes","hash":{},"data":data}) : helper)))
    + ") {\n            setComplete()\n          }\n          if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.ends || (depth0 != null ? depth0.ends : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data}) : helper)))
    + ") {\n            Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n            Player.pause()\n          }\n        })\n        me.addEventListener('play', function() {\n          if (Player.currentTime >= "
    + alias4(((helper = (helper = helpers.ends || (depth0 != null ? depth0.ends : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ends","hash":{},"data":data}) : helper)))
    + ") {\n            Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n          }\n          if (Player.currentTime < "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + ") {\n            Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n          }\n        })\n        me.addEventListener('loadedmetadata', function() {\n          console.log('loadedmetadata', "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + ", Player)\n          Player.currentTime = "
    + alias4(((helper = (helper = helpers.starts || (depth0 != null ? depth0.starts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"starts","hash":{},"data":data}) : helper)))
    + "\n        })\n      }\n    })\n    Player.setSrc(\""
    + ((stack1 = ((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\")\n    Player.setPoster(\""
    + alias4(((helper = (helper = helpers.poster || (depth0 != null ? depth0.poster : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster","hash":{},"data":data}) : helper)))
    + "\")\n    Player.load()\n  }\n})";
},"useData":true});
templates['scorm12manifest'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<?xml version=\"1.0\" ?>\n<manifest identifier=\"ninja.scormification.document.scorm12.I"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" version=\"1\"\n       xmlns=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2\"\n       xmlns:adlcp=\"http://www.adlnet.org/xsd/adlcp_rootv1p2\"\n       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n       xsi:schemaLocation=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd\n                           http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd\n                           http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd\">\n  <metadata>\n    <schema>ADL SCORM</schema>\n    <schemaversion>1.2</schemaversion>\n  </metadata>\n  <organizations default=\"O"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\">\n      <title>Video2Scorm</title>\n      <item identifier=\"I"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" isvisible=\"true\">\n        <title>Video2Scorm</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier=\"R"
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\n      <file href=\"index.html\" />\n      <file href=\"_package.js\" />\n      <file href=\"_package.css\" />\n    </resource>\n  </resources>\n</manifest>";
},"useData":true});
})();