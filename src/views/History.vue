<template>
  <div class="page history-page">
       <div class="search-top-fixed search-top" ref="search-top">
            <div class="search-box">
                <!-- <input-num  :value="card" @input="onInput"></input-num> -->
                <van-field 
                clearable type='tel' 
                v-model="card" 
                @input="inputNum" 
                placeholder="请输入用于租用的手机号/银行卡号进行查询" 
                />
                <img @click="searchHandle()" class="icon" src="../static/img/icon_search@3x.png" alt="">
            </div>
          
       </div>
       
        
        <!-- <div class="search-place"></div> -->
         <div class="search-top" ref="search-tip-grop">
                    <div class="search-tip">
                        {{tipText}}租用退还记录
                    </div>
                        <!-- <div class="search-tip-grop">
                            <div v-for="item in tips" :key="item.code" @click="searchHandle(item.code)" :class="['tip',{selected1:dayTime==item.code?true:false}]">{{item.label}}</div>
                        </div> -->
                    <div class="search-tip-grop">
                        <van-tabs :swipeable='true' title-active-color="#f6f6f6" background="#f6f6f6" :border='false' :ellipsis='false' :line-width='0'>
                        <van-tab v-for="item in tips" :key="item.code">
                                <div slot="title">
                                    <div @click="searchHandle(item.code)" :class="['tip',{selected:dayTime==item.code?true:false}]">{{item.label}}</div>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>
        <div class="main-container">
                 <scroller style="background:tranparent;"
                        :on-refresh="refresh"
                        :on-infinite="infinite"
                        ref="loadmore">
                                <div class="list-container">
                                    <div v-for="(item,index) in list" :key="index" :class="['item',item.preturnTime?'type2':'type1']">
                                        <!-- 查看租用start -->
                                        <template v-if="!(item.preturnTime)">
                                            <div @click="detailHandle({porderID:item.porderID,page:'rent'})" class="item-header">
                                                查看租用详情
                                                <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                                            </div>
                                            <div class="item-body">
                                                <ul>
                                                    <li>
                                                        <div class="label">租用時間:</div>
                                                        <div class="content">{{item.pborrowTime}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">押金金額:</div>
                                                        <div class="content">{{item.ppriceYajin |moneyFormatCN(true)}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">租金單價:</div>
                                                        <div class="content">{{item.pprice |moneyFormatCN(true)}}</div>
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
                                        </template>
                                        
                                        <!-- 查看退还详情start -->
                                        <template v-else>
                                             <div @click="detailHandle({porderID:item.porderID,page:'rent'})" class="item-header item-header2">
                                                查看租用详情
                                                <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                                            </div>
                                            <div class="item-body">
                                                <ul>
                                                    <li>
                                                        <div class="label">租用時間:</div>
                                                        <div class="content">{{item.pborrowTime}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">押金金額:</div>
                                                        <div class="content">{{item.ppriceYajin |moneyFormatCN(true)}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">租金單價:</div>
                                                        <div class="content">{{item.pprice |moneyFormatCN(true)}}</div>
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
                                            <div @click="detailHandle({porderID:item.porderID,page:'back'})" class="item-header">
                                                查看退还详情
                                                <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                                            </div>
                                            <div  class="item-body">
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
                                                        <div class="content">{{item.pprice |moneyFormatCN(true)}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">租金:</div>
                                                        <div class="content">{{item.ppayPrice |moneyFormatCN(true)}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">押金金額:</div>
                                                        <div class="content">{{item.ppriceYajin |moneyFormatCN(true)}}</div>
                                                    </li>
                                                    <li>
                                                        <div class="label">退還金額:</div>
                                                        <div class="content">{{item.repayAmount |moneyFormatCN(true)}}</div>
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
                                        </template>
                                        <!-- 查看退还详情end -->
                                    </div>
                                </div>
                  </scroller>
        </div>
      
       <div class="footer-place"></div>
       <div class="vip-tip">
           首七天免费租借
       </div>
       <div class="search-footer">
           <div class="m-button">
                <button v-waves @click="addBankCard" class="button">
                    添加銀行卡
                </button>
           </div>
           <div class="split-line"></div>
           <div class="m-button">
                <button v-waves class="button" @click="addPhone">添加手機號</button>
           </div>
           <div class="split-line"></div>
          <div class="m-button">
                <button v-waves class="button" @click="beVip">成為會員</button>
          </div>
       </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/history.scss);
</style>
<script>
import InputNum from "@src/components/InputNum"
import storage from "@src/common/js/storage.js"
import { mapState, mapActions } from "vuex";
import encrypt from "@src/common/js/encrypt.js"
import waves from "@src/common/js/waves";
import { getTrades,beVip,getWhichNumber,SignKey } from "@src/apis";
import { setTimeout } from 'timers';
export default {
  directives:{waves},
  name: 'history',
  components: {
      InputNum
    //   InfiniteLoading
    // Tab, Tabs
  },
  data(){
      return {
        numVisible:true,
        dayTime:'',
        card:this.$route.params.card,
        registerVip:this.$route.params.registerVip,
        page: 1,
        list: [],
        infiniteId: +new Date(),
        allLoaded:false,
        tips:[
        // {
        //     label:'全部',
        //     code:''
        // },
        {
            label:'最近7天',
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
  computed:{
        ...mapState({
            // 首页获取来的数据列表
            HOME_TRADES: state => state.HOME_TRADES,
        }),
     tipText(){
          if(this.dayTime){
               return this.tips.find(item=>item.code==this.dayTime)['label']
          }else{
              return '全部'
          }
     }
  },
  methods:{
        ...mapActions([
         'CHANGE_KEEPALIVES',
         'CHANGE_HOME_TRADES'
        ]),
         onInput(ev){
          this.card=ev
        },
        inputNum(ev){
            let oldvalue= ev;
            let newval = oldvalue.replace(/\s/g, '').replace(/[^\d]/g, '');
            this.card=newval;
        },
         // 开始搜索
        searchHandle(dayTime){
            this.page=1;
            this.dayTime = dayTime;
            this.allLoaded=false;
            this.list=[];
            this.$refs.loadmore.finishInfinite(false);
        },
        refresh(done) {
            this.allLoaded = false;
            this.getTradesHandle().then(data=>{
                this.list=[...data];
                this.isAllLoaded([...data])
                setTimeout(() => {
                    done()
                })
            })
        },
        infinite(done) {
            if(this.allLoaded){
                done(true);
                return 
            }
            let HOME_TRADES = this.HOME_TRADES;
            if(HOME_TRADES.length>0){
                setTimeout(()=>{
                    this.list=[...HOME_TRADES];
                    this.isAllLoaded([...HOME_TRADES]);
                    this.CHANGE_HOME_TRADES([])
                    setTimeout(() => {
                        done()
                    })
                },200)
            }else{
                this.getTradesHandle().then(data=>{
                    this.list=[...data];
                    this.isAllLoaded([...data]);
                    this.CHANGE_HOME_TRADES([])
                    setTimeout(() => {
                        done()
                    })
                })
            }
           
        },
        isAllLoaded(data) {
            this.allLoaded = true;
        },
      //如果有退还记录才可以进行接下来的操作
        haveTrades(){
            return new Promise((resolve, reject)=>{
                let sendData = encrypt.EncryptObj({
                    card:this.card,
                },['card']);
                getTrades()({
                    ...sendData
                }).then(res=>{
                    let data = res.tradeList.buyLists;
                    if(data&&data.length>0){
                        resolve(res);
                    }else{
                        this.$toast('没有该号码的退还记录~');
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
                        if(getWhichNumber.hasPhone!='true'){
                            let queryData ={
                                card:card
                            }
                            storage.saveStorage('queryData',JSON.stringify(queryData))
                            this.$router.push({ name: 'addphone', params:queryData})
                        }else{
                            // 查询的是手机号,直接进入手机号绑卡
                            _this.$toast('该手机号已经添加过了');
                        }
                    
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
                            let queryData={ 
                                card:card, 
                                phone:getWhichNumber.phone,
                                hasPhone:'TRUE'
                            }
                            storage.saveStorage('queryData',JSON.stringify(queryData))
                            this.$nextTick(()=>{
                                 this.$router.push({ name: 'addcard', params: queryData})
                            })
                        }else{
                            //没有手机号 进入手机号银行双卡绑定
                            let queryData={
                                card:card,
                                hasPhone:'FALSE',
                            }
                            storage.saveStorage('queryData',JSON.stringify(queryData))
                            this.$nextTick(()=>{
                                this.$router.push({ name: 'addcardphone', params: queryData})
                            })
                        }
                    }else{
                        // 查询的是手机号,直接进入手机号绑卡
                        let queryData={
                            card:card,
                            hasPhone:'TRUE',
                            phone:getWhichNumber.phone||card,
                        }
                        storage.saveStorage('queryData',JSON.stringify(queryData))
                        this.$router.push({ name: 'addcard', params: queryData})
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
                let sendData = encrypt.EncryptObj({
                    card:card,
                },['card']);
                getWhichNumber()({
                    ...sendData
                }).then(res=>{
                    if(res.code===0&&res.result){
                        resolve(res.result)
                    }
                })
            });
        },
      // 成为会员
        async beVip(){
            let _this = this;
            let card = this.card;
            if(card){
                let haveTrades = await this.haveTrades();
                if(haveTrades){ // 有退还记录的才会有接下来的操作
                    if(!haveTrades.tradeList.member){
                        // 没有注册过会员的可注册会员,注册过的就不用了
                        let sendData = encrypt.EncryptObj({
                        card:this.card,
                        membership:true
                        },['card']);
                        beVip()(sendData).then(res=>{
                            this.$toast(`恭喜，您已成功註冊為會員!`);
                        })
                    }else{
                        this.$toast.success(`该号码已是会员`);
                    }
                    
                }
            }else{
                _this.$toast('请先输入搜索关键字');
            }
        },
      // 查看详情
        detailHandle(obj){
          if(obj.page=='rent'){
            this.$router.push({ name: 'rentdetail', params: { 
                orderId: obj.porderID,
                card:this.card
            }})
          }else if(obj.page=='back'){
            this.$router.push({ name: 'backdetail', params: { 
                orderId: obj.porderID,
                card:this.card
            }})
          }
        },
        async getTradesHandle(){
            let sendData ={
                card:this.card
            };
            if(this.dayTime){
                sendData['dayTime']=this.dayTime+'';
            }
            sendData = encrypt.EncryptObj({
                ...sendData
            },['card']);
            return await getTrades()(sendData).then(res=>{
                // console.log(res);
                if(res.code==0){
                    let data = res.tradeList.buyLists;
                    let sendData = (data&&data.length>0)?[...data]:[];
                    // console.log(sendData);
                    return Promise.resolve(
                        sendData
                    )
                }
            }).catch(err=>{
                return Promise.resolve(
                    []
                )
            })
        }
    },
    activated(){
        storage.removeStorage('queryData');
    },
    created(){
        storage.removeStorage('queryData');
    }
}
</script>
