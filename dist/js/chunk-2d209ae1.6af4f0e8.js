(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d209ae1"],{a9a4:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.item?r("v-card",{attrs:{flat:""}},[r("v-card-title",[r("v-toolbar",{attrs:{flat:""}},[r("v-toolbar-title",[t._v(t._s(t.item.wr_title))]),r("v-spacer"),r("v-btn",{attrs:{to:"/board/"+t.table}},[t._v("목록")])],1)],1),r("v-card-text",[r("ez-tiptap",{attrs:{editable:!1},model:{value:t.item.wr_content,callback:function(e){t.$set(t.item,"wr_content",e)},expression:"item.wr_content"}})],1),r("v-card-actions",["MODIFY"==t.isModifiable?r("v-btn",{attrs:{color:"info",to:"/board/"+t.table+"/"+t.item.wr_id+"?act=write"}},[r("v-icon",[t._v("mdi-pencil")])],1):t._e(),t.access.reply?r("v-btn",{attrs:{color:"secondary",to:"/board/"+t.table+"/"+t.item.wr_id+"?act=reply"}},[r("v-icon",[t._v("mdi-subdirectory-arrow-right")]),t._v(" 답글쓰기 ")],1):t._e()],1)],1):t._e()},i=[],n=r("1da1"),c=r("5530"),o=(r("96cf"),r("a9e3"),r("99af"),r("bb5e")),s=r("2f62"),b={name:"BasicView",props:{config:Object,access:Object,id:[String,Number]},data:function(){return{item:null}},computed:Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(s["e"])({member:function(t){return t.user.member}})),Object(s["c"])("user",["GRANT"])),{},{table:function(){return this.config.bo_table},isModifiable:function(){if(this.member){if(this.member.mb_id==this.item.mb_id||this.GRANT>=o["LV"].SUPER)return"MODIFY"}else if(0==this.item.mb_id)return"NO_MEMBER";return""}}),mounted:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t.id),e.next=3,t.$axios.get("/api/board/read/".concat(t.table,"/").concat(t.id));case 3:r=e.sent,t.setData(r);case 5:case"end":return e.stop()}}),e)})))()},setData:function(t){this.item=t}}},l=b,u=r("2877"),d=Object(u["a"])(l,a,i,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d209ae1.6af4f0e8.js.map