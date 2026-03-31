<template>
  <div class="no-auth-page">
    <a-result status="403" title="无权限访问" sub-title="您没有权限查看该页面，如需帮助请联系管理员。">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="goHome">返回首页</a-button>
          <a-button @click="goBack">返回上一页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => router.push('/')
const goBack = () => router.back()
</script>

<style scoped>
.no-auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 24px;
}
</style>
