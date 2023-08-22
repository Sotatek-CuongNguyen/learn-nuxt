<script setup lang="ts">

import { FormInstance, FormRules } from 'element-plus';
import { useProfile } from '~/store/user';
interface IProps {
  name: string
  dob: string
  note: string
  role: string
  phone_number: string
  email: string
  created_at: string
  updated_at: string
}
const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["ok", "cancel", "update:open"]);
const profile = useProfile()
const user: ComputedRef<IProps> = computed<IProps>(() => {
  return profile.user
})
watch(user, function () {
  console.log('value changes detected');
});

const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("cancel");
  },
});
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  name: string
  phone_number: string
  dob: string
  note: string
}
const ruleForm = reactive<RuleForm>({
  name: user?.value?.name,
  phone_number: user?.value?.phone_number,
  dob: user?.value?.dob,
  note: user?.value?.note
})


const rules = reactive<FormRules<RuleForm>>({
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
      profile.editProfile(ruleForm).then((res: any) => {
        showMessage('success', "CHANGE PROFILE SUCCESS")
        setTimeout(() => {
          emit("cancel")
        }, 500)
      })
      console.log("data", ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <el-dialog v-model="open" title="Change Password" width="30%" :close-on-click-modal="false" :close="handleCancel">
    <el-form label-position="top" label-width="100px" ref="ruleFormRef" :rules="rules" :model="ruleForm"
      style="width: 100%">
      <el-form-item label="Name" class="text_field">
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>
      <el-form-item label="Phone number" class="text_field">
        <el-input v-model="ruleForm.phone_number" type="text" />
      </el-form-item>
      <el-form-item label="Date of birth" class="text_date">
        <el-date-picker v-model="ruleForm.dob" type="date" placeholder="Pick a day" format="YYYY/MM/DD"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="Note" class="text_field">
        <el-input v-model="ruleForm.note" type="text" />
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

<style lang="scss" scope>
.text_date {
  width: 100%;

  div {
    width: 100% !important
  }
}
</style>