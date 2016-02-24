KISSY.add("kissy-demo/index.js", ["kissy-demo/header/header"], function(S ,require, exports, module) {
var beeDemoHeaderHeader = require("kissy-demo/header/header");
	
var beeDemoIndex;
beeDemoIndex = function (exports) {
  //初始化header模块
  var header = beeDemoHeaderHeader;
  header.init();
  //初始化article模块
  return exports;W
}();
});