<template>
  <!-- <div class="home"> -->
     <div class="page page-home">
        <div class="search-header">
            <div class="img-box">
                <img src="../static/img/logo.jpg" alt="">
            </div>
            <h2 class="title">
                    送電寶寶租用還回記錄查詢
            </h2>
            <div class="describe">
                    您好！感謝您租用送電寶寶！您可以通過卡號或者手機號查看您所有的租用、還回明細！成為會員，還可以首七天免費使用送電寶寶！
            </div>
        </div>
        <div class="search-form">
            <div class="form-row">
                <div class="m-label">
                    銀行卡號/手機號
                </div>
                <div class="item">
                    <!-- <input-num  :value="card" @input="onInput"></input-num> -->
                    <van-field @input="inputNum" clearable v-model="card"  type="tel" placeholder="請輸入用於租用的卡號或者手機號" />
                </div>
            </div>
            <div class="operation-box">
                <button v-waves @click="searchHandle" class="border-but">查詢</button>
                <button v-waves @click="searchBeVip" class="back-but">查詢並成為會員</button>
            </div>
            <div class="tip">成為會員可免費租用一周</div>
        </div>
        <div class="clause">
            <div class="m-label">租用還回條款</div>
            <div class="content">
                    1、租用時，扣可退押金HK${{deposit}}<br/>
                    2、租金為：HK${{times}}/小時，不足1小時以1小時收費<br/>
                    3、租時算法：成功扣取可退回押金時計算<br/>
                    4、小票或明細在公司網站或微信公眾號查詢<br/>
                    5、押金會在還回送電寶寶時，扣取租金把余額退回<br/>
                    6、成為會員，可以從成為那天連續七天免費享受租用送電寶寶，租用中需扣HK${{deposit}}押金，還時退押金！<br/>
                    7、如有問題：請電{{phoneNumber}}查詢<br/>
                    8、實際使用中的租金及押金，以實際店鋪收取為準<br/>
                    9、最終解釋權，歸公司所有！<br/>
            </div>
        </div>
        <div class="copy-code">
            ©  ULTRA STRONG INVESTMENTS LIMITED
        </div>
    </div>
  <!-- </div> -->
</template>
<style lang="scss">
.page-home{
    .search-header{
        padding-top:.33rem;
        img{
            width: 2.19rem;
            height: .7rem
        }
        .img-box{
            margin: 0 auto;
            text-align: center;
            height: 0.7rem;
        }
        .title{
            text-align: center;
            color: #333333;
            font-size: .18rem;
            line-height: 1;
            margin-top: .1rem
        }
        .describe{
            color:#666666;
            font-size: .14rem;
            margin-top:.16rem;
            line-height: .2rem;
        }
    }

    .search-form{
        margin-top: .2rem;
    }
    .form-row .item,.form-row .van-cell{
        background: #F6F6F6;
        line-height: .4rem;
        height: .4rem;
        margin-top: .1rem;
        padding: 0 .1rem;
    }
    .form-row .van-cell{
        margin-top: 0;
    }
    .form-row .item input, .form-row .van-cell input{
        width: 100%;
        background: transparent;
        outline: none;
        // padding:0 .1rem;
        font-size: .14rem;
    }
    .operation-box{
        display: flex;
        box-sizing: border-box;
        margin-top: .15rem;
        justify-content: space-between;
       
    }
    .operation-box button{
        height: .4rem;
        text-align: center;
        color: #333333;
        border-radius: .05rem;
        font-size: .12rem;
        font-weight: bold;
    }


    .operation-box .border-but{
        flex: 0 0 1.3rem;
    }
    .operation-box .back-but{
        flex: 1;
        margin-left: .2rem;
    }
    .search-form .tip{
        color: #5C94EF;
        text-align: right;
        font-size: .12rem;
        padding-right: .33rem;
        margin-top: .1rem;
    }
    .clause{
        margin-top: .2rem;
    }
    .clause .content{
        font-size: .12rem;
        color: #999999;
        text-align: justify;
        line-height: .18rem;
        margin-top: .1rem;
    }
    .m-label{
        color:#333333;
        font-size: .14rem;
        line-height: 1;
        font-weight: bold;
    }
    .copy-code{
        text-align: center;
        margin-top: .2rem;
        margin-bottom: .1rem;
        color: #333333;
        font-size: .12rem;
        line-height: 1;
        font-weight: bold;
    }
}

