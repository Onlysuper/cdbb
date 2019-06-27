<template>
   <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">查詢銀行卡號</div>
                <div class="item">
                    <div class="input-box no-back">
                       {{formData.card}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">手機號</div>
                <div class="item">
                     <div class="input-box">
                        <van-field ref="phone" clearable v-model="formData.phone"  type="tel" placeholder="請輸入手機號" />
                     </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">驗證碼</div>
                <div class="item">
                    <div class="input-box">
                         <!-- <input type="tel" placeholder="請輸入驗證碼"> -->
                          <van-field ref="tel" clearable v-model="formData.code"  type="tel" placeholder="請輸入驗證碼" />
                    </div>
                   <TimerBtn ref="TimerBtn" :text="'獲取驗證碼'" :time="60" :cb="sendCode"></TimerBtn>
                </div>
            </div>
            <div class="form-footer">
                <button v-waves @click="addPhone" class="back-but">添加手機號</button>
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
import waves from "@src/common/js/waves";
import validator from "@src/common/js/validator.js"
import { getCheckCode,addPhone } from "@src/apis";
import TimerBtn from "@src/components/TimerBtn"
import { setTimeout } from 'timers';
import { mapState, mapActions } from "vuex";
let queryData= storage.getStorage('queryData')?JSON.parse(storage.getStorage('queryData')):{};
export default {
  directives:{waves},
  name: 'addphone',
  data(){
      return {
        formData:{
          card:this.$route.params.card||queryData.card,// 卡号
          phone:'',// 手机号码或者邮箱
          code:''// 验证码
        } 
      }
  },
  components: {
      TimerBtn
  },
  methods:{
     ...mapActions([
      'CHANGE_KEEPALIVES'
    ]),
    // 发送短信验证码
    sendCode() {
      if (
        !(validator.phoneNumber.test(this.formData.phone))&&
        !(validator.email.test(this.formData.phone))&&
        !(validator.mobilePatternHK.test(this.formData.phone))&&
        !(validator.mobilePatternTW.test(this.formData.phone))
        ) {
        this.$toast("请输入正确手机号码!");
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
    addPhone(){
      if(!this.formData.card){
        this.$toast("未获取查询卡号或者手机号!");
        return false;
      }else if (!this.formData.phone) {
        this.$toast("请输入正确手机号码或者邮箱号!");
        return false;
      }else if(!this.formData.code){
        this.$toast("验证码不能为空!");
        return false;
      }
      let sendData = encrypt.EncryptObj({
          card:this.formData.card,// 卡号
          phone:this.formData.phone,// 手机号码或者邮箱
          code:this.formData.code// 验证码
      },['card','phone','code']);
      this.$toast.loading({
          message: '提交中...'
      });
      addPhone()({
        ...sendData
      }).then(res=>{
        if(res.code==0){
          this.$toast.success("手机号添加成功！");
          this.CHANGE_KEEPALIVES([]);
          setTimeout(()=>{
             this.$router.replace({ name: 'history', params: { 
               card: this.formData.card
             }})
          },2000)
        }
      })
    }
  }
}
</script>
