KISSY.add(function(S){
	var $ = S.Node.all;

	// BlurText构造器
	// TODO BlurText工厂
	var BlurText = function(){

		// TODO 如何传参?
		if (!(this instanceof BlurText)) {
			throw new Error('please use "new BlurText()"');
		}

		this.init.apply(this,arguments);
	};

	// TODO 抽离切换“机制”和实现的方法
	BlurText.plug = function(fn){
		var self = this;
	};

	// S.Event = S.config('mini') ? S.Node.node : S.Event;

	// 扩充BlurText
	S.augment(BlurText,S.Event.Target,{

		// 构造函数
		init:function(selector,config){
			var self = this;
			if(S.isObject(selector)){
				self.con = selector;
			}else if(/^#/i.test(selector)){
				self.con = S.one(selector);
			}else if(S.one("#"+selector)){
				self.con = S.one("#"+selector);
			}else if(S.all(selector)){
				self.con = S.all(selector);
			}else {
				throw new Error('Slide Container Hooker not found');
			}
			self.buildParams(config);
			console.log(self);
			for(var i = 0;i<self.con.length;i++){
				
				var node = self.con[i];
				self.buildHTML();
				
			}

			

			//接受参数
			return this;

			

		},
		buildParams: function(o){
			var self = this;

			if(o === undefined || o === null){
				o = {};
			}

			function setParam(def, key){
				var v = o[key];
				// null 是占位符
				self[key] = (v === undefined || v === null) ? def : v;
			}

			S.each({
                speed: 100,
                timeout: 0,
                eventype: "hover",
                eventClass: "blurEvent",
                blurClass: "blurBox",
                textClass: "blurText"
			},setParam);
			return self;
		},
		buildHTML:function(node){
		
		}


	});
	return BlurText;
},{
	requires:['node','json','event','anim','ua']
})