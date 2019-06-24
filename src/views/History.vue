<template>
  <div class="page history-page">
       <div class="search-top-fixed search-top">
            <div class="search-box">
                <!-- <input v-model="card" type="text" placeholder="请输入用于租用的手机号/银行卡号进行查询"> -->
                <van-field clearable v-model="card"  type="number" placeholder="请输入用于租用的手机号/银行卡号进行查询" />
                <img @click="searchHandle()" class="icon" src="../static/img/icon_search@3x.png" alt="">
            </div>
       </div>
        <div class="search-place"></div>
       <div class="search-top">
          <div class="search-tip">
             最近的2次租用退还记录
          </div>
          <div class="search-tip-grop">
            <div v-for="item in tips" :key="item.code" @click="searchHandle(item.code)" :class="['tip',{selected:dayTime==item.code?true:false}]">{{item.label}}</div>
          </div>
       </div>
       <div class="list-container">
         
            <div v-for="(item,index) in list" :key="index" :class="['item','type1',item.preturnTime?'type2':'type1']">
                
                <div @click="detailHandle({porderID:item.porderID,preturnTime:item.preturnTime})" class="item-header">
                    {{item.preturnTime?'查看退还详情':'查看租用详情'}}
                    <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                </div>
                <!-- 查看租用start -->
                <div v-if="item.preturnTime" class="item-body">
                    <ul>
                        <li>
                            <div class="label">租用時間:</div>
                            <div class="content">{{item.pborrowTime}}</div>
                        </li>
                        <li>
                            <div class="label">押金金額:</div>
                            <div class="content">{{item.ppriceYajin}}</div>
                        </li>
                        <li>
                            <div class="label">租金單價:</div>
                            <div class="content">{{item.pprice}}</div>
                        </li>
                        <li>
                            <div class="label">電話號碼:</div>
                            <div class="content">{{item.pphone}}</div>
                        </li>
                        <li>
                            <div class="label">唯一查詢號:</div>
                            <div class="content">{{item.popenID || item.pphone}}</div>
                        </li>
                        <li>
                            <div class="label">機櫃編碼:</div>
                            <div class="content">{{item.pdeviceID}}</div>
                        </li>
                        <li>
                            <div class="label">送電寶寶編號:</div>
                            <div class="content">{{item.pbatteryID}}</div>
                        </li>
                    </ul>
                </div>
                <!-- 查看退还详情start -->
                <div v-else class="item-body">
                    <ul>
                        <li>
                            <div class="label">租用時間:</div>
                            <div class="content">{{item.pborrowTime}}</div>
                        </li>
                        <li>
                            <div class="label">退還時間:</div>
                            <div class="content">{{item.preturnTime}}</div>
                        </li>
                        <li>
                            <div class="label">租借時長:</div>
                            <div class="content">{{item.puseTime}}</div>
                        </li>
                        <li>
                            <div class="label">租金單價:</div>
                            <div class="content">{{item.pprice}}</div>
                        </li>
                        <li>
                            <div class="label">租金:</div>
                            <div class="content">{{item.ppayPrice}}</div>
                        </li>
                        <li>
                            <div class="label">押金金額:</div>
                            <div class="content">{{item.ppriceYajin}}</div>
                        </li>
                        <li>
                            <div class="label">退還金額:</div>
                            <div class="content">{{item.repayAmount}}</div>
                        </li>
                        <li>
                            <div class="label">機櫃號:</div>
                            <div class="content">{{item.pdeviceID}}</div>
                        </li>
                        <li>
                            <div class="label">送電寶寶編號:</div>
                            <div class="content">{{item.pbatteryID}}</div>
                        </li>
                    </ul>
                </div>
                 <!-- 查看退还详情end -->
            </div>
              <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading">
                    <!-- <div slot="spinner">Loading...</div> -->
                    <div slot="no-more" class="no-more">已加载全部内容</div>
                    <div slot="no-results">当前内容为空</div>
              </infinite-loading>
            
             <!-- <div class="item type1">
                <div class="item-header">
                    查看租用详情
                    <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                </div>
                <div class="item-body">
                    <ul>
                        <li>
                            <div class="label">租用时间:</div>
                            <div class="content">2019/06/06 15:32:01</div>
                        </li>
                        <li>
                            <div class="label">押金金额:</div>
                            <div class="content"></div>
                        </li>
                        <li>
                            <div class="label">租金单价:</div>
                            <div class="content"></div>
                        </li>
                        <li>
                            <div class="label">手机号:</div>
                            <div class="content"></div>
                        </li>
                        <li>
                            <div class="label">唯一查询号:</div>
                            <div class="content"></div>
                        </li>
                        <li>
                            <div class="label">机柜号:</div>
                            <div class="content"></div>
                        </li>
                        <li>
                            <div class="label">送电宝宝号:</div>
                            <div class="content"></div>
                        </li>
                    </ul>
                </div>
            </div> -->
       </div>
       <div class="footer-place"></div>
       <div class="search-footer">
           <div class="m-button">
                <button @click="addBankCard">添加銀行卡</button>
           </div>
           <div class="split-line"></div>
           <div class="m-button">
                <button @click="addPhone">添加手機號</button>
           </div>
           <div class="split-line"></div>
          <div class="m-button">
                <button @click="beVip">成為會員</button>
          </div>
       </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/history.scss);
