<script setup lang="ts">
import { useAuth } from '~/store/auth'
import type { FormInstance, FormRules } from 'element-plus'
import { ROLES } from "~/constant";
interface RuleForm {
  name: string
  password: string
  email: string
  role: string
}
definePageMeta({
  layout: "login",
});

const auth = useAuth()

const ruleForm = reactive<RuleForm>({
  name: '',
  email: '',
  password: '',
  role: "User",
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 7, max: 20, message: 'Length should be 3 to 5', trigger: 'blur' },
    { type: 'email', message: "Please input valid email", trigger: 'blur' }
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
      auth.register(ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>
<template>
  <div class="content_container">
    <p class="form_title">Register</p>
    <el-form label-position="top" label-width="100px" ref="ruleFormRef" :rules="rules" :model="ruleForm"
      style="max-width: 460px">
      <el-form-item label="Username" required class="text_field">
        <el-input v-model="ruleForm.name" aria-autocomplete="none" />
      </el-form-item>
      <el-form-item label="Email" required class="text_field">
        <el-input v-model="ruleForm.email" type="text" aria-autocomplete="none" />
      </el-form-item>
      <el-form-item label="Password" required class="text_field">
        <el-input v-model="ruleForm.password" type="password" aria-autocomplete="none" />
      </el-form-item>
      <el-form-item label="Role" required class="text_field">
        <el-radio-group v-model="ruleForm.role">
          <el-radio v-for="role in ROLES" :label="role.label" class="text_field">{{ role.title }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Register
        </el-button>
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
  background: #ececec4d;

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
    color: #000;
  }
}
</style>