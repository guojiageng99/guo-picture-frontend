<template>
  <div id="userManagePage">
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" allow-clear />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="输入用户名" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
    <div style="margin-bottom: 16px" />
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a-button type="link" @click="openEdit(record)">编辑</a-button>
            <a-button type="link" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="editVisible"
      title="编辑用户"
      :confirm-loading="editSubmitting"
      ok-text="保存"
      destroy-on-close
      @ok="submitEdit"
    >
      <a-form layout="vertical" :model="editForm">
        <a-form-item label="账号">
          <a-input v-model:value="editForm.userAccount" disabled />
        </a-form-item>
        <a-form-item label="昵称" required>
          <a-input v-model:value="editForm.userName" placeholder="用户昵称" allow-clear />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model:value="editForm.userPhone" placeholder="11 位手机号" allow-clear maxlength="11" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="editForm.userEmail" placeholder="邮箱" allow-clear />
        </a-form-item>
        <a-form-item label="头像 URL">
          <a-input v-model:value="editForm.userAvatar" placeholder="图片地址" allow-clear />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea v-model:value="editForm.userProfile" :rows="3" allow-clear />
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model:value="editForm.userRole" :options="roleOptions" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  deleteUserUsingPost,
  listUserVoByPageUsingPost,
  updateUserUsingPost,
} from '@/api/userController'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  { title: 'id', dataIndex: 'id' },
  { title: '账号', dataIndex: 'userAccount' },
  { title: '用户名', dataIndex: 'userName' },
  { title: '手机号', dataIndex: 'userPhone' },
  { title: '邮箱', dataIndex: 'userEmail', ellipsis: true },
  { title: '头像', dataIndex: 'userAvatar' },
  { title: '简介', dataIndex: 'userProfile' },
  { title: '用户角色', dataIndex: 'userRole' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'action' },
]

const roleOptions = [
  { label: '普通用户', value: 'user' },
  { label: '管理员', value: 'admin' },
]

const dataList = ref<API.UserVO[]>([])
const total = ref(0)

const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'ascend',
})

const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({
    ...searchParams,
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = Number(res.data.data.total ?? 0)
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}

onMounted(() => {
  fetchData()
})

const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: (t: number) => `共 ${t} 条`,
  }
})

const doTableChange = (page: { current: number; pageSize: number }) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

const doSearch = () => {
  searchParams.current = 1
  fetchData()
}

const doDelete = async (id?: number) => {
  if (!id) {
    return
  }
  const res = await deleteUserUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    fetchData()
  } else {
    message.error('删除失败')
  }
}

const editVisible = ref(false)
const editSubmitting = ref(false)
const editForm = reactive({
  id: undefined as number | undefined,
  userAccount: '',
  userName: '',
  userPhone: '',
  userEmail: '',
  userAvatar: '',
  userProfile: '',
  userRole: 'user',
})

const openEdit = (record: API.UserVO) => {
  editForm.id = record.id
  editForm.userAccount = record.userAccount ?? ''
  editForm.userName = record.userName ?? ''
  editForm.userPhone = record.userPhone ?? ''
  editForm.userEmail = record.userEmail ?? ''
  editForm.userAvatar = record.userAvatar ?? ''
  editForm.userProfile = record.userProfile ?? ''
  editForm.userRole = record.userRole === 'admin' ? 'admin' : 'user'
  editVisible.value = true
}

const submitEdit = async () => {
  if (!editForm.id) {
    message.error('用户 id 无效')
    throw new Error('invalid')
  }
  if (!editForm.userName?.trim()) {
    message.warning('请输入昵称')
    throw new Error('invalid')
  }
  editSubmitting.value = true
  try {
    const res = await updateUserUsingPost({
      id: editForm.id,
      userName: editForm.userName,
      userPhone: editForm.userPhone?.trim() || undefined,
      userEmail: editForm.userEmail?.trim() || undefined,
      userAvatar: editForm.userAvatar,
      userProfile: editForm.userProfile,
      userRole: editForm.userRole,
    })
    if (res.data.code === 0) {
      message.success('更新成功')
      editVisible.value = false
      fetchData()
    } else {
      message.error(res.data.message ?? '更新失败')
      throw new Error('fail')
    }
  } finally {
    editSubmitting.value = false
  }
}
</script>
