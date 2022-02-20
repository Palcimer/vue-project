(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admBoard","error"],{"385a":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return"list"==e.action?r("board-list"):"form"==e.action?r("board-form",{attrs:{table:e.table}}):r("error")},l=[],o=(r("ac1f"),r("1276"),r("466d"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-toolbar",[r("v-toolbar-title",[e._v("게시판 관리")]),r("v-spacer"),r("tooltip-btn",{attrs:{label:"게시판 추가",icon:"",to:"/adm/board/form"}},[r("v-icon",[e._v("mdi-plus")])],1)],1)],1)}),s=[],n=r("414b"),i={components:{TooltipBtn:n["a"]},name:"AdmBoardList"},c=i,u=r("2877"),d=Object(u["a"])(c,o,s,!1,null,null,null),m=d.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-toolbar",[r("v-toolbar-title",[e._v(e._s(e.pageTitle))]),r("v-spacer"),r("v-btn",{attrs:{to:"/adm/board/list",color:"accent"}},[e._v("목록")]),r("v-btn",{staticClass:"ml-2",attrs:{color:"primary"},on:{click:e.save}},[e._v(e._s(e.btnLabel))])],1),e.form?r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{label:"게시판 ID",counter:"30",readonly:!!e.table,rules:[e.rules.alphaNum(),e.rules.require({label:"게시판 ID"})]},model:{value:e.form.bo_table,callback:function(t){e.$set(e.form,"bo_table",t)},expression:"form.bo_table"}}),r("v-text-field",{attrs:{label:"게시판 제목",counter:"100",rules:[e.rules.require({label:"게시판 제목"})]},model:{value:e.form.bo_subject,callback:function(t){e.$set(e.form,"bo_subject",t)},expression:"form.bo_subject"}}),r("v-select",{attrs:{label:"게시판 스킨",items:e.skins},model:{value:e.form.bo_skin,callback:function(t){e.$set(e.form,"bo_skin",t)},expression:"form.bo_skin"}}),r("board-sort",{attrs:{items:e.form.bo_sort}}),r("div",{staticClass:"d-flex"},[r("v-switch",{attrs:{label:"카테고리 사용",inset:""},model:{value:e.form.bo_use_category,callback:function(t){e.$set(e.form,"bo_use_category",t)},expression:"form.bo_use_category"}}),r("div",{staticClass:"ml-3",staticStyle:{flex:"1"}},[r("v-combobox",{attrs:{label:"카테고리",multiple:"",chips:"",disabled:!e.form.bo_use_category,dense:"","deletable-chips":"",clearable:"","append-icon":"",hint:"카테고리 입력 후 Enter로 구분 등록하세요."},scopedSlots:e._u([{key:"selection",fn:function(t){var a=t.attrs,l=t.item,o=t.parent,s=t.selected;return[r("v-chip",e._b({attrs:{"input-value":s,label:"",small:""}},"v-chip",a,!1),[r("span",[e._v(e._s(l))]),r("v-icon",{attrs:{small:"",right:""},on:{click:function(e){return o.selectItem(l)}}},[e._v("mdi-close")])],1)]}}],null,!1,1391295223),model:{value:e.form.bo_category,callback:function(t){e.$set(e.form,"bo_category",t)},expression:"form.bo_category"}})],1)],1),r("board-slider",{attrs:{label:"목록 읽기 레벨"},model:{value:e.form.bo_list_level,callback:function(t){e.$set(e.form,"bo_list_level",t)},expression:"form.bo_list_level"}}),r("board-slider",{attrs:{label:"게시물 읽기 레벨"},model:{value:e.form.bo_read_level,callback:function(t){e.$set(e.form,"bo_read_level",t)},expression:"form.bo_read_level"}}),r("board-slider",{attrs:{label:"게시물 쓰기 레벨"},model:{value:e.form.bo_write_level,callback:function(t){e.$set(e.form,"bo_write_level",t)},expression:"form.bo_write_level"}}),r("board-slider",{attrs:{label:"답변글 쓰기 레벨"},model:{value:e.form.bo_reply_level,callback:function(t){e.$set(e.form,"bo_reply_level",t)},expression:"form.bo_reply_level"}}),r("board-slider",{attrs:{label:"덧글 쓰기 레벨"},model:{value:e.form.bo_comment_level,callback:function(t){e.$set(e.form,"bo_comment_level",t)},expression:"form.bo_comment_level"}}),r("board-slider",{attrs:{label:"파일다운로드 레벨"},model:{value:e.form.bo_download_level,callback:function(t){e.$set(e.form,"bo_download_level",t)},expression:"form.bo_download_level"}}),r("div",{staticClass:"d-flex"},[r("v-slider",{attrs:{label:"파일 업로드 개수 : "+e.form.bo_upload_cnt,min:"0",max:"10","thumb-label":"",ticks:""},model:{value:e.form.bo_upload_cnt,callback:function(t){e.$set(e.form,"bo_upload_cnt",t)},expression:"form.bo_upload_cnt"}}),r("v-sheet",{staticClass:"ml-2",staticStyle:{background:"transparent"},attrs:{width:"200"}},[r("v-text-field",{attrs:{type:"number",label:"파일 업로드 용량",dense:"","hide-details":"",min:"1",max:"500",suffix:"Mb"},model:{value:e.form.bo_upload_size,callback:function(t){e.$set(e.form,"bo_upload_size",t)},expression:"form.bo_upload_size"}})],1)],1),r("v-expansion-panels",{attrs:{focusable:""}},[r("v-expansion-panel",[r("v-expansion-panel-header",[e._v(" 게시물 추가 필드 설정 ")]),r("v-expansion-panel-content",e._l(e.form.wr_fields,(function(t,a){return r("div",{key:a,staticClass:"d-flex"},[r("v-tooltip",{attrs:{top:"",color:"primary"},scopedSlots:e._u([{key:"activator",fn:function(a){var l=a.on,o=a.attrs;return[r("div",e._g(e._b({staticClass:"mt-2 mr-2"},"div",o,!1),l),[r("v-switch",{attrs:{dense:"",inset:""},model:{value:t.required,callback:function(r){e.$set(t,"required",r)},expression:"item.required"}})],1)]}}],null,!0)},[r("span",[e._v("필수 입력")])]),r("v-text-field",{attrs:{label:"추가 필드 제목 "+(a+1)},model:{value:t.title,callback:function(r){e.$set(t,"title",r)},expression:"item.title"}})],1)})),0)],1),r("v-expansion-panel",[r("v-expansion-panel-header",[e._v("게시판 여분 필드")]),r("v-expansion-panel-content",e._l(10,(function(t){return r("v-text-field",{key:t,attrs:{label:"여분 필드 "+t},model:{value:e.form["bo_"+t],callback:function(r){e.$set(e.form,"bo_"+t,r)},expression:"form[`bo_${i}`]"}})})),1)],1)],1)],1):e._e(),r("v-toolbar",{staticClass:"mt-4"},[r("v-btn",{attrs:{to:"/adm/board/list",color:"accent"}},[e._v("목록")]),r("v-spacer"),r("v-btn",{staticClass:"ml-2",attrs:{color:"primary"},on:{click:e.save}},[e._v(e._s(e.btnLabel))])],1)],1)},f=[],v=r("1da1"),_=(r("96cf"),r("bb5e")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pt-4 mt-4 mb_n4",staticStyle:{position:"relative"}},[r("div",{staticClass:"text-subtitle1",staticStyle:{position:"absolute",left:"0",top:"-8px"}},[r("span",{staticClass:"grey--text"},[e._v(e._s(e.label))]),r("span",{staticClass:"text-body-2 ml-2"},[e._v(e._s(e.LV_LABEL(e.value))+" ("+e._s(e.value)+")")])]),r("v-slider",{attrs:{value:e.value,min:e.LV.BLOCK,max:e.LV.SUPER,ticks:"always","tick-size":"1","thumb-label":""},on:{input:function(t){return e.$emit("input",t)}}})],1)},x=[],h=(r("a9e3"),{name:"BoardSlider",model:{prop:"value",event:"input"},props:{value:Number,label:String},computed:{LV:function(){return _["LV"]},LV_LABEL:function(){return _["LV_LABEL"]}}}),w=h,k=Object(u["a"])(w,p,x,!1,null,null,null),y=k.exports,g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-subheader",[e._v("정렬 규칙 설정")]),r("draggable",e._b({staticClass:"menu-drag-container",attrs:{tag:"div",list:e.items,handle:".handle"}},"draggable",e.dragOptions,!1),[r("transition-group",{attrs:{type:"transition",name:"flip-list"}},e._l(e.items,(function(t,a){return r("div",{key:t.by,staticClass:"item-group"},[r("div",[r("v-sheet",{staticClass:"item d-flex pa-4 pt-6",attrs:{outlined:"",rounded:"",elevation:"2"}},[r("div",{staticClass:"handle"},[r("v-icon",[e._v("mdi-drag")])],1),r("v-text-field",{staticClass:"ml-4",attrs:{label:"정렬규칙 "+(a+1),readonly:"",dense:"","hide-details":""},model:{value:t.by,callback:function(r){e.$set(t,"by",r)},expression:"item.by"}}),r("v-select",{staticClass:"ml-2",attrs:{label:"sort",items:e.descItems,dense:"","hide-details":""},model:{value:t.desc,callback:function(r){e.$set(t,"desc",r)},expression:"item.desc"}}),r("tooltip-btn",{attrs:{label:"규칙 제거",icon:""},on:{click:function(t){return e.removeItem(a)}}},[r("v-icon",[e._v("mdi-close")])],1)],1)],1)])})),0)],1),r("v-form",{ref:"form",staticClass:"d-flex mt-4 px-2",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.addItem.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-autocomplete",{attrs:{label:"정렬 규칙",items:e.wrItems,dense:"","prepend-icon":"mdi-sort",rules:[e.rules.require({label:"정렬 규칙"})]},model:{value:e.form.by,callback:function(t){e.$set(e.form,"by",t)},expression:"form.by"}}),r("v-select",{staticClass:"ml-2",attrs:{label:"sort",items:e.descItems,dense:""},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}}),r("tooltip-btn",{attrs:{label:"정렬규칙 추가",icon:"",type:"submit"}},[r("v-icon",[e._v("mdi-plus")])],1)],1),r("v-divider",{staticClass:"mt-4"})],1)},$=[],L=r("b85c"),C=(r("4de4"),r("d3b7"),r("a434"),r("b76a")),B=r.n(C),O=r("248f"),S=r.n(O),j={components:{draggable:B.a,TooltipBtn:n["a"]},name:"BoardSort",props:{items:{type:Array,required:!0}},data:function(){return{valid:!0,form:{by:"",desc:0},descItems:[{text:"내림차순(DESC)",value:0},{text:"오름차순(ASC)",value:1}]}},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}},wrItems:function(){var e,t=["wr_id","wr_reply","wr_grp","wr_order","wr_dep","wr_parent","mb_id","wr_email","wr_name","wr_password","wr_category","wr_title","wr_content","wr_view","wr_ip","wr_create_at","wr_update_at","wr_1","wr_2","wr_3","wr_4","wr_5","wr_6","wr_7","wr_8","wr_9","wr_10"],r=[],a=Object(L["a"])(this.items);try{for(a.s();!(e=a.n()).done;){var l=e.value;r.push(l.by)}}catch(o){a.e(o)}finally{a.f()}return t.filter((function(e){return r.indexOf(e)<0}))},rules:function(){return S.a}},methods:{initForm:function(){this.form={by:"",desc:0}},addItem:function(){var e=this;return Object(v["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:e.items.push(e.form),e.initForm(),e.$refs.form.resetValidation();case 8:case"end":return t.stop()}}),t)})))()},removeItem:function(e){this.items.splice(e,1)}}},V=j,E=Object(u["a"])(V,g,$,!1,null,null,null),I=E.exports,q={components:{TooltipBtn:n["a"],BoardSlider:y,BoardSort:I},name:"AdmBoardForm",props:{table:String},title:function(){return this.pageTitle},data:function(){return{valid:!0,form:null,skins:[]}},computed:{pageTitle:function(){return this.table?"".concat(this.table," 게시판 수정"):"게시판 생성"},btnLabel:function(){return this.table?"수정":"생성"},rules:function(){return S.a}},mounted:function(){this.init(),this.fetchSkinList()},methods:{init:function(){if(this.table);else{for(var e={bo_table:"",bo_subject:"",bo_skin:"basic",bo_list_level:_["LV"].BLOCK,bo_read_level:_["LV"].BLOCK,bo_write_level:_["LV"].BLOCK,bo_reply_level:_["LV"].BLOCK,bo_comment_level:_["LV"].BLOCK,bo_download_level:_["LV"].BLOCK,bo_upload_cnt:2,bo_upload_size:2,bo_category:[],bo_use_category:0,bo_sort:[{by:"wr_grp",desc:0},{by:"wr_order",desc:1}],wr_fields:[]},t=1;t<=10;t++)e["bo_".concat(t)]="",e.wr_fields.push({title:"",required:0});this.form=e}},fetchSkinList:function(){var e=this;return Object(v["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/api/adm/board/skinlist");case 2:r=t.sent,e.skins=r;case 4:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(v["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$refs.form.validate(),t.next=3,e.$nextTick();case 3:if(e.valid){t.next=5;break}return t.abrupt("return");case 5:console.log(e.form);case 6:case"end":return t.stop()}}),t)})))()}}},A=q,R=Object(u["a"])(A,b,f,!1,null,null,null),T=R.exports,z=r("dda8"),K={components:{BoardList:m,BoardForm:T,Error:z["default"]},name:"AdmBoardRenderer",computed:{match:function(){return this.$route.params.pathMatch.split("/")},action:function(){return this.match[0]},table:function(){return this.match[1]||""}}},D=K,F=Object(u["a"])(D,a,l,!1,null,null,null);t["default"]=F.exports},dda8:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._v("없는 페이지 입니다.")])},l=[],o={},s=o,n=r("2877"),i=Object(n["a"])(s,a,l,!1,null,null,null);t["default"]=i.exports}}]);
//# sourceMappingURL=admBoard.0ed999b5.js.map