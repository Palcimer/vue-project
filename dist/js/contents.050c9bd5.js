(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["contents"],{"6e77":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.curSkin,{tag:"component",attrs:{item:e.item}})},o=[],c=n("1da1"),a=n("5530"),u=(n("96cf"),n("2f62")),s=(n("d3b7"),n("159b"),n("ddb0"),n("ac1f"),n("5319"),n("bba4")),i=n.n(s),f=n("8103"),d=n.n(f),b=n("c779"),l={};b.keys().forEach((function(e){var t=d()(i()(e.replace(/(\.\/|\.vue)/g,"")));l[t]=function(){return b(e)}})),console.log("module",l);var h=l,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("contents error ")])},v=[],p={name:"ContentsError"},O=p,j=n("2877"),w=Object(j["a"])(O,m,v,!1,null,null,null),C=w.exports,k={components:Object(a["a"])(Object(a["a"])({},h),{},{ContentsError:C}),name:"ContentsRenderer",data:function(){return{}},computed:Object(a["a"])(Object(a["a"])({},Object(u["e"])({item:function(e){return e.board.read}})),{},{curSkin:function(){if(this.item){var e=d()(this.item.wr_2);return"".concat(e,"Contents")}return"ContentsError"}}),serverPrefetch:function(){return this.fetchData()},mounted:function(){this.item||this.fetchData()},methods:Object(a["a"])(Object(a["a"])(Object(a["a"])({},Object(u["d"])("board",["SET_READ"])),Object(u["b"])("board",["getContentsRead"])),{},{fetchData:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("ContentsRenderer=====fetch",e.$route),n={},e.$ssrContext&&(n.token=e.$ssrContext.token),t.next=5,e.getContentsRead({wr_1:e.$route.params.wr_1,headers:n});case 5:case"end":return t.stop()}}),t)})))()}})},_=k,E=Object(j["a"])(_,r,o,!1,null,null,null);t["default"]=E.exports},c779:function(e,t,n){var r={"./basic/Contents.vue":["26e1","chunk-484ca836"],"./company/Contents.vue":["e84d","chunk-2d226359"]};function o(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],o=t[0];return n.e(t[1]).then((function(){return n(o)}))}o.keys=function(){return Object.keys(r)},o.id="c779",e.exports=o}}]);
//# sourceMappingURL=contents.050c9bd5.js.map