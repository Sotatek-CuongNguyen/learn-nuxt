<script setup lang="ts">
import { useAuth } from '~/store/auth'
import { FormInstance, FormRules } from 'element-plus';
const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["ok", "cancel", "update:open"]);
const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("cancel");
  },
});
const auth = useAuth()
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  old_password: string
  password: string
  password_confirmation: string
}
const ruleForm = reactive<RuleForm>({
  old_password: '',
  password: '',
  password_confirmation: '',
})

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (ruleForm.password_confirmation !== "") {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.validateField("password_confirmation", () => null);
  }
  callback();
};
const validateResendPassword = (_rule: any, value: any, callback: any) => {
  if (value !== ruleForm.password) {
    callback(new Error(("Password and password confirmation does not match")));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<RuleForm>>({
  old_password: [
    { required: true, message: 'Please input old password', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 7, max: 20, message: 'Length should be 3 to 5', trigger: 'blur' },
    { validator: validatePassword, trigger: "change" },
  ],
  password_confirmation: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 7, max: 20, message: 'Length should be 3 to 5', trigger: 'blur' },
    { validator: validateResendPassword, trigger: "change" },

  ],
})
const handleCancel = () => {
  emit("cancel")
}
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    console.log("ruleForm", ruleForm)
    if (valid) {
      console.log('submit!', fields)
      console.log("valid", valid)
      auth.changePassword(ruleForm).then((res:any)=>{
        showMessage('success', "CHANGE PASSWORD SUCCESS")
        setTimeout(()=>{
          emit("cancel")
        },500)

      }).catch((err:any) => {
        console.log("ERR", err)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <el-dialog v-model="open" title="Change Password" width="30%" :close-on-click-modal="false" :close="handleCancel" >
    <el-form label-position="top" label-width="100px" ref="ruleFormRef" :rules="rules" :model="ruleForm"
      style="width: 100%">
      <el-form-item label="Old Password" required class="text_field">
        <el-input v-model="ruleForm.old_password" type="password" />
      </el-form-item>
      <el-form-item label="New Password" required class="text_field">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item label="Password Confirmation" required class="text_field">
        <el-input v-model="ruleForm.password_confirmation" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Confirm
        </el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>

<style lang="">

</style>