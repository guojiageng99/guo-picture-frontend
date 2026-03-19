<template>
  <div id="teamSpacePage">
    <!-- 加载中 -->
    <div v-if="loading" class="loading-tip">
      <a-spin size="large" />
      <p>正在加载，请稍后...</p>
    </div>
    <!-- 未登录 -->
    <div v-else-if="!loginUser?.id" class="empty-tip">
      <a-result
        status="403"
        title="请先登录"
        sub-title="登录后可查看您加入的团队空间"
      >
        <template #extra>
          <a-button type="primary" @click="router.push('/user/login')">去登录</a-button>
        </template>
      </a-result>
    </div>
    <!-- 有团队空间 -->
    <div v-else class="team-space-content">
      <a-flex justify="space-between" align="center" style="margin-bottom: 24px">
        <h2>团队空间</h2>
        <router-link to="/add_space?type=1" custom v-slot="{ navigate }">
          <a-button type="primary" @click="navigate">+ 创建团队空间</a-button>
        </router-link>
      </a-flex>

      <a-empty v-if="teamSpaceList.length === 0" description="暂无团队空间">
        <template #description>
          <p>您还没有加入任何团队空间</p>
          <p style="color: #999; font-size: 14px; margin-top: 8px">
            创建团队空间后，可邀请成员协作管理图片
          </p>
        </template>
        <router-link to="/add_space?type=1" custom v-slot="{ navigate }">
          <a-button type="primary" @click="navigate">创建团队空间</a-button>
        </router-link>
      </a-empty>

      <a-row v-else :gutter="[16, 16]">
        <a-col
          v-for="item in teamSpaceList"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <a-card
            hoverable
            class="space-card"
            @click="router.push(`/space/${item.space?.id}`)"
          >
            <template #title>
              <a-space>
                <TeamOutlined />
                {{ item.space?.spaceName }}
              </a-space>
            </template>
            <template #extra>
              <a-tag :color="getRoleColor(item.spaceRole)">
                {{ SPACE_ROLE_MAP[item.spaceRole] || item.spaceRole }}
              </a-tag>
            </template>
            <div class="space-card-body">
              <div class="space-stats">
                <span>图片：{{ item.space?.totalCount ?? 0 }} / {{ item.space?.maxCount ?? 0 }}</span>
                <span>容量：{{ formatSize(item.space?.totalSize) }} / {{ formatSize(item.space?.maxSize) }}</span>
              </div>
              <div class="space-meta">
                加入时间：{{ dayjs(item.createTime).format('YYYY-MM-DD') }}
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TeamOutlined } from '@ant-design/icons-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { listMyTeamSpaceUsingPost } from '@/api/spaceUserController'
import { SPACE_ROLE_MAP } from '@/constants/space'
import { formatSize } from '@/utils'
import dayjs from 'dayjs'

const router = useRouter()
const loginUserStore = useLoginUserStore()
const loginUser = loginUserStore.loginUser

const loading = ref(true)
const teamSpaceList = ref<API.SpaceUserVO[]>([])

// 获取团队空间列表
const fetchTeamSpaceList = async () => {
  loading.value = true
  try {
    const res = await listMyTeamSpaceUsingPost()
    if (res.data.code === 0) {
      // 成功则展示数据，空数组时显示「暂无团队空间」空状态，不报错
      teamSpaceList.value = res.data.data ?? []
    } else {
      // 业务错误（如未登录）时，静默展示空状态，不弹错误 toast
      teamSpaceList.value = []
    }
  } catch {
    // 网络等异常时展示空状态，不打扰用户
    teamSpaceList.value = []
  } finally {
    loading.value = false
  }
}

// 根据角色返回标签颜色
const getRoleColor = (role?: string) => {
  const colorMap: Record<string, string> = {
    admin: 'red',
    editor: 'blue',
    viewer: 'default',
  }
  return colorMap[role ?? ''] ?? 'default'
}

onMounted(() => {
  fetchTeamSpaceList()
})
</script>

<style scoped>
#teamSpacePage {
  margin-bottom: 24px;
}

.loading-tip,
.empty-tip {
  text-align: center;
  padding: 48px 0;
}

.loading-tip p {
  margin-top: 16px;
  color: #666;
}

.space-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.space-card:hover {
  transform: translateY(-2px);
}

.space-card-body {
  min-height: 60px;
}

.space-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #666;
  font-size: 13px;
}

.space-meta {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}
</style>
