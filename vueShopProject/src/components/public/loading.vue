<template>
  <div class="loading">
    <img src="../../assets/pubulic/loading.svg" alt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba($color: #000000, $alpha: 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
      height: 1.25rem;
      width: 1.25rem;
  }
}
</style>