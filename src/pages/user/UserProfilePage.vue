<template>
  <div id="userProfilePage" class="profile-wrap">
    <a-card title="个人资料" :bordered="false">
      <a-form
        :model="formState"
        layout="vertical"
        style="max-width: 520px"
        @finish="onSubmit"
      >
        <a-form-item label="账号">
          <a-input v-model:value="formState.userAccount" disabled />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model:value="formState.userPhone" disabled placeholder="注册时绑定" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="formState.userEmail" disabled placeholder="注册时绑定" />
        </a-form-item>
        <a-form-item
          label="昵称"
          name="userName"
          :rules="[{ required: true, message: '请输入昵称' }]"
        >
          <a-input v-model:value="formState.userName" placeholder="用户昵称" allow-clear />
        </a-form-item>
        <a-form-item label="头像 URL" name="userAvatar">
          <a-input v-model:value="formState.userAvatar" placeholder="图片地址" allow-clear />
        </a-form-item>
        <a-form-item v-if="formState.userAvatar" label="预览">
          <a-image :src="formState.userAvatar" :width="120" />
        </a-form-item>
        <a-form-item label="个人简介" name="userProfile">
          <a-textarea
            v-model:value="formState.userProfile"
            placeholder="介绍一下自己"
            :rows="4"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="submitting">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { updateMyUserUsingPost } from '@/api/userController'
import { useLoginUserStore } from '@/stores/useLoginUserStore'

const loginUserStore = useLoginUserStore()
const submitting = ref(false)

const formState = reactive({
  userAccount: '',
  userPhone: '',
  userEmail: '',
  userName: '',
  userAvatar: '',
  userProfile: '',
})

const syncFromStore = () => {
  const u = loginUserStore.loginUser
  formState.userAccount = u?.userAccount ?? ''
  formState.userPhone = u?.userPhone ?? ''
  formState.userEmail = u?.userEmail ?? ''
  formState.userName = u?.userName ?? ''
  formState.userAvatar = u?.userAvatar ?? ''
  formState.userProfile = u?.userProfile ?? ''
}

onMounted(async () => {
  await loginUserStore.fetchLoginUser()
  syncFromStore()
})

const onSubmit = async () => {
  submitting.value = true
  try {
    const res = await updateMyUserUsingPost({
      userName: formState.userName,
      userAvatar: formState.userAvatar,
      userProfile: formState.userProfile,
    })
    if (res.data.code === 0) {
      message.success('保存成功')
      await loginUserStore.fetchLoginUser()
      syncFromStore()
    } else {
      message.error(res.data.message ?? '保存失败')
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.profile-wrap {
  max-width: 720px;
  margin: 24px auto;
  padding: 0 16px;
}
</style>
