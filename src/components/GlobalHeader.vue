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
          <!-- 已登录：显示代码图标 + 用户名 + 下拉菜单 -->
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown placement="bottomRight">
              <a-space :size="8" align="center" style="cursor: pointer">
                <CodeOutlined style="font-size: 16px" />
                <span>{{ loginUserStore.loginUser.userName ?? '无名' }}</span>
              </a-space>
              <template #overlay>
                <a-menu>
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

          <!-- 未登录：显示登录按钮 -->
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
import { CodeOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { userLogoutUsingPost } from '@/api/userController'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const route = useRoute()

// 跳转到登录页面
const goToLogin = () => {
  router.push('/user/login')
}

// 菜单列表（顺序：主页、创建图片、用户管理、图片管理、空间管理）
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/add_picture',
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/admin/pictureManage',
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: '/admin/spaceManage',
    label: '空间管理',
    title: '空间管理',
  },
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (!menu || !menu.key) {
      return false
    }
    if (typeof menu.key === 'string' && menu.key.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const items = computed<MenuProps['items']>(() => filterMenus(originItems))

// 用户注销
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
    // 如果 API 不存在，直接清除登录状态
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  }
}

// 当前要高亮的菜单项
const current = ref<string[]>([route.path])
// 监听路由变化，更新高亮菜单项
router.afterEach((to) => {
  current.value = [to.path]
})

// 路由跳转事件
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
