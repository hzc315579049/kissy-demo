KISSY.add('kissy-demo/header/header',["node"],function(S ,require, exports, module) {
 var $ = require('node').all;
module.exports = {
    init:function(){
        S.log('header init');
        // $('header').html('<div class=\"topBox\"><div class=\"topLogo\"></div><div class=\"loginArea\"></div></div><div class=\"topNav\"></div>');
    }
}
});