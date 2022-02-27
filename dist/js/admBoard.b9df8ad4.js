(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admBoard","error"],{"385a":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return"list"==e.action?a("board-list"):"form"==e.action?a("board-form",{attrs:{table:e.table}}):a("error")},o=[],l=(a("ac1f"),a("1276"),a("466d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-toolbar",[a("v-toolbar-title",[e._v("게시판 관리")]),a("v-spacer"),a("tooltip-btn",{attrs:{label:"게시판 추가",icon:"",to:"/adm/board/form"}},[a("v-icon",[e._v("mdi-plus")])],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,options:e.options,"server-items-length":e.totalItems,loading:e.loading},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"item.cmd",fn:function(t){var r=t.item;return[a("v-btn",{attrs:{icon:"",to:"/adm/board/form/"+r.bo_table}},[a("v-icon",[e._v("mdi-pencil")])],1)]}}])})],1)}),n=[],s=a("1da1"),i=(a("96cf"),a("64f2")),c=a("414b"),u=a("4328"),d=a.n(u),b={components:{TooltipBtn:c["a"]},name:"AdmBoardList",data:function(){return{headers:[{text:"테이블명",value:"bo_table",sortable:!0},{text:"이름",value:"bo_subject",sortable:!0},{text:"스킨",value:"bo_skin",sortable:!0},{text:"목록",value:"bo_list_level",sortable:!1},{text:"읽기",value:"bo_read_level",sortable:!1},{text:"쓰기",value:"bo_write_level",sortable:!1},{text:"댓글",value:"bo_comment_level",sortable:!1},{text:"CMD",value:"cmd",sortable:!1}],items:[],options:{},totalItems:0,loading:!1}},watch:{options:{handler:function(){this.getDataFromApi()},deep:!0}},methods:{getDataFromApi:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,a=Object(i["deepCopy"])(e.options),r=d.a.stringify(a),t.next=5,e.$axios.get("/api/adm/board?".concat(r));case 5:o=t.sent,o&&(e.items=o.items,e.totalItems=o.totalItems),e.loading=!1;case 8:case"end":return t.stop()}}),t)})))()}}},m=b,f=a("2877"),v=Object(f["a"])(m,l,n,!1,null,null,null),_=v.exports,p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-toolbar",[a("v-toolbar-title",[e._v(e._s(e.pageTitle))]),a("v-spacer"),a("v-btn",{attrs:{to:"/adm/board/list",color:"accent"}},[e._v("목록")]),a("v-btn",{staticClass:"ml-2",attrs:{color:"primary"},on:{click:e.save}},[e._v(e._s(e.btnLabel))])],1),e.form?a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{label:"게시판 ID",counter:"30",readonly:!!e.table,rules:[e.rules.alphaNum(),e.rules.require({label:"게시판 ID"})]},model:{value:e.form.bo_table,callback:function(t){e.$set(e.form,"bo_table",t)},expression:"form.bo_table"}}),a("v-text-field",{attrs:{label:"게시판 제목",counter:"100",rules:[e.rules.require({label:"게시판 제목"})]},model:{value:e.form.bo_subject,callback:function(t){e.$set(e.form,"bo_subject",t)},expression:"form.bo_subject"}}),a("v-select",{attrs:{label:"게시판 스킨",items:e.skins},model:{value:e.form.bo_skin,callback:function(t){e.$set(e.form,"bo_skin",t)},expression:"form.bo_skin"}}),a("board-sort",{attrs:{items:e.form.bo_sort}}),a("div",{staticClass:"d-flex"},[a("v-switch",{attrs:{label:"카테고리 사용",inset:""},model:{value:e.form.bo_use_category,callback:function(t){e.$set(e.form,"bo_use_category",t)},expression:"form.bo_use_category"}}),a("div",{staticClass:"ml-3",staticStyle:{flex:"1"}},[a("v-combobox",{attrs:{label:"카테고리",multiple:"",chips:"",disabled:!e.form.bo_use_category,dense:"","deletable-chips":"",clearable:"","append-icon":"",hint:"카테고리 입력 후 Enter로 구분 등록하세요."},scopedSlots:e._u([{key:"selection",fn:function(t){var r=t.attrs,o=t.item,l=t.parent,n=t.selected;return[a("v-chip",e._b({attrs:{"input-value":n,label:"",small:""}},"v-chip",r,!1),[a("span",[e._v(e._s(o))]),a("v-icon",{attrs:{small:"",right:""},on:{click:function(e){return l.selectItem(o)}}},[e._v("mdi-close")])],1)]}}],null,!1,1391295223),model:{value:e.form.bo_category,callback:function(t){e.$set(e.form,"bo_category",t)},expression:"form.bo_category"}})],1)],1),a("board-slider",{attrs:{label:"목록 읽기 레벨"},model:{value:e.form.bo_list_level,callback:function(t){e.$set(e.form,"bo_list_level",t)},expression:"form.bo_list_level"}}),a("board-slider",{attrs:{label:"게시물 읽기 레벨"},model:{value:e.form.bo_read_level,callback:function(t){e.$set(e.form,"bo_read_level",t)},expression:"form.bo_read_level"}}),a("board-slider",{attrs:{label:"게시물 쓰기 레벨"},model:{value:e.form.bo_write_level,callback:function(t){e.$set(e.form,"bo_write_level",t)},expression:"form.bo_write_level"}}),a("board-slider",{attrs:{label:"답변글 쓰기 레벨"},model:{value:e.form.bo_reply_level,callback:function(t){e.$set(e.form,"bo_reply_level",t)},expression:"form.bo_reply_level"}}),a("board-slider",{attrs:{label:"덧글 쓰기 레벨"},model:{value:e.form.bo_comment_level,callback:function(t){e.$set(e.form,"bo_comment_level",t)},expression:"form.bo_comment_level"}}),a("board-slider",{attrs:{label:"파일다운로드 레벨"},model:{value:e.form.bo_download_level,callback:function(t){e.$set(e.form,"bo_download_level",t)},expression:"form.bo_download_level"}}),a("div",{staticClass:"d-flex"},[a("v-slider",{attrs:{label:"파일 업로드 개수 : "+e.form.bo_upload_cnt,min:"0",max:"10","thumb-label":"",ticks:""},model:{value:e.form.bo_upload_cnt,callback:function(t){e.$set(e.form,"bo_upload_cnt",t)},expression:"form.bo_upload_cnt"}}),a("v-sheet",{staticClass:"ml-2",staticStyle:{background:"transparent"},attrs:{width:"200"}},[a("v-text-field",{attrs:{type:"number",label:"파일 업로드 용량",dense:"","hide-details":"",min:"1",max:"500",suffix:"Mb"},model:{value:e.form.bo_upload_size,callback:function(t){e.$set(e.form,"bo_upload_size",t)},expression:"form.bo_upload_size"}})],1)],1),a("v-expansion-panels",{attrs:{focusable:""}},[a("v-expansion-panel",[a("v-expansion-panel-header",[e._v(" 게시물 추가 필드 설정 ")]),a("v-expansion-panel-content",e._l(e.form.wr_fields,(function(t,r){return a("div",{key:r,staticClass:"d-flex"},[a("v-tooltip",{attrs:{top:"",color:"primary"},scopedSlots:e._u([{key:"activator",fn:function(r){var o=r.on,l=r.attrs;return[a("div",e._g(e._b({staticClass:"mt-2 mr-2"},"div",l,!1),o),[a("v-switch",{attrs:{dense:"",inset:""},model:{value:t.required,callback:function(a){e.$set(t,"required",a)},expression:"item.required"}})],1)]}}],null,!0)},[a("span",[e._v("필수 입력")])]),a("v-text-field",{attrs:{label:"추가 필드 제목 "+(r+1)},model:{value:t.title,callback:function(a){e.$set(t,"title",a)},expression:"item.title"}})],1)})),0)],1),a("v-expansion-panel",[a("v-expansion-panel-header",[e._v("게시판 여분 필드")]),a("v-expansion-panel-content",e._l(10,(function(t){return a("v-text-field",{key:t,attrs:{label:"여분 필드 "+t},model:{value:e.form["bo_"+t],callback:function(a){e.$set(e.form,"bo_"+t,a)},expression:"form[`bo_${i}`]"}})})),1)],1)],1)],1):e._e(),a("v-toolbar",{staticClass:"mt-4"},[a("v-btn",{attrs:{to:"/adm/board/list",color:"accent"}},[e._v("목록")]),a("v-spacer"),a("v-btn",{staticClass:"ml-2",attrs:{color:"primary"},on:{click:e.save}},[e._v(e._s(e.btnLabel))])],1)],1)},x=[],h=(a("99af"),a("bb5e")),w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pt-4 mt-4 mb_n4",staticStyle:{position:"relative"}},[a("div",{staticClass:"text-subtitle1",staticStyle:{position:"absolute",left:"0",top:"-8px"}},[a("span",{staticClass:"grey--text"},[e._v(e._s(e.label))]),a("span",{staticClass:"text-body-2 ml-2"},[e._v(e._s(e.LV_LABEL(e.value))+" ("+e._s(e.value)+")")])]),a("v-slider",{attrs:{value:e.value,min:e.LV.BLOCK,max:e.LV.SUPER,ticks:"always","tick-size":"1","thumb-label":""},on:{input:function(t){return e.$emit("input",t)}}})],1)},k=[],g=(a("a9e3"),{name:"BoardSlider",model:{prop:"value",event:"input"},props:{value:Number,label:String},computed:{LV:function(){return h["LV"]},LV_LABEL:function(){return h["LV_LABEL"]}}}),y=g,$=Object(f["a"])(y,w,k,!1,null,null,null),C=$.exports,L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-subheader",[e._v("정렬 규칙 설정")]),a("draggable",e._b({staticClass:"menu-drag-container",attrs:{tag:"div",list:e.items,handle:".handle"}},"draggable",e.dragOptions,!1),[a("transition-group",{attrs:{type:"transition",name:"flip-list"}},e._l(e.items,(function(t,r){return a("div",{key:t.by,staticClass:"item-group"},[a("div",[a("v-sheet",{staticClass:"item d-flex pa-4 pt-6",attrs:{outlined:"",rounded:"",elevation:"2"}},[a("div",{staticClass:"handle"},[a("v-icon",[e._v("mdi-drag")])],1),a("v-text-field",{staticClass:"ml-4",attrs:{label:"정렬규칙 "+(r+1),readonly:"",dense:"","hide-details":""},model:{value:t.by,callback:function(a){e.$set(t,"by",a)},expression:"item.by"}}),a("v-select",{staticClass:"ml-2",attrs:{label:"sort",items:e.descItems,dense:"","hide-details":""},model:{value:t.desc,callback:function(a){e.$set(t,"desc",a)},expression:"item.desc"}}),a("tooltip-btn",{attrs:{label:"규칙 제거",icon:""},on:{click:function(t){return e.removeItem(r)}}},[a("v-icon",[e._v("mdi-close")])],1)],1)],1)])})),0)],1),a("v-form",{ref:"form",staticClass:"d-flex mt-4 px-2",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.addItem.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-autocomplete",{attrs:{label:"정렬 규칙",items:e.wrItems,dense:"","prepend-icon":"mdi-sort",rules:[e.rules.require({label:"정렬 규칙"})]},model:{value:e.form.by,callback:function(t){e.$set(e.form,"by",t)},expression:"form.by"}}),a("v-select",{staticClass:"ml-2",attrs:{label:"sort",items:e.descItems,dense:""},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}}),a("tooltip-btn",{attrs:{label:"정렬규칙 추가",icon:"",type:"submit"}},[a("v-icon",[e._v("mdi-plus")])],1)],1),a("v-divider",{staticClass:"mt-4"})],1)},O=[],B=a("b85c"),S=(a("4de4"),a("d3b7"),a("a434"),a("b76a")),j=a.n(S),I=a("248f"),V=a.n(I),E={components:{draggable:j.a,TooltipBtn:c["a"]},name:"BoardSort",props:{items:{type:Array,required:!0}},data:function(){return{valid:!0,form:{by:"",desc:0},descItems:[{text:"내림차순(DESC)",value:0},{text:"오름차순(ASC)",value:1}]}},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},wrItems:function(){var e,t=["wr_id","wr_reply","wr_grp","wr_order","wr_dep","wr_parent","mb_id","wr_email","wr_name","wr_password","wr_category","wr_title","wr_content","wr_view","wr_ip","wr_create_at","wr_update_at","wr_1","wr_2","wr_3","wr_4","wr_5","wr_6","wr_7","wr_8","wr_9","wr_10"],a=[],r=Object(B["a"])(this.items);try{for(r.s();!(e=r.n()).done;){var o=e.value;a.push(o.by)}}catch(l){r.e(l)}finally{r.f()}return t.filter((function(e){return a.indexOf(e)<0}))},rules:function(){return V.a}},methods:{initForm:function(){this.form={by:"",desc:0}},addItem:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:e.items.push(e.form),e.initForm(),e.$refs.form.resetValidation();case 8:case"end":return t.stop()}}),t)})))()},removeItem:function(e){this.items.splice(e,1)}}},R=E,A=Object(f["a"])(R,L,O,!1,null,null,null),q=A.exports,T={components:{TooltipBtn:c["a"],BoardSlider:C,BoardSort:q},name:"AdmBoardForm",props:{table:String},title:function(){return this.pageTitle},data:function(){return{valid:!0,form:null,skins:[]}},computed:{pageTitle:function(){return this.table?"".concat(this.table," 게시판 수정"):"게시판 생성"},btnLabel:function(){return this.table?"수정":"생성"},rules:function(){return V.a}},mounted:function(){this.init(),this.fetchSkinList()},methods:{init:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.table){t.next=10;break}return t.next=3,e.$axios.get("/api/adm/board/".concat(e.table));case 3:a=t.sent,a.bo_category=JSON.parse(a.bo_category),a.bo_sort=JSON.parse(a.bo_sort),a.wr_fields=JSON.parse(a.wr_fields),e.form=a,t.next=13;break;case 10:for(r={bo_table:"",bo_subject:"",bo_skin:"basic",bo_list_level:h["LV"].BLOCK,bo_read_level:h["LV"].BLOCK,bo_write_level:h["LV"].BLOCK,bo_reply_level:h["LV"].BLOCK,bo_comment_level:h["LV"].BLOCK,bo_download_level:h["LV"].BLOCK,bo_upload_cnt:2,bo_upload_size:2,bo_category:[],bo_use_category:0,bo_sort:[{by:"wr_grp",desc:0},{by:"wr_order",desc:1}],wr_fields:[]},o=1;o<=10;o++)r["bo_".concat(o)]="",r.wr_fields.push({title:"",required:0});e.form=r;case 13:case"end":return t.stop()}}),t)})))()},fetchSkinList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/api/adm/board/skinlist");case 2:a=t.sent,e.skins=a;case 4:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:if(a=!1,!e.table){t.next=12;break}return t.next=9,e.$axios.put("/api/adm/board/".concat(e.table),e.form);case 9:a=t.sent,t.next=15;break;case 12:return t.next=14,e.$axios.post("/api/adm/board",e.form);case 14:a=t.sent;case 15:a&&(e.$toast.info("".concat(e.form.bo_subject," 게시판을 ").concat(e.btnLabel,"하였습니다.")),e.$router.push("/adm/board/list"));case 16:case"end":return t.stop()}}),t)})))()}}},z=T,D=Object(f["a"])(z,p,x,!1,null,null,null),K=D.exports,F=a("dda8"),J={components:{BoardList:_,BoardForm:K,Error:F["default"]},name:"AdmBoardRenderer",computed:{match:function(){return this.$route.params.pathMatch.split("/")},action:function(){return this.match[0]},table:function(){return this.match[1]||""}}},N=J,M=Object(f["a"])(N,r,o,!1,null,null,null);t["default"]=M.exports},dda8:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._v("없는 페이지 입니다.")])},o=[],l={},n=l,s=a("2877"),i=Object(s["a"])(n,r,o,!1,null,null,null);t["default"]=i.exports}}]);
//# sourceMappingURL=admBoard.b9df8ad4.js.map