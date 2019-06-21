<template>
   <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">手機號/郵箱</div>
                <div class="item">
                    <div class="input-box">
                         <input type="tel" placeholder="请输入手机号/电邮作为查询号">
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
            <div class="form-row">
                <div class="label">銀行卡號</div>
                <div class="item">
                     <div class="input-box">
                        <input type="tel" placeholder="請輸入銀行卡號">
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
                <button class="back-but">添加銀行卡</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/formstyle.scss);
</style>


<script>
import TimerBtn from "@src/components/TimerBtn"
import { getCheckCode } from "@src/apis";
// @ is an alias to /src
export default {
  name: 'addcardphone',
  components: {
      TimerBtn
  },
  methods:{
      //获取验证码
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
