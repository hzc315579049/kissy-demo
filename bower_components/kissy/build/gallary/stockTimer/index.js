KISSY.add(function(S){
    //作用－本demo中需要用到的开收盘距离时间计算器
    //输出一个对象，包含time-距离时间、state－开盘或收盘字符串
    var time;
    var state = "未知";
    var date = new Date();
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if(h*3600+m*60+s<9*3600+30*60){
        time = new Date();
        time.setHours(9);
        time.setMinutes(30);
        time.setSeconds(0);
        state = "开盘";

    }
    else if(h*3600+m*60+s<15*3600){
        time = new Date();
        time.setHours(15);
        time.setMinutes(0);
        time.setSeconds(0);
        state = "收盘";
    }
    else if(h*3600+m*60+s<24*3600+1){
        time = new Date();
        time.setDate(d+1);
        time.setHours(9);
        time.setMinutes(30);
        time.setSeconds(0);
        state = "开盘";
    }

    var obj = {
        "time" : time,
        "state" : state,
    }
    return obj;
},{requires: ['base']});