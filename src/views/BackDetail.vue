<template>
   <div class="page backdetail-page">
       <div class="container">
            <div class="m-header">送电宝宝租借单</div>
            <ul>
                <li>
                    <div class="label">押金金額</div>
                    <div class="content">HK${{details.ppriceYajin | moneyFormatCN(true)}}</div>
                </li>
                <li>
                    <div class="label">退還金額</div>
                    <div class="content">HK${{details.repayAmount |moneyFormatCN(true)}}</div>
                </li>
                <li>
                    <div class="label">租金</div>
                    <div class="content">HK${{details.ppayPrice |moneyFormatCN(true)}}</div>
                </li>
                <li>
                    <div class="label">租金單價</div>
                    <div class="content">HK${{details.pprice |moneyFormatCN(true)}}</div>
                </li>
                <li>
                    <div class="label">租用時間</div>
                    <div class="content">{{details.pborrowTime}}</div>
                </li>
                <li>
                    <div class="label">退還時間</div>
                    <div class="content">{{details.preturnTime}}</div>
                </li>
                <li>
                    <div class="label">租借時長</div>
                    <div class="content">{{details.puseTime}}</div>
                </li>
                <li>
                    <div class="label">租借機櫃號</div>
                    <div class="content">{{details.pdeviceID}}</div>
                </li>
                <li>
                    <div class="label">退還機櫃號</div>
                    <div class="content">{{details.pghDeviceID}}</div>
                </li>
                <li>
                    <div class="label">送電寶寶編號</div>
                    <div class="content">{{details.pbatteryID}}</div>
                </li>
                <li>
                    <div class="label">終端編號</div>
                    <div class="content">{{details.terminalNo}}</div>
                </li>
                <li>
                    <div class="label">操作員號</div>
                    <div class="content">{{details.pserviceCode}}</div>
                </li>
                <li>
                    <div class="label">批次號</div>
                    <div class="content">{{details.batchNo}}</div>
                </li>
                <li>
                    <div class="label">憑證號</div>
                    <div class="content">{{details.voucherNo}}</div>
                </li>  
                <li>
                    <div class="label">授權號</div>
                    <div class="content">{{details.papprovalCode}}</div>
                </li>    
                <li>
                    <div class="label">交易參考號</div>
                    <div class="content">{{details.transactionNo}}</div>
                </li>    

            </ul>
       </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/backdetail.scss);
</style> 


<script>
import { mapState, mapActions } from "vuex";
import { getDetail } from "@src/apis";
export default {
  name: 'rentdetail',
  data(){
      return {
          orderId:this.$route.params.orderId+'',
          card:this.$route.params.card+'',
          details:{}
      }
  },
  computed: {
    ...mapState({
      searchVal: state => state.SEARCHVAL,
    })
  },
  created(){
      getDetail()({
          orderId:this.orderId
      }).then(res=>{
          if(res.code==0){
              this.details=res.buyDetail
          }
      })
  },
  components: {
  }
}
</script>