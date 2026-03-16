<template>
  <div id="mySpacePage">
    <!-- 加载中 -->
    <div v-if="loading" class="loading-tip">
      <a-spin size="large" />
      <p>正在加载，请稍后...</p>
    </div>
    <!-- 无空间时显示创建表单 -->
    <div v-else-if="showCreateForm" class="create-space-section">
      <a-alert
        message="请先创建空间"
        description="您还没有创建私有空间，请填写下方表单创建您的第一个空间。"
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />
      <a-card title="创建私有空间">
        <a-form name="spaceForm" layout="vertical" :model="spaceForm" @finish="handleSubmit">
          <a-form-item name="spaceName" label="空间名称" :rules="[{ required: true, message: '请输入空间名称' }]">
            <a-input v-model:value="spaceForm.spaceName" placeholder="请输入空间名称" allow-clear />
          </a-form-item>
          <a-form-item name="spaceLevel" label="空间级别">
            <a-select
              v-model:value="spaceForm.spaceLevel"
              style="min-width: 180px"
              placeholder="请选择空间级别"
              :options="SPACE_LEVEL_OPTIONS"
              allow-clear
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="submitting" style="width: 100%">
              创建空间
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { addSpaceUsingPost, listSpaceVoByPageUsingPost } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import {
  SPACE_LEVEL_ENUM,
  SPACE_LEVEL_OPTIONS,
  SPACE_TYPE_ENUM,
} from '@/constants/space.ts'

const router = useRouter()
const loginUserStore = useLoginUserStore()

const loading = ref(true)
const showCreateForm = ref(false)
const submitting = ref(false)

const spaceForm = reactive<API.SpaceAddRequest>({
  spaceName: '',
  spaceLevel: SPACE_LEVEL_ENUM.COMMON,
})

// 检查用户是否有个人空间
const checkUserSpace = async () => {
  loading.value = true
  showCreateForm.value = false

  const loginUser = loginUserStore.loginUser
  if (!loginUser?.id) {
    router.replace('/user/login')
    loading.value = false
    return
  }

  try {
    const res = await listSpaceVoByPageUsingPost({
      userId: loginUser.id,
      current: 1,
      pageSize: 1,
      spaceType: SPACE_TYPE_ENUM.PRIVATE,
    })
    if (res.data.code === 0) {
      if (res.data.data?.records?.length > 0) {
        const space = res.data.data.records[0]
        router.replace(`/space/${space.id}`)
      } else {
        showCreateForm.value = true
      }
    } else {
      message.error('加载我的空间失败，' + res.data.message)
    }
  } catch (e) {
    message.error('加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 提交创建空间
const handleSubmit = async () => {
  submitting.value = true
  try {
    const res = await addSpaceUsingPost({
      ...spaceForm,
      spaceType: SPACE_TYPE_ENUM.PRIVATE,
    })
    if (res.data.code === 0 && res.data.data) {
      message.success('创建成功')
      router.replace(`/space/${res.data.data}`)
    } else {
      message.error('创建失败，' + res.data.message)
    }
  } catch (e) {
    message.error('创建失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  checkUserSpace()
})
</script>

<style scoped>
#mySpacePage {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 0;
}

.loading-tip {
  text-align: center;
  padding: 48px 0;
}

.loading-tip p {
  margin-top: 16px;
  color: #666;
}

.create-space-section {
  margin-top: 16px;
}
</style>
