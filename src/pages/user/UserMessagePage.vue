<template>
  <div id="userMessagePage" class="wrap">
    <a-card title="消息中心" :bordered="false">
      <a-space style="margin-bottom: 16px" wrap>
        <a-checkbox v-model:checked="unreadOnly">仅看未读</a-checkbox>
        <a-button type="primary" @click="load">刷新</a-button>
      </a-space>
      <a-table
        :columns="columns"
        :data-source="dataList"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        @change="onTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'isRead'">
            <a-tag :color="record.isRead === 1 ? 'default' : 'blue'">
              {{ record.isRead === 1 ? '已读' : '未读' }}
            </a-tag>
          </template>
          <template v-else-if="column.dataIndex === 'createTime'">
            {{ record.createTime ? dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
          </template>
          <template v-else-if="column.key === 'action'">
            <a-button
              v-if="record.isRead !== 1"
              type="link"
              size="small"
              @click="markRead(record)"
            >
              标为已读
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import {
  listUserMessagePageUsingPost,
  markUserMessageReadUsingPost,
} from '@/api/userMessageController'
import { useUnreadMessageStore } from '@/stores/useUnreadMessageStore'

const unreadOnly = ref(false)
const loading = ref(false)
const dataList = ref<API.UserMessage[]>([])
const total = ref(0)
const current = ref(1)
const pageSize = ref(10)

const unreadStore = useUnreadMessageStore()

const columns = [
  { title: '标题', dataIndex: 'title', ellipsis: true },
  { title: '内容', dataIndex: 'content', ellipsis: true, width: '36%' },
  { title: '状态', dataIndex: 'isRead', width: 90 },
  { title: '时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', key: 'action', width: 100 },
]

const pagination = computed(() => ({
  current: current.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
}))

const load = async () => {
  loading.value = true
  try {
    const res = await listUserMessagePageUsingPost({
      current: current.value,
      pageSize: pageSize.value,
      unreadOnly: unreadOnly.value || undefined,
    })
    if (res.data.code === 0 && res.data.data) {
      dataList.value = res.data.data.records ?? []
      total.value = Number(res.data.data.total ?? 0)
    } else {
      message.error(res.data.message ?? '加载失败')
    }
  } finally {
    loading.value = false
  }
}

const onTableChange = (pag: { current: number; pageSize: number }) => {
  current.value = pag.current
  pageSize.value = pag.pageSize
  load()
}

watch(unreadOnly, () => {
  current.value = 1
  load()
})

const markRead = async (record: API.UserMessage) => {
  if (!record.id) return
  const res = await markUserMessageReadUsingPost({ id: record.id })
  if (res.data.code === 0) {
    message.success('已标记已读')
    await load()
    await unreadStore.refresh()
  } else {
    message.error(res.data.message ?? '操作失败')
  }
}

onMounted(() => {
  load()
  unreadStore.refresh()
})
</script>

<style scoped>
.wrap {
  max-width: 960px;
  margin: 24px auto;
  padding: 0 16px;
}
</style>
