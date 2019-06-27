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
import storage from "@src/common/js/storage.js"
import { mapState, mapActions } from "vuex";
import encrypt from "@src/common/js/encrypt.js"
import { addCard } from "@src/apis";
import waves from "@src/common/js/waves";
let queryData= storage.getStorage('queryData')?JSON.parse(storage.getStorage('queryData')):{};
export default {
    directives:{waves},
    data(){
       return {
            formData:{
                card:this.$route.params.card || queryData.card,// 查询的卡号或者手机号
                phone:this.$route.params.phone|| queryData.phone,// 手机号码或者邮箱
                newCard:'',// 新添加的银行卡卡号
                validityDate:'',// 银行卡有效期
                cvv:'', //卡背面CVV号
                hasPhone:this.$route.params.hasPhone|| queryData.hasPhone// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
            } 
        }
    },
    name: 'addcard',
    computed: {
        ...mapState({
            QUERY_DATA: state => state.QUERY_DATA,
        })
    },
    created(){
            // this.formData={
            //     card:this.$route.params.card || this.QUERY_DATA.card,// 查询的卡号或者手机号
            //     phone:this.$route.params.phone,// 手机号码或者邮箱
            //     newCard:'',// 新添加的银行卡卡号
            //     validityDate:'',// 银行卡有效期
            //     cvv:'', //卡背面CVV号
            //     hasPhone:this.$route.params.hasPhone// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
            // } 
    },
    components: {
    },
    methods:{
        ...mapActions([
         'CHANGE_KEEPALIVES'
        ]),
        addCard(){
            if(!this.formData.card){
                this.$toast("未获取查询卡号或者手机号!");
                return false;
            }else if (!this.formData.phone) {
                this.$toast("请输入正确手机号码或者邮箱号!");
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
                hasPhone:this.formData.hasPhone// 如果查询的是卡号，当前卡号是否有手机号,如果查询的是手机号，传true
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
                              card: this.formData.card
                        }})
                    },1500)
                }
            })
        }
    }
}
</script>
