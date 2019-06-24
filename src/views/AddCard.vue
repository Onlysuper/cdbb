<template>
    <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">查詢手機號</div>
                <div class="item">
                    <div class="input-box no-back">
                      {{formData.phone}}
                    </div>
                </div>
            </div>
          
            <div class="form-row">
                <div class="label">銀行卡號</div>
                <div class="item">
                     <div class="input-box">
                         <van-field clearable v-model="formData.newCard"  type="number" placeholder="請輸入銀行卡號" />
                        <!-- <input type="tel" placeholder="請輸入銀行卡號"> -->
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
                <button  v-waves @click="addCard" class="back-but">添加銀行卡</button>
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
export default {
    directives:{waves},
    data(){
       return {
            formData:{
                card:'',// 查询的卡号或者手机号
                code:'',// 验证码
                hasPhone:'',// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
                newCard:'',// 新添加的银行卡卡号
                phone:this.$route.params.phone// 手机号码或者邮箱
            } 
        }
    },
    name: 'addcard',
    components: {
    }
}
</script>
