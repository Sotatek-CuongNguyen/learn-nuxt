<template>
  <div class="container">
  <slot />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.container {
  background-image: url('../assets/image/background2.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  height: 100vh;
}
</style>