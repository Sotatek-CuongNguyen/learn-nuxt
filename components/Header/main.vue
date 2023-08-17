<script setup lang="ts">
import {
  ArrowDown,
  User,
  Lock,
  SwitchButton

} from '@element-plus/icons-vue'
import { useAuth } from '~/store/auth';
import { useProfile } from '~/store/user';
 const Menu = [
  {
    label: "My Profile",
    action: "my_profile",
    icon: User
  },
  {
    label: "Change Password",
    action: "change_password",
    icon: Lock
  },
  {
    label: "Log Out",
    action: "logout",
    icon: SwitchButton
  }
 ]
const auth = useAuth()
 const handleAction = (action:any) =>{
  console.log("ACTION", action)
   if(action === 'logout'){
      auth.logout()
   }
 }
 const user = useProfile()
</script>
<template>
  <el-header class="header">
    <div class="header_left"></div>
    <div class="header_right">
      <div class="">PAGE</div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ user.user.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in Menu" :icon="item.icon" @click="handleAction(item.action)">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<style lang="scss" scoped>
.header {
  padding: 0;
  display: flex;
  &_left {
    width: 300px;
    background-color: #000;
    height: 100%;
  }

  &_right {
    width: calc(100% - 300px);
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
.el-dropdown-link{
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>