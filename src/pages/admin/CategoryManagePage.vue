<template>
  <div id="categoryManagePage">
    <a-space style="margin-bottom: 16px">
      <a-button type="primary" @click="openAdd">新增分类</a-button>
    </a-space>
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      row-key="id"
      @change="doTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'createTime'">
          {{ record.createTime ? dayjs(record.createTime).format('YYYY-MM-DD HH:mm') : '-' }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a-button type="link" @click="openEdit(record)">编辑</a-button>
            <a-popconfirm title="确定删除？引用次数为 0 才可删" @confirm="doDelete(record.id)">
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :confirm-loading="modalSubmitting"
      destroy-on-close
      @ok="submitModal"
    >
      <a-form layout="vertical" :model="formState">
        <a-form-item label="分类名称" required>
          <a-input v-model:value="formState.categoryName" placeholder="分类名" allow-clear />
        </a-form-item>
        <a-form-item label="排序（越小越靠前）">
          <a-input-number v-model:value="formState.sortOrder" :min="0" style="width: 100%" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  addPictureCategoryUsingPost,
  deletePictureCategoryUsingPost,
  listPictureCategoryAdminPageUsingPost,
  updatePictureCategoryUsingPost,
} from '@/api/pictureCategoryAdminController'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  { title: 'ID', dataIndex: 'id', width: 90 },
  { title: '分类名', dataIndex: 'categoryName' },
  { title: '引用次数', dataIndex: 'usageCount', width: 100 },
  { title: '排序', dataIndex: 'sortOrder', width: 80 },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'action', width: 160 },
]

const dataList = ref<API.PictureCategory[]>([])
const total = ref(0)
const searchParams = reactive({ current: 1, pageSize: 10 })

const fetchData = async () => {
  const res = await listPictureCategoryAdminPageUsingPost({ ...searchParams })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = Number(res.data.data.total ?? 0)
  } else {
    message.error(res.data.message ?? '加载失败')
  }
}

onMounted(() => fetchData())

const pagination = computed(() => ({
  current: searchParams.current,
  pageSize: searchParams.pageSize,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
}))

const doTableChange = (page: { current: number; pageSize: number }) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

const modalVisible = ref(false)
const modalSubmitting = ref(false)
const modalTitle = ref('新增分类')
const editingId = ref<number | undefined>(undefined)
const formState = reactive<{ categoryName: string; sortOrder: number | undefined }>({
  categoryName: '',
  sortOrder: 0,
})

const openAdd = () => {
  editingId.value = undefined
  modalTitle.value = '新增分类'
  formState.categoryName = ''
  formState.sortOrder = 0
  modalVisible.value = true
}

const openEdit = (record: API.PictureCategory) => {
  editingId.value = record.id
  modalTitle.value = '编辑分类'
  formState.categoryName = record.categoryName ?? ''
  formState.sortOrder = record.sortOrder
  modalVisible.value = true
}

const submitModal = async () => {
  if (!formState.categoryName?.trim()) {
    message.warning('请输入分类名')
    return
  }
  modalSubmitting.value = true
  try {
    if (editingId.value == null) {
      const res = await addPictureCategoryUsingPost({
        categoryName: formState.categoryName.trim(),
        sortOrder: formState.sortOrder ?? 0,
      })
      if (res.data.code === 0) {
        message.success('新增成功')
        modalVisible.value = false
        fetchData()
      } else {
        message.error(res.data.message ?? '失败')
      }
    } else {
      const res = await updatePictureCategoryUsingPost({
        id: editingId.value,
        categoryName: formState.categoryName.trim(),
        sortOrder: formState.sortOrder,
      })
      if (res.data.code === 0) {
        message.success('更新成功')
        modalVisible.value = false
        fetchData()
      } else {
        message.error(res.data.message ?? '失败')
      }
    }
  } finally {
    modalSubmitting.value = false
  }
}

const doDelete = async (id?: number) => {
  if (!id) return
  const res = await deletePictureCategoryUsingPost({ id })
  if (res.data.code === 0) {
    message.success('已删除')
    fetchData()
  } else {
    message.error(res.data.message ?? '删除失败')
  }
}
</script>
