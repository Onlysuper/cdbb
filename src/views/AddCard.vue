<template>
    <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">查詢手機號</div>
                <div class="item">
                    <div class="input-box no-back">
                      {{formData.card}}
                    </div>
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
import { addCard } from "@src/apis";
import waves from "@src/common/js/waves";
import { mapState, mapActions } from "vuex";
export default {
    directives:{waves},
    data(){
       return {
            formData:{
                card:this.$route.params.card,// 查询的卡号或者手机号
                // code:'',// 验证码
                hasPhone:this.$route.params.hasPhone,// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
                newCard:'',// 新添加的银行卡卡号
                phone:this.$route.params.card,// 手机号码或者邮箱
                validityDate:'',// 银行卡有效期
                cvv:'' //卡背面CVV号
            } 
        }
    },
    name: 'addcard',
    components: {
    },
    methods:{
        ...mapActions([
         'CHANGE_KEEPALIVES'
        ]),
        addCard(){
            addCard()({
                ...this.formData
            }).then(res=>{
                if(res.code==0){
                    this.$toast.success("银行卡添加成功!");
                    this.CHANGE_KEEPALIVES([]) //清空缓存
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
