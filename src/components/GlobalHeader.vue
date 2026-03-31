<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">图多多云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown placement="bottomRight">
              <a-space :size="8" align="center" style="cursor: pointer">
                <CodeOutlined style="font-size: 16px" />
                <span>{{ loginUserStore.loginUser.userName ?? '无名' }}</span>
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <router-link to="/user/profile">
                      <SettingOutlined />
                      个人资料
                    </router-link>
                  </a-menu-item>
                  <a-menu-item>
                    <router-link to="/my_space">
                      <UserOutlined />
                      我的空间
                    </router-link>
                  </a-menu-item>
                  <a-menu-item key="logout" @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div v-else>
            <a-button type="primary" size="small" @click="goToLogin">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  CodeOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { userLogoutUsingPost } from '@/api/userController'
import { HEADER_MENU_CONFIG } from '@/access/headerMenuConfig'
import { canAccess } from '@/access/checkAccess'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const route = useRoute()

const goToLogin = () => {
  router.push('/user/login')
}

const buildMenuItems = (): MenuProps['items'] => {
  const loginUser = loginUserStore.loginUser
  return HEADER_MENU_CONFIG.filter((m) => canAccess(loginUser, m.access)).map((m) => {
    const item: NonNullable<MenuProps['items']>[number] = {
      key: m.key,
      label: m.label,
      title: m.title,
    }
    if (m.key === '/') {
      item.icon = () => h(HomeOutlined)
    }
    return item
  })
}

const items = computed<MenuProps['items']>(() => buildMenuItems())

const doLogout = async () => {
  try {
    const res = await userLogoutUsingPost()
    if (res.data.code === 0) {
      loginUserStore.setLoginUser({
        userName: '未登录',
      })
      message.success('退出登录成功')
      await router.push('/user/login')
    } else {
      message.error('退出登录失败，' + res.data.message)
    }
  } catch (error) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  }
}

const current = ref<string[]>([route.path])
router.afterEach((to) => {
  current.value = [to.path]
})

const doMenuClick = ({ key }: { key: string }) => {
  if (key !== 'others') {
    router.push({
      path: key,
    })
  }
}
</script>

<style scoped>
#globalHeader {
  background: #fff;
}

#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #000;
  font-size: 18px;
  font-weight: 500;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-login-status {
  display: flex;
  align-items: center;
  height: 100%;
}

.user-login-status span {
  color: #000;
  font-size: 14px;
}

#globalHeader :deep(.ant-menu) {
  background: transparent;
  border-bottom: none;
}

#globalHeader :deep(.ant-menu-item) {
  color: rgba(0, 0, 0, 0.85);
}

#globalHeader :deep(.ant-menu-item:hover) {
  color: #1890ff;
}

#globalHeader :deep(.ant-menu-item-selected) {
  color: #1890ff;
}
</style>
