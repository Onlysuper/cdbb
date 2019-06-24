<template>
   <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">手機號/郵箱</div>
                <div class="item">
                    <div class="input-box">
                          <van-field ref="phone" clearable v-model="formData.phone"  type="number" placeholder="请输入手机号/电邮作为查询号" />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">驗證碼</div>
                <div class="item">
                    <div class="input-box">
                         <van-field clearable v-model="formData.code"  type="number" placeholder="請輸入驗證碼" />
                    </div>
                    <TimerBtn ref="TimerBtn" :text="'獲取驗證碼'" :time="60" :cb="sendCode"></TimerBtn>
                </div>
            </div>
            <div class="form-row">
                <div class="label">銀行卡號</div>
                <div class="item">
                     <div class="input-box">
                        <van-field clearable v-model="formData.newCard"  type="number" placeholder="請輸入銀行卡號" />
                     </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">有效期及CVV号</div>
                <div class="item">
                     <div class="input-box">
                          <input type="tel" placeholder="月/年（如0623）">
                     </div>
                      <div class="input-box item-s">
                           <input class="" type="tel" placeholder="卡背面CVV号">
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
import validator from "@src/common/js/validator.js"
import TimerBtn from "@src/components/TimerBtn"
import { getCheckCode,addCard } from "@src/apis";
import waves from "@src/common/js/waves";
export default {
  directives:{waves},
  name: 'addcardphone',
  data(){
    return {
      card :this.$route.params.card,
      formData:{
        card:'',// 查询的卡号或者手机号
        code:'',// 验证码
        hasPhone:'',// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
        newCard:'',// 新添加的银行卡卡号
        phone:''// 手机号码或者邮箱
      } 
    }
  },
  created(){
    this.$set(this.formData,'card',this.$route.params.card);
    this.$set(this.formData,'hasPhone',this.$route.params.hasPhone);
  },
  components: {
      TimerBtn
  },
  methods:{
      //获取验证码
    sendCode() {
      if (!(validator.phoneNumber.test(this.formData.phone))) {
        this.$toast("请输入正确手机号码!");
        return false;
      }
      this.$refs.TimerBtn.timer();
      getCheckCode()({ 
         phone:this.formData.phone
      }).then(res => {
        this.$refs.TimerBtn.disabled = true;
        this.$refs.TimerBtn.timer();
        if (res.code == "001") {
          this.Toast("验证码发送成功！");
        } else {
          this.Toast(res.message);
        }
      });
    },
    // 添加银行卡
    addCard(){
      let phone = this.formData.phone;
      let newCard = this.formData.newCard;
      if (!(validator.phoneNumber.test(phone))) {
        this.$toast("请输入正确手机号码!");
        return false;
      }else if(!(validator.bankCard.test(newCard))){
        this.$toast("请输入正确的银行卡号!");
        return false;
      }
      addCard()({
        ...this.formData
      }).then(res=>{
        if(res.code==0){
          this.$toast("银行卡添加成功!");
          this.$router.replace({ name: 'history', params: { 
          }})
        }
      })
    }
  }
}
</script>
