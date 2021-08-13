<template>
  <div class="screen-cell">
    <div class="cell-title">{{ cellName }}</div>
    <div class="cell-solt" :style="'width:' + slotWidth + 'px'">
      <slot name="cell-compontent" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScreenCell',
  props: {
    cellName: {
      type: String,
      default: '默认表头'
    },
    slotWidth: {
      type: String,
      default: '200'
    }
  }
}
</script>
<style lang="scss" scoped>
.screen-cell {
  display: flex;
  align-items: center;
  width: 100%;
  .cell-title {
    color: #909399;
    width: 120px;
    font-size: 14px;
  }
  .cell-solt {
    display: flex;
    margin-left: 10px;
    width: 200px;
  }
}
</style>
