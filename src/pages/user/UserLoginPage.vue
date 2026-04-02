<template>
  <div id="userLoginPage">
    <h2 class="title">图多多云图库 - 用户登录</h2>
    <div class="desc">企业级智能协同云图库</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度不能小于 8 位' },
        ]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userLoginUsingPost } from '@/api/userController'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { useUnreadMessageStore } from '@/stores/useUnreadMessageStore'
import { message } from 'ant-design-vue'

// 用于接受表单输入的值
const formState = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
})

const router = useRouter()
const route = useRoute()
const loginUserStore = useLoginUserStore()
const unreadStore = useUnreadMessageStore()

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const res = await userLoginUsingPost(values)
  // 登录成功，把登录态保存到全局状态中
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser()
    await unreadStore.refresh()
    message.success('登录成功')
    const redirect = route.query.redirect as string | undefined
    const safe =
      redirect &&
      redirect.startsWith('/') &&
      !redirect.startsWith('//') &&
      !redirect.includes('://')
        ? redirect
        : '/'
    router.push({
      path: safe,
      replace: true,
    })
  } else {
    message.error('登录失败，' + res.data.message)
  }
}


</script>

<style scoped>
#userLoginPage {
  max-width: 360px;
  margin: 100px auto;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 500;
}

.desc {
  text-align: center;
  color: #999;
  margin-bottom: 32px;
  font-size: 14px;
}

.tips {
  margin-bottom: 16px;
  color: #999;
  font-size: 13px;
  text-align: right;
}

.tips a {
  color: #1890ff;
  text-decoration: none;
}

.tips a:hover {
  text-decoration: underline;
}
</style>
