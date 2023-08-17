<template>
  <div class="common-layout">
    <el-container class="wrapper">
      <!-- <el-header>
        Header main
      </el-header> -->
      <header-main />
      <el-container class="container">
        <el-aside width="300px" class="left_side">Aside</el-aside>
        <el-main class="right_side">Main</el-main>
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
    background: rgb(2, 0, 36);
    background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(13, 255, 77, 0.6587009803921569) 0%, rgba(0, 212, 255, 1) 94%);
    height: 100%;
  }

  .right_side {
    background-color: #e0e0e0;
    height: 100%;
  }
}
</style>