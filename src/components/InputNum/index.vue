<template>
<div style="width:100%">
    <div class='input' @click="numVisible = true" placeholder='请输入文字' v-html="searchHtml">
        <span>
            <span class="split-line"></span>
        </span>
    </div>
    <van-number-keyboard
    :show="numVisible"
    extra-key="清空"
    close-button-text="确定"
    @input="onInput"
    @delete="onDelete"
    @close="onClose"
    />
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
    animation: blink 1s infinite steps(1, start);
}
/*这里设置动画blink*/
@keyframes blink {
    0%, 100% {
        background-color: #000;
        color: #aaa;
    }
    50% {
        background-color: #bbb; /* not #aaa because it's seem there is Google Chrome bug */
        color: #000;
    }
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
            this.currentVal=value;
            // this.searchHtml='<span>'+value+'</span>'
        }
    },
    created(){
        this.currentVal=this.value;
        this.searchHtml='<span>'+this.value+'</span><span class="split-line">'
    },
    // computed: {
    //     currentVal(){
    //         return this.value;
    //     }
    // },
    methods:{
        onInput(key) {
            if (key == "清空") {
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

