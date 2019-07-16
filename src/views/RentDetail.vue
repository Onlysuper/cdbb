<template>
  <div class="page rentdetail-page">
       <div class="container">
            <div class="m-header">送電寶寶租借單</div>
            <ul>
                <li>
                    <div class="label">押金金額</div>
                    <div class="content">
                        HK${{details.ppriceYajin | moneyFormatCN(true)}}
                    </div>
                </li>
                <li>
                    <div class="label">電話號碼</div>
                    <div class="content">
                        {{details.pphone}}
                    </div>
                </li>
                <li>
                    <div class="label">唯一查詢號</div>
                    <div class="content">{{details.popenID || details.pphone}}</div>
                </li>
                <li>
                    <div class="label">機櫃編碼</div>
                    <div class="content">{{details.pdeviceID}}</div>
                </li>
                <li>
                    <div class="label">送電寶寶編號</div>
                    <div class="content">{{details.pbatteryID}}</div>
                </li>
                <li>
                    <div class="label">租金單價</div>
                    <div class="content">HK${{details.pprice |moneyFormatCN(true)}}</div>
                </li>
                <li>
                    <div class="label">租用時間</div>
                    <div class="content">{{details.pborrowTime}}</div>
                </li>
                <!-- 以下为新增数据 -->
                <li>
                    <div class="label">商戶編號</div>
                    <div class="content">{{details.customerNo}}</div>
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
                    <div class="label">授權碼</div>
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
  @import url(../static/sass/rentdetail.scss);
</style>
<script>
import { getDetail } from "@src/apis";
export default {
  name: 'rentdetail',
  data(){
      return {
          orderId:this.$route.params.orderId+'',
          details:{}
      }
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
