<template>
    <div style="width:100%;height:100%;">
            <!-- <van-field 
            clearable type='tel' 
            v-model="currentVal" 
            :placeholder="placeholder" 
            readonly
            @click="numVisible = true"
            /> -->
            <div class='input' @click="numVisible = true" placeholder='请输入文字' v-html="searchHtml">
                <span>
                    <span class="split-line"></span>
                </span>
            </div>
            <van-popup class="popup" v-model="numVisible" position="bottom" :overlay="false">
                <!-- <div class="popup-header">
                    <span class="clear" @click="onClear">清空</span>
                    <span class="sure" @click="onClose">确定</span>
                </div> -->
                <van-number-keyboard
                :show="numberKeyVisible"
                extra-key="清空"
                close-button-text="确定"
                @input="onInput"
                @delete="onDelete"
                @close="onClose"
                />
            </van-popup>
    </div>
</template>
<style lang="scss">
.popup-header{
    display: fixed;
    flex-direction: row;
    position: absolute;
    left: 0;
    position: fixed;
    bottom: 216px;
    z-index: 999;
    right: 0;
    background:#fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span{
        display: inline-block;
        padding: .05rem .1rem;
        
        &.clear{
            color:red;
        }
        &.sure{
            color:green;
        }
    }
}
 .input{
    width:100%;
    height: .4rem;
    line-height:1;
    font-size:14px;
    // border:1px solid #ddd;
    position: relative;
    display: flex;
    box-sizing: border-box;
}
.input:empty::before {
    content: attr(placeholder);
    display: flex;
    align-items: center;
}
.input .split-line{
    width: 1px;
    height: .2rem;
    background: #333;
    margin-top: .1rem;
    right: 0;
    top: 0;
}
.input span{
    display: flex;
    align-items: center;
}

   

</style>

<script>
export default {
    props:{
        placeholder:{
            type:[String,Number],
            value:""
        },
        value:{
            type:[String,Number],
            value:""
        }
    },
    data(){
        return {
            numberKeyVisible:true,
            numVisible:false,
            currentVal:'',
            searchHtml:''
        }
    },
    watch:{
        value(value){
            this.currentVal=value
        }
    },
    // computed: {
    //     currentVal(){
    //         return this.value;
    //     }
    // },
    methods:{
        onInput(key) {
            if (key == "清空") {
                this.numVisible = false;
                this.currentVal=this.defautVal;
                // this.$emit("input","")
                this.onClear();
                return false;
            }
            let newVal=this.currentVal;
            if(this.currentVal!=undefined){
                newVal=newVal+key;
            }else{
                newVal=key
            }
            this.searchHtml='<span>'+newVal+'</span><span class="split-line"></span>'
            this.$emit("input",newVal)
        },
        onDelete() {
            let newVal=this.currentVal;
            newVal=newVal.substr(0, newVal.length - 1);
            this.searchHtml='<span>'+newVal+'</span><span class="split-line"></span>'
            this.$emit("input",newVal)
        },
        onClose(){
            this.numVisible = false;
        },
        onClear(){
            this.searchHtml='<span></span><span class="split-line"></span>'
            this.$emit("input","");
        }
    }   
}
</script>

