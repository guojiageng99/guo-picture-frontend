<template>
  <div id="globalSider">
    <a-layout-sider width="200" breakpoint="lg" collapsed-width="0">
      <a-menu
        v-model:selectedKeys="current"
        mode="inline"
        :items="menuItems"
        @click="doMenuClick"
      />
    </a-layout-sider>
  </div>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { PictureOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { SIDER_MENU_CONFIG } from '@/access/siderMenuConfig'
import { canAccess } from '@/access/checkAccess'

const iconByKey: Record<string, () => ReturnType<typeof h>> = {
  '/': () => h(PictureOutlined),
  '/my_space': () => h(UserOutlined),
  '/team_space': () => h(TeamOutlined),
}

const loginUserStore = useLoginUserStore()
const router = useRouter()
const route = useRoute()

const menuItems = computed(() => {
  const u = loginUserStore.loginUser
  return SIDER_MENU_CONFIG.filter((m) => canAccess(u, m.access)).map((m) => ({
    key: m.key,
    label: m.label,
    icon: iconByKey[m.key],
  }))
})

const current = ref<string[]>([])
router.afterEach((to) => {
  current.value = [to.path]
})

const doMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}
</script>

<style scoped>
#globalSider .ant-layout-sider {
  background: none;
}
</style>
