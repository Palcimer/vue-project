(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d190688"],{"063f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("span",t._g(t._b({},"span",n,!1),a),[t._v(" "+t._s(t.display)+" ")])]}}])},[t._v(" "+t._s(t.formatTime)+" ")])},n=[],o={name:"DisplayTime",props:{time:{type:String,required:!0}},computed:{formatTime:function(){return this.$moment(this.time).format("LLL")},display:function(){var t=this.$moment(this.time),e=this.$moment(),i=e.diff(t,"days");return i>0?t.format("LL"):t.fromNow()}}},s=o,r=i("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=c.exports},"4926c":function(t,e,i){"use strict";i("edc2")},7376:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("tooltip-btn",{attrs:{label:t.searchLabel,icon:"",small:""},on:{click:t.open}},[i("v-icon",[t._v("mdi-magnify")])],1),t.options.stf[0]?i("tooltip-btn",{attrs:{type:"button",label:"검색 초기화",icon:"",small:"",color:"error"},on:{click:t.reset}},[i("v-icon",[t._v("mdi-magnify-close")])],1):t._e(),i("ez-dialog",{ref:"dialog",attrs:{label:t.label,width:"300"}},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.searchGo.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-select",{attrs:{label:"검색 필드",items:t.items,rules:[t.rules.require({label:"검색 필드"})]},model:{value:t.form.stf,callback:function(e){t.$set(t.form,"stf",e)},expression:"form.stf"}}),i("v-select",{attrs:{label:"비교방식",items:t.compItems},model:{value:t.form.stc,callback:function(e){t.$set(t.form,"stc",e)},expression:"form.stc"}}),i("v-text-field",{attrs:{label:"검색어",rules:[t.rules.require({label:"검색어"})],disabled:t.isNullComp},model:{value:t.form.stx,callback:function(e){t.$set(t.form,"stx",e)},expression:"form.stx"}}),i("div",{staticClass:"d-flex"},[i("tooltip-btn",{attrs:{type:"button",label:"검색 초기화",icon:"",color:"error"},on:{click:t.reset}},[i("v-icon",[t._v("mdi-magnify-close")])],1),i("v-spacer"),i("tooltip-btn",{attrs:{type:"submit",label:"검색",icon:"",color:"primary"}},[i("v-icon",[t._v("mdi-magnify")])],1)],1)],1)],1)],1)},n=[],o=i("5530"),s=i("1da1"),r=(i("96cf"),i("7db0"),i("d3b7"),i("99af"),i("a434"),i("a2e4")),c=i("414b"),l=i("248f"),u=i.n(l),p={components:{TooltipBtn:c["a"],EzDialog:r["a"]},name:"SearchField",props:{label:{type:String,default:"검색"},items:{type:Array,required:!0},options:{type:Object,required:!0}},data:function(){return{valid:!0,form:{stf:"",stx:"",stc:""},compItems:[{text:"포함",value:"like"},{text:"작은",value:"lt"},{text:"작거나 같은",value:"lte"},{text:"같은",value:"eq"},{text:"크거나 같은",value:"gte"},{text:"큰",value:"gt"},{text:"같지 않은",value:"ne"},{text:"NULL",value:"null"},{text:"NOT NULL",value:"not"}],tempText:""}},computed:{rules:function(){return u.a},isNullComp:function(){return"null"==this.form.stc||"not"==this.form.stc?(this.tempText||(this.tempText=this.form.stx,this.form.stx="Null"),!0):(this.tempText&&(this.form.stx=this.tempText,this.tempText=""),!1)},searchLabel:function(){var t=this,e=this.items.find((function(e){return e.value==t.options.stf[0]}));return e?"".concat(e.text," : ").concat(this.options.stx[0]):this.label}},methods:{open:function(){this.form.stf=this.options.stf[0]||this.items[0].value,this.form.stx=this.options.stx[0],this.form.stc=this.options.stc[0]||"like",this.$refs.form&&this.$refs.form.resetValidation(),this.$refs.dialog.open()},searchGo:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$refs.form.validate(),e.next=3,t.$nextTick();case 3:if(t.valid){e.next=5;break}return e.abrupt("return");case 5:i=Object(o["a"])(Object(o["a"])({},t.options),{},{page:1}),i.stf.splice(0,1,t.form.srf),i.stc.splice(0,1,t.form.stc),i.stx.splice(0,1,t.form.stx),t.$emit("update:options",i),t.$refs.dialog.close();case 11:case"end":return e.stop()}}),e)})))()},reset:function(){var t=Object(o["a"])(Object(o["a"])({},this.options),{},{page:1});t.stf.splice(0,1,""),t.stc.splice(0,1,""),t.stx.splice(0,1,""),this.$emit("update:options",t),this.$refs.dialog.close()}}},f=p,d=i("2877"),m=Object(d["a"])(f,a,n,!1,null,null,null);e["a"]=m.exports},a2e4:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[i("v-card",[i("v-toolbar",t._b({},"v-toolbar",t.$attrs,!1),[i("v-toolbar-title",[t._v(t._s(t.label))]),i("v-spacer"),i("v-btn",{attrs:{icon:""},on:{click:t.close}},[i("v-icon",[t._v("mdi-close")])],1)],1),i("v-card-text",[t._t("default")],2)],1)],1)},n=[],o={name:"ezDialog",props:{label:{type:String,required:!0}},data:function(){return{dialog:!1}},methods:{open:function(){this.$emit("onOpen"),this.dialog=!0},close:function(){this.dialog=!1,this.$emit("onClose")}}},s=o,r=i("2877"),c=Object(r["a"])(s,a,n,!1,null,null,null);e["a"]=c.exports},ecd2:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{fluid:""}},[i("v-toolbar",[i("v-toolbar-title",[t._v(t._s(t.pageTitle))]),1==t.config.bo_use_category?i("v-sheet",{staticClass:"ml-4",attrs:{width:"150"}},[i("cate-select",{attrs:{options:t.options},on:{"update:options":function(e){t.options=e}}})],1):t._e(),i("search-field",{attrs:{items:t.searchItems,options:t.options},on:{"update:options":function(e){t.options=e}}}),i("v-spacer"),i("v-btn",{attrs:{to:"/board/"+t.table+"?act=write",color:"primary"}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v(" 새 글 작성 ")],1)],1),i("v-data-table",{staticClass:"fixedTable",attrs:{headers:t.headers,items:t.items,options:t.options,"server-items-length":t.totalItems,loading:t.loading},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.no",fn:function(e){e.item;var i=e.index;return[t._v(" "+t._s(t.getNo(i))+" ")]}},{key:"item.wr_title",fn:function(e){var a=e.item;return[i("v-btn",{staticClass:"text-none px-0 justify-start basic-title",attrs:{to:"/contents/"+a.wr_1,block:"",plain:""}},[i("div",{staticClass:"d-flex justify-start align-center"},[a.wr_dep>0?i("v-icon",{style:{"padding-left":16*(a.wr_dep-1)+"px"}},[t._v("mdi-subdirectory-arrow-right")]):t._e(),i("div",{staticClass:"text-truncate",style:{"max-width":"calc(100% - 20px - "+(a.wr_dep>0?16*(a.wr_dep-1)+24:0)+"px)"}},[t._v(" "+t._s(a.wr_title)+" ")]),i("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[i("v-chip",t._g(t._b({staticClass:"px-1 ml-1",attrs:{"x-small":"",label:"",color:"green"}},"v-chip",o,!1),n),[t._v(" "+t._s(a.replies)+" ")])]}}],null,!0)},[i("span",[t._v("댓글: "+t._s(a.replies)+"개")])])],1)])]}},{key:"item.cmd",fn:function(e){var a=e.item;return[i("tooltip-btn",{attrs:{label:"수정",icon:"",color:"primary",to:"/board/"+t.table+"/"+a.wr_id+"?act=write"}},[i("v-icon",[t._v("mdi-pencil")])],1),t.isSuper?i("tooltip-btn",{attrs:{label:"삭제",icon:"",color:"error",loading:t.deleteLoading},on:{click:function(e){return t.deleteItem(a)}}},[i("v-icon",[t._v("mdi-delete")])],1):t._e()]}}])})],1)},n=[],o=i("1da1"),s=i("5530"),r=(i("96cf"),i("a9e3"),i("a434"),i("4de4"),i("d3b7"),i("99af"),i("4328")),c=i.n(r),l=i("64f2"),u=i("2f62"),p=i("7376"),f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return 1==t.config.bo_use_category?i("v-select",{attrs:{label:"카테고리",items:t.items,"hide-details":"",dense:""},on:{change:t.cateChange},model:{value:t.cateItem,callback:function(e){t.cateItem=e},expression:"cateItem"}}):t._e()},d=[],m=i("2909"),h={name:"CateSelect",props:{options:{type:Object,required:!0}},data:function(){return{cateItem:"전체"}},computed:Object(s["a"])(Object(s["a"])({},Object(u["e"])({config:function(t){return t.board.config}})),{},{items:function(){return this.config.bo_use_category?["전체"].concat(Object(m["a"])(this.config.bo_category)):[]}}),methods:{cateChange:function(){var t="전체"==this.cateItem?"":this.cateItem,e=Object(s["a"])(Object(s["a"])({},this.options),{},{page:1});e.stx.splice(1,1,t),this.$emit("update:options",e)}}},v=h,b=i("2877"),g=Object(b["a"])(v,f,d,!1,null,null,null),x=g.exports,_=i("063f"),y=i("414b"),w={components:{SearchField:p["a"],CateSelect:x,DisplayTime:_["a"],TooltipBtn:y["a"]},name:"BasicList",props:{config:Object,access:Object,id:[String,Number]},title:function(){return"ezCode "+this.pageTitle},data:function(){return{loading:!1,options:{},pageRouting:!1,pageReady:!1,deleteLoading:!1}},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(u["c"])("user",["isSuper"])),Object(u["e"])({items:function(t){return t.board.list},totalItems:function(t){return t.board.totalItems}})),{},{table:function(){return this.config.bo_table},pageTitle:function(){return this.config.bo_subject+" 게시판"},headers:function(){var t=[{text:"No",value:"no",align:"center",sortable:!1,searchable:!1,width:"20"},{text:"ID",value:"wr_1",align:"start",sortable:!0,searchable:!0,width:"160"},{text:"제목",value:"wr_title",align:"start",sortable:!1,searchable:!0,cellClass:"text-truncate"},{text:"스킨",value:"wr_2",align:"center",sortable:!0,searchable:!0,cellClass:"text-truncate"},{text:"CMD",value:"cmd",align:"center",sortable:!1,searchable:!1,cellClass:"text-truncate"}];return this.config.bo_use_category&&t.splice(1,0,{text:"카테고리",value:"wr_category",align:"center",sortable:!1,searchable:!1,width:"100"}),t},searchItems:function(){var t=this.headers.filter((function(t){return t.searchable}));return t.push({text:"내용",value:"wr_content"}),t}}),watch:{options:{handler:function(){this.fetchData()},deep:!0},table:function(){this.fetchData()}},serverPrefetch:function(){return this.fetchData()},created:function(){this.options=this.initOptions()},mounted:function(){window.addEventListener("popstate",this.routeChange)},destroyed:function(){window.removeEventListener("popstate",this.routeChange)},methods:Object(s["a"])(Object(s["a"])({},Object(u["b"])("board",["getBoardList"])),{},{initOptions:function(){var t=this.$route.query,e={page:Number(t.page)||1,itemsPerPage:Number(t.itemsPerPage)||10,stf:[t.stf||"","wr_category"],stx:[t.stx||"",""],stc:[t.stc||"","eq"]};return e},pushState:function(){if(console.log("pageRouting",this.pageRouting),!this.pageRouting){var t={page:this.options.page,itemsPerPage:this.options.itemsPerPage,stf:this.options.stf[0]||void 0,stc:this.options.stc[0]||void 0,stx:this.options.stx[0]||void 0,ca:this.options.stx[1]||void 0},e=c.a.stringify(t);this.pageReady?history.pushState(null,null,"".concat(this.$route.path,"?").concat(e)):history.replaceState(null,null,"".concat(this.$route.path,"?").concat(e))}},routeChange:function(){this.pageRouting=!0,this.options=this.initOptions()},getNo:function(t){var e=this.options,i=e.page,a=e.itemsPerPage,n=this.totalItems;return n-(i-1)*a-t},getPayload:function(){var t=Object(l["deepCopy"])(this.options);return console.log("payload====",t),t.stf.push("wr_reply"),t.stc.push("eq"),t.stx.push("0"),t},fetchData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var i,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("List.vue fetchData======="),i=t.getPayload(),a=c.a.stringify(i),n={},t.$ssrContext&&(n.token=t.$ssrContext.token),e.next=7,t.getBoardList({vm:t,query:a,headers:n});case 7:case"end":return e.stop()}}),e)})))()},deleteItem:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var a,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e.deleteLoading=!0,i.next=3,e.$ezNotify.confirm("컨텐츠 [".concat(t.wr_title,"]을 삭제하시겠습니까?"),"컨텐츠 삭제",{icon:" mdi-alert"});case 3:if(a=i.sent,!a){i.next=9;break}return i.next=7,e.$axios.delete("/api/board/".concat(e.table,"/").concat(t.wr_id));case 7:n=i.sent,n&&(e.$toast.info("[".concat(t.wr_title,"]  삭제하였습니다.")),e.fetchData());case 9:e.deleteLoading=!1;case 10:case"end":return i.stop()}}),i)})))()}})},O=w,j=(i("4926c"),Object(b["a"])(O,a,n,!1,null,null,null));e["default"]=j.exports},edc2:function(t,e,i){}}]);
//# sourceMappingURL=chunk-7d190688.83b84f00.js.map