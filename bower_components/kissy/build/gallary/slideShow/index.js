KISSY.add(function(S){
	var $ = S.Node.all;	
	var children = S.DOM.children;

	var slideShow = function(){

		// TODO 如何传参?
		if (!(this instanceof slideShow)) {
			throw new Error('please use "new slideShow()"');
		}

		this.init.apply(this,arguments);
	};
	// 扩充slideShow
	S.augment(slideShow,S.Event.Target,{

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
			self.buildHTML();

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
                slideClass: "slideNews",
                autoPlay: false
			},setParam);
			console.log(self.speed)
			return self;
		},
		buildHTML:function(){
			var self = this;
			var _slide = $("."+self.slideClass);
			var _box = children(_slide,".box");
			var _item = children(_slide,".item");
			_item.
		},
		buildEvent:function(){
			var self = this;
		}


	});
	return slideShow;
},{
	requires:['node','dom','json','event','anim','ua']
})