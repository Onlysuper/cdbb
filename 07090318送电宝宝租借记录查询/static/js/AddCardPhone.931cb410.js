(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AddCardPhone"],{"23e4":function(t,a,e){},"5c79":function(t,a,e){},"5d06":function(t,a,e){"use strict";a["a"]={phoneNumber:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,mobilePatternHK:/^(\+852\s)?[5689]{1}\d{7}$/,mobilePatternTW:/^(\+886\s)?[0]{1}[9]{1}\d{8}$/,email:/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,bankCard:/^\d{5,}$/,verificationCode:{reg:/^\d{6}$/},taxCode:{reg:/^[a-zA-Z0-9]{15,20}$/},name:{reg:/^[\u4E00-\u9FA5A-Za-z]{2,}$/}}},6686:function(t,a,e){"use strict";var i=e("23e4"),s=e.n(i);s.a},c59f:function(t,a,e){"use strict";var i=e("5c79"),s=e.n(i);s.a},e69e:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"back-but item-s",class:{"timer-btn-active":t.timerBtnActiveClass},attrs:{disabled:t.disabled},on:{click:t.handleClick,touchstart:function(a){t.timerBtnActiveClass=!0},touchend:function(a){t.timerBtnActiveClass=!1}}},[t._v("\n          "+t._s(t.s)+"\n")])},s=[],r=(e("c5f6"),e("4bfc")),n={directives:{waves:r["a"]},data:function(){return{disabled:!1,timerBtnActiveClass:!1,s:this.text}},props:{cb:{type:Function,default:function(){console.info("请传入回调函数")}},time:{type:Number,default:6,required:!0},text:{type:String,default:"发送验证码"},textEnd:{type:String,default:"重新发送"}},methods:{handleClick:function(){this.cb()},timer:function(){var t=this,a=this.time,e=null;this.s=a+"秒",e=setInterval(function(){if(0==a)return t.disabled=!1,t.s=t.textEnd,void clearInterval(e);a--,t.s=a+"秒"},1e3)}}},o=n,c=(e("c59f"),e("2877")),l=Object(c["a"])(o,i,s,!1,null,null,null);a["a"]=l.exports},f259:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page addcard-page"},[e("div",{staticClass:"m-form-page"},[e("van-notice-bar",{attrs:{wrapable:"",scrollable:!1}},[t._v("\n         溫馨提示：您添加的銀行卡，是方便您以後用來查詢您過往的租借歸還記錄，而不是用來在本平台交易\n         ")]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"m-label"},[t._v("手機號/郵箱")]),e("div",{staticClass:"item"},[e("div",{staticClass:"input-box"},[e("van-field",{ref:"phone",attrs:{clearable:"",type:"email",placeholder:"请输入手机号/电邮作为查询号"},model:{value:t.formData.phone,callback:function(a){t.$set(t.formData,"phone",a)},expression:"formData.phone"}})],1)])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"label"},[t._v("驗證碼")]),e("div",{staticClass:"item"},[e("div",{staticClass:"input-box"},[e("van-field",{attrs:{clearable:"",type:"tel",placeholder:"請輸入驗證碼"},on:{input:function(a){return t.inputNum(a,"code")}},model:{value:t.formData.code,callback:function(a){t.$set(t.formData,"code",a)},expression:"formData.code"}})],1),e("TimerBtn",{ref:"TimerBtn",attrs:{text:"獲取驗證碼",time:60,cb:t.sendCode}})],1)]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"label"},[t._v("銀行卡號")]),e("div",{staticClass:"item"},[e("div",{staticClass:"input-box"},[e("van-field",{attrs:{clearable:"",type:"tel",placeholder:"請輸入銀行卡號"},on:{input:function(a){return t.inputNum(a,"newCard")}},model:{value:t.formData.newCard,callback:function(a){t.$set(t.formData,"newCard",a)},expression:"formData.newCard"}})],1)])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"label"},[t._v("有效期及CVV号")]),e("div",{staticClass:"item"},[e("div",{staticClass:"input-box"},[e("van-field",{attrs:{clearable:"",type:"tel",placeholder:"月/年（如0623）"},on:{input:function(a){return t.inputNum(a,"validityDate")}},model:{value:t.formData.validityDate,callback:function(a){t.$set(t.formData,"validityDate",a)},expression:"formData.validityDate"}})],1),e("div",{staticClass:"input-box item-s"},[e("van-field",{attrs:{clearable:"",type:"tel",placeholder:"卡背面CVV号"},on:{input:function(a){return t.inputNum(a,"cvv")}},model:{value:t.formData.cvv,callback:function(a){t.$set(t.formData,"cvv",a)},expression:"formData.cvv"}})],1)])]),e("div",{staticClass:"form-footer"},[e("button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"back-but",on:{click:t.addCard}},[t._v("添加銀行卡")])])],1)])},s=[],r=(e("a481"),e("cebc")),n=e("9feb"),o=e.n(n),c=e("5347"),l=(e("495f"),e("5d06")),d=e("e69e"),f=e("f8c8"),u=e("4bfc"),m=e("2f62"),v=o.a.getStorage("queryData")?JSON.parse(o.a.getStorage("queryData")):{},h={directives:{waves:u["a"]},name:"addcardphone",data:function(){return{formData:{card:this.$route.params.card||v.card,phone:"",newCard:"",validityDate:"",cvv:"",hasPhone:this.$route.params.hasPhone||v.hasPhone,code:""}}},created:function(){},components:{TimerBtn:d["a"]},methods:Object(r["a"])({},Object(m["b"])(["CHANGE_KEEPALIVES"]),{inputNum:function(t,a){var e=t,i=e.replace(/\s/g,"").replace(/[^\d]/g,"");this.formData[a]=i},sendCode:function(){var t=this;if(!l["a"].phoneNumber.test(this.formData.phone)&&!l["a"].email.test(this.formData.phone)&&!l["a"].mobilePatternHK.test(this.formData.phone)&&!l["a"].mobilePatternTW.test(this.formData.phone))return this.$toast("请输入正确手机号码或者邮箱号!"),!1;this.$refs.TimerBtn.timer();var a=c["a"].EncryptObj({phone:this.formData.phone},["phone"]);Object(f["f"])()(Object(r["a"])({},a)).then(function(a){t.$refs.TimerBtn.disabled=!0,t.$refs.TimerBtn.timer(),"0"==a.code?t.$toast("验证码发送成功！"):t.$toast(a.message)})},addCard:function(){var t=this;if(!this.formData.card)return this.$toast("未获取查询卡号或者手机号!"),!1;if(!this.formData.phone)return this.$toast("请输入正确手机号码或者邮箱号!"),!1;if(!this.formData.code)return this.$toast("验证码不能为空!"),!1;if(!this.formData.newCard)return this.$toast("请填写银行卡号码!"),!1;if(!this.formData.validityDate)return this.$toast("请填写银行卡有效期!"),!1;if(!this.formData.cvv)return this.$toast("请填写卡背面CVV号!"),!1;var a=c["a"].EncryptObj({card:this.formData.card,phone:this.formData.phone,newCard:this.formData.newCard,validityDate:this.formData.validityDate,cvv:this.formData.cvv,hasPhone:"TRUE"==this.formData.hasPhone,code:this.formData.code},["card","phone","newCard","validityDate","cvv"]);this.$toast.loading({message:"提交中..."}),Object(f["b"])()(Object(r["a"])({},a)).then(function(a){0==a.code&&(t.$toast.success("银行卡添加成功!"),t.CHANGE_KEEPALIVES([]),setTimeout(function(){t.$router.replace({name:"history",params:{card:t.formData.card}})},1500))})}})},p=h,b=(e("6686"),e("2877")),C=Object(b["a"])(p,i,s,!1,null,null,null);a["default"]=C.exports}}]);