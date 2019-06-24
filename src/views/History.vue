<template>
  <div class="page history-page">
       <div class="search-top-fixed search-top">
            <div class="search-box">
                <input v-model="card" type="text" placeholder="请输入用于租用的手机号/银行卡号进行查询">
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
                
                <div @click="detailHandle(item.porderID)" class="item-header">
                    {{item.preturnTime?'查看退还详情':'查看租用详情'}}
                    <img class="icon" src="../static/img/icon_right@3x.png" alt="">
                </div>
                <!-- 查看租用start -->
                <div v-if="item.preturnTime" class="item-body">
                    <ul>
                        <li>
                            <div class="label">租用时间:</div>
                            <div class="content">{{item.pborrowTime}}</div>
                        </li>
                        <li>
                            <div class="label">押金金额:</div>
                            <div class="content">{{item.ppriceYajin}}</div>
                        </li>
                        <li>
                            <div class="label">租金单价:</div>
                            <div class="content">{{item.pprice}}</div>
                        </li>
                        <li>
                            <div class="label">手机号:</div>
                            <div class="content">{{item.pphone}}</div>
                        </li>
                        <li>
                            <div class="label">唯一查询号:</div>
                            <div class="content">{{item.popenID || item.pphone}}</div>
                        </li>
                        <li>
                            <div class="label">机柜号:</div>
                            <div class="content">{{item.pdeviceID}}</div>
                        </li>
                        <li>
                            <div class="label">送电宝宝号:</div>
                            <div class="content">{{item.pbatteryID}}</div>
                        </li>
                    </ul>
                </div>
                <!-- 查看退还详情start -->
                <div v-else class="item-body">
                    <ul>
                        <li>
                            <div class="label">租用时间:</div>
                            <div class="content">{{item.pborrowTime}}</div>
                        </li>
                        <li>
                            <div class="label">退还时间:</div>
                            <div class="content">{{item.preturnTime}}</div>
                        </li>
                        <li>
                            <div class="label">租借时长:</div>
                            <div class="content">{{item.puseTime}}</div>
                        </li>
                        <li>
                            <div class="label">租金单价:</div>
                            <div class="content">{{item.pprice}}</div>
                        </li>
                        <li>
                            <div class="label">租金:</div>
                            <div class="content">{{item.ppayPrice}}</div>
                        </li>
                        <li>
                            <div class="label">押金金额:</div>
                            <div class="content">{{item.ppriceYajin}}</div>
                        </li>
                        <li>
                            <div class="label">退还金额:</div>
                            <div class="content">{{item.repayAmount}}</div>
                        </li>
                        <li>
                            <div class="label">机柜号:</div>
                            <div class="content">{{item.pdeviceID}}</div>
                        </li>
                        <li>
                            <div class="label">送电宝宝号:</div>
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
import { getTrades,beVip } from "@src/apis";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: 'history',
  components: {
      InfiniteLoading
  },
  data(){
      return {
        dayTime:'',
        card :this.$route.params.card,
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
      // 添加手机号
      addPhone(){
          this.$router.push({ name: 'addphone', params: { 
              
          }})
      },
      // 添加银行卡
      addBankCard(){
          this.$router.push({ name: 'addcard', params: { 
              
          }})
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
      detailHandle(orderid){
          console.log(orderid)
          this.$router.push({ name: 'history', params: { 
              card: this.card 
          }})
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
