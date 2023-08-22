<template>
  <div class="common-layout">
    <el-container class="wrapper">
      <!-- <el-header>
        Header main
      </el-header> -->
      <header-main />
      <el-container class="container">
        <el-aside width="300px" class="left_side">
          <side-bar />
        </el-aside>
        <el-main class="right_side">
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}

.container {
  background-color: #fffefe;
  height: calc(100vh - 60px);

  .left_side {
    background-image: linear-gradient(to bottom, #051937, #004c7f, #0085a5, #00bf90, #10f240);
    height: 100%;
  }

  .right_side {
    background-color: #e0e0e0;
    height: 100%;
  }
}
</style>