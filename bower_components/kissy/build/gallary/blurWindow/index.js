KISSY.add(function(S){
	var $ = S.Node.all;
	var DOM = S.DOM;
	var children = DOM.children;
	var css = DOM.css;
	var addClass = DOM.addClass;
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
			self.bBox = "."+self.blurClass;
			self.bText = "."+self.textClass;
			for(var i = 0;i<self.con.length;i++){
				var node = self.con[i];
				self.buildHTML(node);
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
                speed: 500,
                timeout: 0,
                eventype: "hover",
                blurClass: "blurBox",
                textClass: "blurText",
                dirc: "top",
                blurDepth: 10,

			},setParam);
			console.log(self.speed)
			return self;
		},
		buildHTML:function(node){
			var self = this;
			var h = DOM.height;
			var w = DOM.width;
			var dirc = "top";
			var bNode = children(node,self.bBox);
			var tNode = children(node,self.bText);
			addClass(bNode,"blur");
			css(node,{"overflow": "hidden"});
			css(tNode,dirc,-h(node));
			css(tNode,{position: 'absolute',display: 'block',height: h(node),width: w(node)});
			css(node,{position: 'relative'})

			self.buildEvent(node,h(node));

		},
		buildEvent:function(node,l){
			var self = this;
			var dirc = "top"
			var speed = self.speed/100;
			console.log(speed)
			var blurDepth = self.blurDepth;
			var tNode = children(node,self.bText);
			var bNode =  children(node,self.bBox);
			S.Event.on(node,"mouseenter",function(){
				window.clearInterval();
				css(bNode,{"-webkit-Filter":"blur("+blurDepth+"px)","filter":"blur("+blurDepth+"px)","-o-Filter":"blur("+blurDepth+"px)","-moz-Filter":"blur("+blurDepth+"px)"})
				var val = l;
				setInterval(function(){
					if(val>0||val==0){
						css(tNode,dirc,-val+"px");
							val=val-0.02*l;
						}

					else{
						window.clearInterval();
					}
				},speed)

				
			})
			S.Event.on(node,"mouseleave",function(){
				window.clearInterval();
				css(bNode,"-webkit-Filter","blur(0px)")
				var val = 0;
				setInterval(function(){
					if(val<l||val==l){
						css(tNode,dirc,-val+"px");
							val=val+0.02*l;
						}
					else{
						window.clearInterval();
					}
				},speed)
				
			})
		}


	});
	return BlurText;
},{
	requires:['node','dom','json','event','anim','ua']
})