</style>


<script>
import { getTrades,beVip,getWhichNumber } from "@src/apis";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'history',
  components: {
      InfiniteLoading
  },
  data(){
      return {
        dayTime:'',
        // card :this.$route.params.card,
        card :6225768616893580,
        page: 1,
        list: [],
        infiniteId: +new Date(),
        tips:[
        {
            label:'最近七天',
            code:'7'
        },
        {
            label:'最近1个月',
            code:'30'
        },
        {
            label:'最近2个月',
            code:'60'
        },
        {
            label:'最近3个月',
            code:'90'
        },
        ]
      }
  },
  methods:{
      //如果有退还记录才可以进行接下来的操作
      haveTrades(){
        let searchVal=this.card;
        return new Promise(function(resolve, reject){
            getTrades()({
                card:searchVal
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
      // 添加手机号
      async addPhone(){
          let _this = this;
          let card = this.card;
          let haveTrades = await this.haveTrades();
          if(card){
            if(haveTrades){ // 有退还记录的才会有接下来的操作
              let getWhichNumber = await this.getWhichNumber();
                if(getWhichNumber.card!=getWhichNumber.phone){
                    // 查询的是卡号
                    this.$router.push({ name: 'addphone', params: { 
                        card:card
                    }})
                }else{
                    // 查询的是手机号,直接进入手机号绑卡
                    _this.$toast('该手机号已经添加过了');
                }
            }
          }else{
            _this.$toast('请先输入搜索关键字');
          }
      },
      // 添加银行卡
      async addBankCard(){
          let _this = this;
          let card = this.card;
          let haveTrades = await this.haveTrades();
          if(card){
            if(haveTrades){ // 有退还记录的才会有接下来的操作
                let getWhichNumber = await this.getWhichNumber();
                if(getWhichNumber.card!=getWhichNumber.phone){
                    // 查询的是卡号
                    if(getWhichNumber.hasPhone=='true'){
                        // 有手机号 进入手机号绑卡
                        this.$router.push({ name: 'addcard', params: { 
                         card:card,
                         hasPhone:true
                        }})
                    }else{
                        //没有手机号 进入手机号银行双卡绑定
                        this.$router.push({ name: 'addcardphone', params: { 
                         card:card,
                         hasPhone:false
                        }})
                    }
                }else{
                    // 查询的是手机号,直接进入手机号绑卡
                    this.$router.push({ name: 'addcard', params: { 
                      card:card,
                      hasPhone:true
                    }})
                }
            }
          }else{
              _this.$toast('请先输入搜索关键字');
          }
      },
      // 检测输入的是手机号还是银行卡
      async getWhichNumber(){
        let card = this.card;
        return new Promise(function(resolve, reject){
            getWhichNumber()({
                card:card
            }).then(res=>{
                if(res.code===0&&res.result){
                    console.log('这里');
                    resolve(res.result)
                }
            })
        });
      },
      // 成为会员
      beVip(){
          beVip()({
              card:this.card
          }).then(res=>{
              console.log(res);
          })
      },
      // 查看详情
      detailHandle(obj){
            // this.$router.push({ name: 'rentdetail', params: { 
            //     orderId: obj.porderID,
            //     isBack:obj.preturnTime?true:false
            // }})
        //   console.log(orderid)
        //   porderID:item.porderID,preturnTime:item.preturnTime
          if(obj.preturnTime){
              // 退还详情
            this.$router.push({ name: 'history', params: { 
                card: obj.porderID 
            }})
          }else{
              // 租用详情
            this.$router.push({ name: 'history', params: { 
                card: obj.porderID 
            }})
          }
         
      },
      // 加载数据
        infiniteHandler($state) {
            if($state){
                this.getTradesHandle().then(data=>{
                        console.log(data);
                        //  分页效果
                        // if (data.length>0) { 
                        //     this.page += 1;
                        //     this.list.push(...data);
                        //     $state.loaded();
                        // }
                        // else {
                        //     $state.complete();
                        // }
                        //         // 不分页效果
                        this.list={...data};
                        $state.loaded();
                        $state.complete();
                })
            }
        },
        async getTradesHandle(){
            let sendData ={
                card:this.card
            };
            if(this.dayTime){
                sendData['dayTime']=this.dayTime+'';
            }
           return await getTrades()(sendData).then(res=>{
                console.log(res);
                if(res.code==0){
                    let data = res.tradeList.buyLists;
                    let sendData = (data&&data.length>0)?[...data]:[];
                    console.log(sendData);
                    return Promise.resolve(
                        sendData
                    )
                }
            }).catch(err=>{
                return Promise.resolve(
                    []
                )
            })
        },
        // 开始搜索
        searchHandle(dayTime){
            this.page=1;
            this.dayTime = dayTime;
            this.infiniteId += 1;
        }
  },
  created(){

  }
}
</script>
