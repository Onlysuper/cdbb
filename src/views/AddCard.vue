<template>
    <div class="page addcard-page">
        <div class="m-form-page">
            <div class="form-row">
                <div class="m-label">查詢手機號</div>
                <div class="item">
                    <div class="input-box no-back">
                       6216********0236
                    </div>
                </div>
            </div>
          
            <div class="form-row">
                <div class="label">銀行卡號</div>
                <div class="item">
                     <div class="input-box">
                        <input type="tel" placeholder="請輸入銀行卡號">
                     </div>
                </div>
            </div>
            <div class="form-row">
                <div class="label">有效期及CVV號</div>
                <div class="item">
                     <div class="input-box">
                          <input type="tel" placeholder="月/ 年（如0623）">
                     </div>
                      <div class="input-box item-s">
                           <input class="" type="tel" placeholder="卡背面CVV號">
                     </div>
                </div>
            </div>
            <div class="form-footer">
                <button class="back-but">添加銀行卡</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
  @import url(../static/sass/base.scss);
  @import url(../static/sass/formstyle.scss);
</style>


<script>
// @ is an alias to /src
export default {
  name: 'addcard',
  components: {
  }
}
</script>
