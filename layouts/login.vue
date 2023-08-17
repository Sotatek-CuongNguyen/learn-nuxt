<template>
  <div class="container">
  <slot />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.container {
  background-image: url('https://plus.unsplash.com/premium_photo-1664439520386-a4ab727cb219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80');
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