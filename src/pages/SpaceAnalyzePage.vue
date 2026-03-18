<template>
  <div id="spaceAnalyzePage">
    <a-page-header
      title="空间分析"
      :sub-title="spaceId ? `空间 ID: ${spaceId}` : '全部空间'"
      @back="router.back()"
    />
    <div style="margin: 24px 0" />
    <a-spin :spinning="false">
      <a-space direction="vertical" size="large" style="width: 100%">
        <SpaceUsageAnalyze :space-id="spaceIdStr" />
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :md="12">
            <SpaceCategoryAnalyze :space-id="spaceIdStr" />
          </a-col>
          <a-col :xs="24" :md="12">
            <SpaceTagAnalyze :space-id="spaceIdStr" />
          </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :xs="24" :md="12">
            <SpaceSizeAnalyze :space-id="spaceIdStr" />
          </a-col>
          <a-col :xs="24" :md="12">
            <SpaceUserAnalyze :space-id="spaceIdStr" />
          </a-col>
        </a-row>
        <SpaceRankAnalyze :space-id="spaceIdStr" />
      </a-space>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpaceUsageAnalyze from '@/components/analyze/SpaceUsageAnalyze.vue'
import SpaceCategoryAnalyze from '@/components/analyze/SpaceCategoryAnalyze.vue'
import SpaceTagAnalyze from '@/components/analyze/SpaceTagAnalyze.vue'
import SpaceSizeAnalyze from '@/components/analyze/SpaceSizeAnalyze.vue'
import SpaceUserAnalyze from '@/components/analyze/SpaceUserAnalyze.vue'
import SpaceRankAnalyze from '@/components/analyze/SpaceRankAnalyze.vue'

const router = useRouter()
const route = useRoute()

// 从路由 query 获取 spaceId，保持字符串避免大数精度丢失（JS 安全整数 < 2^53）
const spaceId = computed(() => route.query?.spaceId)
const spaceIdStr = computed(() => {
  const id = spaceId.value
  if (id == null || id === '') return undefined
  return Array.isArray(id) ? id[0] : String(id)
})

</script>

<style scoped>
#spaceAnalyzePage {
  padding: 0 24px;
  margin-bottom: 24px;
}
</style>
