<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Watermelon,
  Pear
} from '@element-plus/icons-vue'
const route = useRoute()

const MenuItem = [
  {
    key: "1",
    icon: Watermelon,
    path: "/home",
    label: "Home"
  },
  {
    key: "2",
    icon: Pear,
    path: "/jobs",
    label: "Jobs"
  }
]

const defaultActive = computed(() => {
  const menu = MenuItem.find((item: any) => {
    return item.path === route.path
  })
  return menu?.key
})
</script>
<template>
  <el-row class="">
    <el-col>
      <el-menu active-text-color="#ffd04b" background-color="transparent" class="sidebar_container"
        :default-active="defaultActive" text-color="#fff">
        <el-link v-for="menu in MenuItem" :href="menu.path" type="default" class="sidebar_item_link">
          <el-menu-item :index="menu.key" class="sidebar_item">
            <el-icon>
              <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.label }}</span>
          </el-menu-item>
        </el-link>
      </el-menu>
    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
.sidebar_container {
  width: 100%;

  .sidebar_item {
    width: 300px !important;

    &_link {
      color: inherit;
    }

  }
}</style>
