<!--
 * 发送验证码按钮组件
 * 
 * 指定时间参数 time:2
 * 指定文字参数 text : "发送验证码"
 * 指定点击事件的回调函数
-->

<template>
          <button class="back-but item-s" :class="{'timer-btn-active':timerBtnActiveClass}" @click="handleClick" @touchstart="timerBtnActiveClass = true" @touchend="timerBtnActiveClass = false" :disabled="disabled">
                    {{s}}
          </button>
</template>

<script>
export default {
  data() {
    return {
      disabled: false, //默认不disabled
      timerBtnActiveClass: false,
      s: this.text
    };
  },
  props: {
    cb: {
      type: Function,
      default: function() {
        console.info("请传入回调函数");
      }
    },
    time: {
      type: Number,
      default: 6,
      required: true
    },
    text: {
      type: String,
      default: "发送验证码"
    },
    textEnd: {
      type: String,
      default: "重新发送"
    }
  },
  methods: {
    handleClick() {
      this.cb();
    },
    //启动倒计时
    timer() {
      var num = this.time;
      var t = null;
      this.s = num + "秒";
      t = setInterval(() => {
        if (num == 0) {
          this.disabled = false;
          this.s = this.textEnd;
          clearInterval(t);
          return;
        }
        num--;
        this.s = num + "秒";
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.item-s{
    height: 0.4rem;
    line-height: 0.4rem;
    flex: 0 0 1.2rem;
    margin-left: .15rem;
    text-align: center;
}
.back-but{
    background: #FFE000;
    font-size: .14rem;
    color: #333333;
    border:0;
    font-weight: bold;
    border-radius: .05rem;
}
</style>
