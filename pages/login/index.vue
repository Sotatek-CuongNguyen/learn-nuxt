<script setup lang="ts">
import { useAuth } from '~/store/auth'
import type { FormInstance, FormRules } from 'element-plus'
interface RuleForm {
  username: string
  password: string
}
definePageMeta({
  layout: "login",
});

const auth = useAuth()

const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 7, max: 20, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', fields)
      console.log("valid", valid)
      auth.login(ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>
<template>
  <div class="content_container">
    <p class="form_title">Login</p>
    <el-form label-position="top" label-width="100px" ref="ruleFormRef" :rules="rules" :model="ruleForm"
      style="max-width: 460px">
      <el-form-item label="Email" required class="text_field">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="Password" required class="text_field">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Login
        </el-button>
        <div class="signup">
          <span>Don't have an account ?</span>
        <el-link type="primary" href="/register" style="font-weight: bold;"> Sign Up now.</el-link>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
.content_container {
  width: 525px;
  /* height: 500px; */
  margin: auto;
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 3px 2px 77px 16px rgba(0, 0, 0, 0.83);
  -webkit-box-shadow: 3px 2px 77px 16px rgba(0, 0, 0, 0.83);
  -moz-box-shadow: 3px 2px 77px 16px rgba(0, 0, 0, 0.83);

  .form_title {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .form {
    display: flex;
    flex-direction: column;

  }

  .text_field {
    font-weight: bold;
  }
  .signup{
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
}
</style>