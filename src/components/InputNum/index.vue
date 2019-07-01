<template>
    <div style="width:100%;">
        <van-field 
            clearable type='tel' 
            v-model="currentVal" 
            :placeholder="placeholder" 
            readonly
            @click="numVisible = true"
            />
           <van-popup class="popup" v-model="numVisible" position="bottom" :overlay="false">
            <!-- <div class="popup-header">
                <span class="clear" @click="onClear">清空</span>
                <span class="sure" @click="onClose">确定</span>
            </div> -->
            <van-number-keyboard
            show="ture"
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
</style>

<script>
export default {
    props:{
        placeholder:{
            type:String,
            value:""
        },
        value:{
            type:String,
            value:""
        }
    },
    data(){
        return {
            numVisible:false,
        }
    },
    computed: {
        currentVal(){
            return this.value;
        }
    },
    methods:{
        onInput(key) {
            if (key == "清空") {
                this.numVisible = false;
                this.currentVal=this.defautVal;
                this.$emit("input","")
                return false;
            }
            if(key=='完成'){

            }
            let newVal=this.currentVal;
            if(this.currentVal!=undefined){
                newVal=newVal+key;
            }else{
                newVal=key
            }
            this.$emit("input",newVal)
        },
        onDelete() {
            let newVal=this.currentVal;
            newVal=newVal.substr(0, newVal.length - 1);
            this.$emit("input",newVal)
        },
        onClose(){
            this.numVisible = false;
        },
        onClear(){
            this.$emit("input","")
        }
    }
}
</script>

