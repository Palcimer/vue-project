(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["board"],{"4a09":function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.curSkin,{tag:"component",attrs:{config:t.config,access:t.access,id:t.wr_id}})},r=[],i=n("5530"),o=(n("ac1f"),n("1276"),n("8103")),a=n.n(o),s=n("2f62"),u=(n("d3b7"),n("159b"),n("ddb0"),n("5319"),n("bba4")),h=n.n(u),l=n("e0b4"),d={};l.keys().forEach((function(t){var e=a()(h()(t.replace(/(\.\/|\.vue)/g,"")));d[e]=function(){return l(t)}})),console.log("module",d);var f=d,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("Board Error")])},v=[],_={name:"BoardError"},g=_,p=n("2877"),m=Object(p["a"])(g,b,v,!1,null,null,null),w=m.exports,k={components:Object(i["a"])(Object(i["a"])({},f),{},{BoardError:w}),name:"Board",data:function(){return{}},computed:Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(s["e"])({config:function(t){return t.board.config}})),Object(s["c"])({GRANT:"user/GRANT"})),{},{pathMatch:function(){return this.$route.params.pathMatch.split("/")},table:function(){return this.pathMatch[0]},wr_id:function(){return this.pathMatch[1]},action:function(){return this.wr_id?this.$route.query.act||"read":this.$route.query.act||"list"},access:function(){return this.config?{list:this.GRANT>=this.config.bo_list_level,read:this.GRANT>=this.config.bo_read_level,write:this.GRANT>=this.config.bo_write_level,reply:this.GRANT>=this.config.bo_reply_level,comment:this.GRANT>=this.config.bo_comment_level,download:this.GRANT>=this.config.bo_download_level}:null},curSkin:function(){if(this.config){var t=a()(this.config.bo_skin);return this.access.list&&"list"==this.action?"".concat(t,"List"):this.access.write&&"write"==this.action||this.access.reply&&"reply"==this.action?"".concat(t,"Form"):this.wr_id&&this.access.read&&"read"==this.action?"".concat(t,"Read"):"BoardError"}return"BoardError"}}),watch:{table:function(){}},serverPrefetch:function(){return this.getBoardConfig(this.table)},mounted:function(){this.config||this.getBoardConfig(this.table)},methods:Object(i["a"])({},Object(s["b"])("board",["getBoardConfig"]))},y=k,O=Object(p["a"])(y,c,r,!1,null,null,null);e["default"]=O.exports},e0b4:function(t,e,n){var c={"./basic/Form.vue":["37fd","vendor","chunk-2d0bab18"],"./basic/List.vue":["0f91","vendor","chunk-67a29d69"],"./basic/Read.vue":["a9a4","chunk-48621071"],"./basic_copy/Form.vue":["db89","vendor","chunk-2d228cf5"],"./basic_copy/List.vue":["5502","chunk-2d0c8598"],"./basic_copy/Read.vue":["5d98","chunk-484eacb4"],"./gallery/Form.vue":["b3c2","chunk-2d20f8f6"],"./gallery/List.vue":["ca4c","chunk-2d221483"],"./gallery/Read.vue":["4bb4","chunk-2d0cc036"]};function r(t){if(!n.o(c,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=c[t],r=e[0];return Promise.all(e.slice(1).map(n.e)).then((function(){return n(r)}))}r.keys=function(){return Object.keys(c)},r.id="e0b4",t.exports=r}}]);
//# sourceMappingURL=board.bb6d358c.js.map