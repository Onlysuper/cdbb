<template>
  <!-- <div class="home"> -->
     <div class="page page-home">
        <div class="search-header">
            <div class="img-box">
                <img src="../static/img/pic_logo@3x.png" alt="">
            </div>
            <h2 class="title">
                    充電寶寶租用還會記錄查詢
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
                    <input  v-model="searchVal" type="email" placeholder="请输入用于租用的卡号或是手机号">
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
                    1、租用时，扣可退押金99元<br/>
                    2、租金为：1元/小时，不足1小时以1小时收费<br/>
                    3、租时算法：成功扣取可退回押金时计算<br/>
                    4、小票或明细在公司网站或微信公众号查询<br/>
                    5、押金会在还回送电宝宝时，扣取租金把余额退回<br/>
                    6、成为会员，可以从成为会员那天连续七天免费享受租用送电宝<br/>  
                         宝，租用中需扣99元押金，还时退押金！<br/>
                    7、如有问题：请电852-68882022查询<br/>
                    8、最终解释权，归公司所有！<br/>
            </div>
        </div>
        <div class="copy-code">
            ©  POWER PAY LIMITED
        </div>
    </div>
  <!-- </div> -->
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
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
    .form-row .item{
        background: #F6F6F6;
        line-height: .4rem;
        height: .4rem;
        margin-top: .1rem;
    }
    .form-row .item input{
        width: 100%;
        background: transparent;
        outline: none;
        padding:0 .1rem;
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
    // button{
    // position: relative;
    //   -webkit-appearance: none;
    //  -webkit-text-size-adjust: 100%;
    // }
}

</style>


<script>
import "@src/common/js/button.js"
import { getTrades,beVip } from "@src/apis";
import waves from "@src/common/js/waves";
export default {
  directives:{waves},
  name: 'home',
  data(){
      return {
          searchVal:""
      }
  },
  components: {
  },
  methods:{
      // 查询
      async searchHandle(){
        let haveTrades = await this.haveTrades();
         if(haveTrades){
            this.$router.push({ name: 'history', params: { 
                searchVal: this.searchVal 
            }})
         }
      },
      async haveTrades(){
        let searchVal=this.searchVal;
        new Promise(function(resolve, reject){
            getTrades()({
                card:searchVal
            }).then(res=>{
                let data = res.tradeList.buyLists;
                if(data&&data.length>0){
                    resolve(data)
                }
            }).catch(err=>{
                reject(false)
            })
         });
      },
      // 查询并成为会员
      async searchBeVip(){
          let searchVal=this.searchVal;
          let haveTrades = await this.haveTrades();
          if(haveTrades){
              beVip()({
                  card:searchVal
              }).then(res=>{
                this.$router.push({ name: 'history', params: { 
                    searchVal: this.searchVal 
                }})
              })
          }
      }
  }
}
</script>
