<template>
  <div>
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@red: #d43c33;
h3 {
  border-left: 2px solid @red;
  font-size: 16px;
  line-height: 16px;
  padding-left: 15px;
  margin: 15px 0;
}
</style>