</style>


<script>
import InputNum from "@src/components/InputNum"
import encrypt from "@src/common/js/encrypt.js"
import { getAbout,getTrades,beVip,getWhichNumber,SignKey } from "@src/apis";
import waves from "@src/common/js/waves";
import storage from "@src/common/js/storage";
import { setTimeout, clearTimeout } from 'timers';
import { mapState, mapActions } from "vuex";
export default {
  directives:{waves},
  name: 'home',
  data(){
      return {
          card:"",
        //   aboutData:'',
          times:'',// 时间
          deposit:'', // 押金
          phoneNumber:''//电话号码
      }
  },
  components: {
      InputNum
  },
  methods:{
        ...mapActions([
         'CHANGE_HOME_TRADES'
        ]),
      // 查询
      async searchHandle(){
        let haveTrades = await this.haveTrades();
        if(haveTrades&&haveTrades.code==0&&haveTrades.tradeList.buyLists){
            let data = haveTrades.tradeList.buyLists;
            this.CHANGE_HOME_TRADES(data);
            this.$nextTick(()=>{
                this.$router.push({ name: 'history', params: { 
                    card: this.card
                }})
            })
        }
      },
      // 查询并成为会员
      async searchBeVip(){
        let _this = this;
        let card=this.card;
        let haveTrades = await this.haveTrades();// 是否有退还记录
        if(haveTrades&&haveTrades.tradeList.buyLists&&haveTrades.tradeList.buyLists.length>0){
            if(!haveTrades.tradeList.member){
                 // 没有注册过会员的可注册会员,注册过的就不用了
                let sendData = encrypt.EncryptObj({
                    card:card,
                    membership:true
                },['card']);
                await beVip()({
                ...sendData
                })
                this.$toast(`恭喜，您已成功註冊為會員! 即将跳转列表页`);
            }else{
                this.$toast(`您好，您當前已是會員！即将跳转列表页`);
            }
            let data = haveTrades.tradeList.buyLists;
            this.CHANGE_HOME_TRADES(data);
            let _time = setTimeout(()=>{
                clearTimeout(_time)
                this.$router.push({ name: 'history', params: { 
                    card: this.card,
                    registerVip:true
                }})
            },1200)
        }
      },
       // 检测输入的是手机号还是银行卡
      async getWhichNumber(){
        let card = this.card;
        return new Promise(function(resolve, reject){
            let sendData = encrypt.EncryptObj({
                card:card,
            },['card']);
            getWhichNumber()({
                ...sendData
            }).then(res=>{
                if(res.code===0&&res.result){
                    resolve(res.result)
                }
            }).catch(err=>{
                resolve(false)
            })
        });
      },
      //如果有退还记录才可以进行接下来的操作
      haveTrades(){
        let card=this.card;
        return new Promise(function(resolve, reject){
            let sendData = encrypt.EncryptObj({
                card:card,
            },['card']);
            getTrades()({
               ...sendData
            }).then(res=>{
                let data = res.tradeList.buyLists;
                if(data&&data.length>0){
                    resolve(res);
                }
            }).catch(err=>{
                resolve(false);
            })
         });
      },
      // 租用还款条款
      getAbout(){
          getAbout()().then(res=>{
              if(res.code==0){
                //   this.aboutData=res.defaultList;
                  if(res.defaultList.length>0){
                      let data = res.defaultList;
                      this.times=data[0].setValue;
                      this.deposit=data[1].setValue;
                      this.phoneNumber=data[2].setValue;
                  }
              }
          })
      },
      inputNum(ev){
           let oldvalue= ev;
           let newval = oldvalue.replace(/\s/g, '').replace(/[^\d]/g, '');
           this.card=newval;
      },
      onInput(ev){
          this.card=ev
        },
  },
  created(){
      this.getAbout();
  }
}
</script>
