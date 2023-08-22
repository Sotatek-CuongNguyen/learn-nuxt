<template>
  <div class="box_container">
   <slot />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.box_container {
	width: calc(100% - 70px);
	height: 100%;
	margin: 0px 35px;
	border: 1.5px solid #f3f3f3;
	box-shadow: 0px 4px 100px rgb(202 202 202 / 20%);
	border-radius: 10px 10px 0px 0px;
	background-color: #fff;
	padding: 35px;
}

</style>