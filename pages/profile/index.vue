<template>
  <CommonContainer>
    <p>PROFILE</p>
    <div class="profile_content">
      <div class="profile_content__left">
        <img
          src="https://previews.123rf.com/images/meysye/meysye1904/meysye190400004/121250282-male-silhouette-avatar-default-avatar-profile-picture-photo-placeholder.jpg"
          alt="hey" class="profile_content__left_image" />
        <p class="profile_content__left_text">{{ user.name }}</p>
        <p class="profile_content__left_text">{{ user.role }}</p>
      </div>
      <div class="profile_content__right">
        <div class="profile_content__right_item" v-for="item in UserData">
          <div class="profile_content__right_item_label">{{ item.title }}</div>
          <div class="profile_content__right_item_value">{{ item.value }}</div>
        </div>
        <div class="profile_content__right_btn">
          <el-button type="primary" @click="handleOpen">Edit</el-button>
        </div>
      </div>
    </div>
  </CommonContainer>
  <ProfileModalEditProfile :open="dialogVisible" @cancel="handleCancel" />
</template>
<script setup lang="ts">
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
definePageMeta({
  layout: "main",
});
const profile = useProfile()
const user: ComputedRef<IProps> = computed<IProps>(() => {
  return profile.user
})
console.log("PPP", profile.user)
const UserData  = ref<any>([
    {
      title: 'Email',
      value: profile.user.email
    },
    {
      title: 'Date Of Birth',
      value: profile.user.dob
    },
    {
      title: 'Phone Number',
      value: profile.user.phone_number
    },
    {
      title: 'Note',
      value: profile.user.note
    },
    {
      title: 'Created At',
      value: !profile.user.created_at ? "" : new Date(profile.user.created_at).toLocaleDateString('us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    {
      title: 'Updated At',
      value: !profile.user.updated_at ? "" : new Date(profile.user.updated_at).toLocaleDateString('us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  ])
const dialogVisible = ref<boolean>(false)
const handleCancel = () => {
  dialogVisible.value = false
}
const handleOpen = () => {
  dialogVisible.value = true
}
watch(dialogVisible, () => {
  console.log("dialogVisible", dialogVisible.value)
})
watch(user, function () {
  console.log('value changes detected', UserData);
  UserData.value = [
    {
      title: 'Email',
      value: user.value.email
    },
    {
      title: 'Date Of Birth',
      value: user.value.dob
    },
    {
      title: 'Phone Number',
      value: user.value.phone_number
    },
    {
      title: 'Note',
      value: user.value.note
    },
    {
      title: 'Created At',
      value: !user.value.created_at ? "" : new Date(user.value.created_at).toLocaleDateString('us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    {
      title: 'Updated At',
      value: !user.value.updated_at ? "" : new Date(user.value.updated_at).toLocaleDateString('us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
  ]
});
</script>
<style lang="scss">
.profile_content {
  display: flex;
  background-color: #cccccc36;
  padding: 20px 0;
  border-radius: 20px;

  &__left {
    width: 40%;
    text-align: center;
    border-radius: 60%;

    &_text {
      font-weight: bold;
    }

    &_image {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      border: 1px solid #dfdede;
      -webkit-box-shadow: -1px -6px 54px -21px rgba(0, 0, 0, 0.85);
      -moz-box-shadow: -1px -6px 54px -21px rgba(0, 0, 0, 0.85);
      box-shadow: -1px -6px 54px -21px rgba(0, 0, 0, 0.85);
    }
  }

  &__right {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    justify-content: center;

    &_item {
      display: flex;
      height: 40px;
      border-bottom: 1px solid #dfdede;
      align-items: center;
      padding: 0 10px;

      &:last-child {
        border-bottom: none;
      }

      &_label {
        width: 150px;
        border-right: 2px solid #dfdede;
      }

      &_value {
        padding: 0 0 0 10px;
      }
    }

    &_btn {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>