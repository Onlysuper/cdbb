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
import waves from "@src/common/js/waves";
import validator from "@src/common/js/validator.js"
import { getCheckCode,addPhone } from "@src/apis";
import TimerBtn from "@src/components/TimerBtn"
import { setTimeout } from 'timers';
import { mapState, mapActions } from "vuex";
export default {
  directives:{waves},
  name: 'addcard',
  data(){
      return {
        formData:{
          card:this.$route.params.card,// 卡号
          code:'',// 验证码
          phone:''// 手机号码或者邮箱
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
          this.$toast("验证码发送成功！");
        } else {
          this.$toast(res.message);
        }
      });
    },
    addPhone(){
      addPhone()({
        ...this.formData
      }).then(res=>{
        if(res.code==0){
          this.Toast.success("手机号添加成功！");
          this.CHANGE_KEEPALIVES([]);
          setTimeout(()=>{
             this.$router.replace({ name: 'history', params: { 
             }})
          },2000)
        }
      })
    }
  }
}
</script>
