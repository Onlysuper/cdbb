<template>
   <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">查詢銀行卡號</div>
                <div class="item">
                    <div class="input-box no-back">
                       6216********0236
                    </div>
                </div>
            </div>
          
            <div class="form-row">
                <div class="label">手機號</div>
                <div class="item">
                     <div class="input-box">
                        <input type="tel" v-model="phone" placeholder="請輸入手機號">
                     </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">驗證碼</div>
                <div class="item">
                    <div class="input-box">
                         <input type="tel" placeholder="請輸入驗證碼">
                    </div>
                   <TimerBtn ref="TimerBtn" :text="'獲取驗證碼'" :time="60" :cb="sendCode"></TimerBtn>
                </div>
            </div>
            <div class="form-footer">
                <button class="back-but">添加手機號</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/formstyle.scss);
</style>


<script>
import { getCheckCode,addPhone } from "@src/apis";
import TimerBtn from "@src/components/TimerBtn"
// @ is an alias to /src
export default {
  name: 'addcard',
  data(){
      return {
          phone:''
      }
  },
  components: {
      TimerBtn
  },
  methods:{
       // 发送短信验证码
    sendCode() {
        this.$refs.TimerBtn.timer();
    //   if (this.isPhone) {
    //     this.Toast("请输入正确手机号码!");
    //     $(this.$refs.phone).focus();
    //     return;
    //   }
    //   let phone = this.$refs.phone.value.trim();
      getCheckCode()({ 
         phone:this.phone
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
  }
}
</script>
