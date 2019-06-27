<template>
   <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">手機號/郵箱</div>
                <div class="item">
                    <div class="input-box">
                          <van-field ref="phone" clearable v-model="formData.phone"  type="text" placeholder="请输入手机号/电邮作为查询号" />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">驗證碼</div>
                <div class="item">
                    <div class="input-box">
                         <van-field clearable v-model="formData.code"  type="tel" placeholder="請輸入驗證碼" />
                    </div>
                    <TimerBtn ref="TimerBtn" :text="'獲取驗證碼'" :time="60" :cb="sendCode"></TimerBtn>
                </div>
            </div>
            <div class="form-row">
                <div class="label">銀行卡號</div>
                <div class="item">
                     <div class="input-box">
                        <van-field clearable v-model="formData.newCard"  type="tel" placeholder="請輸入銀行卡號" />
                     </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">有效期及CVV号</div>
                <div class="item">
                     <div class="input-box">
                         <van-field clearable v-model="formData.validityDate"  type="tel" placeholder="月/年（如0623）" />
                     </div>
                      <div class="input-box item-s">
                           <van-field clearable v-model="formData.cvv"  type="tel" placeholder="卡背面CVV号" />
                     </div>
                </div>
            </div>
            <div class="form-footer">
                <button v-waves @click="addCard" class="back-but">添加銀行卡</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/formstyle.scss);
</style>


<script>
import storage from "@src/common/js/storage.js"
import encrypt from "@src/common/js/encrypt.js"
import utils from "@src/common/js/utils.js"
import validator from "@src/common/js/validator.js"
import TimerBtn from "@src/components/TimerBtn"
import { getCheckCode,addCard } from "@src/apis";
import waves from "@src/common/js/waves";
import { mapState, mapActions } from "vuex";
let queryData= storage.getStorage('queryData')?JSON.parse(storage.getStorage('queryData')):{};
export default {
  directives:{waves},
  name: 'addcardphone',
  data(){
    return {
      formData:{
        card:this.$route.params.card||queryData.card,// 查询的卡号或者手机号
        phone:'',// 手机号码或者邮箱
        newCard:'',// 新添加的银行卡卡号
        validityDate:'',// 银行卡有效期
        cvv:'', //卡背面CVV号
        hasPhone:this.$route.params.hasPhone||queryData.hasPhone,// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
        code:''// 验证码
      } 
    }
  },
  created(){
    // this.$set(this.formData,'card',this.$route.params.card);
    // this.$set(this.formData,'hasPhone',this.$route.params.hasPhone);
  },
  components: {
      TimerBtn
  },
  methods:{
    ...mapActions([
      'CHANGE_KEEPALIVES'
    ]),
      //获取验证码
    sendCode() {
      if (
        !(validator.phoneNumber.test(this.formData.phone))&&
        !(validator.email.test(this.formData.phone))&&
        !(validator.mobilePatternHK.test(this.formData.phone))&&
        !(validator.mobilePatternTW.test(this.formData.phone))
        ) {
        this.$toast("请输入正确手机号码或者邮箱号!");
        return false;
      }
      this.$refs.TimerBtn.timer();
      let sendData = encrypt.EncryptObj({
          phone:this.formData.phone
       },['phone']);
      getCheckCode()({ 
         ...sendData
      }).then(res => {
        this.$refs.TimerBtn.disabled = true;
        this.$refs.TimerBtn.timer();
        if (res.code == "0") {
          this.$toast("验证码发送成功！");
        } else {
          this.$toast(res.message);
        }
      });
    },
    // 添加银行卡
    addCard(){
      // let phone = this.formData.phone;
      // let newCard = this.formData.newCard;
      // if (!(validator.phoneNumber.test(phone))&&!(validator.email.test(phone))) {
      //   this.$toast("请输入正确手机号码或者邮箱号!");
      //   return false;
      // }else if(!(validator.bankCard.test(newCard))){
      //   this.$toast("请输入正确的银行卡号!");
      //   return false;
      // }
      if(!this.formData.card){
        this.$toast("未获取查询卡号或者手机号!");
        return false;
      }else if (!this.formData.phone) {
        this.$toast("请输入正确手机号码或者邮箱号!");
        return false;
      }else if(!this.formData.code){
        this.$toast("验证码不能为空!");
        return false;
      }else if(!this.formData.newCard){
        this.$toast("请填写银行卡号码!");
        return false;
      }else if(!this.formData.validityDate){
        this.$toast("请填写银行卡有效期!");
        return false;
      }else if(!this.formData.cvv){
        this.$toast("请填写卡背面CVV号!");
        return false;
      }
      let sendData = encrypt.EncryptObj({
        card:this.formData.card,// 查询的卡号或者手机号
        phone:this.formData.phone,// 手机号码或者邮箱
        newCard:this.formData.newCard,// 新添加的银行卡卡号
        validityDate:this.formData.validityDate,// 银行卡有效期
        cvv:this.formData.cvv, //卡背面CVV号
        hasPhone:this.formData.hasPhone,// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
        code:this.formData.code// 验证码
      },
      ['card','phone','newCard','validityDate','cvv']);
      this.$toast.loading({
          message: '提交中...'
      });
      addCard()({
        ...sendData
      }).then(res=>{
        if(res.code==0){
          this.$toast.success("银行卡添加成功!");
          this.CHANGE_KEEPALIVES([]) //清空缓存
          setTimeout(()=>{
             this.$router.replace({ name: 'history', params: { 
               card:this.formData.card
             }})
          },2000)
        }
      })
    }
  }
}
</script>
