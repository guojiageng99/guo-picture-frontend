<template>
  <a-modal
    class="image-out-painting"
    v-model:open="visible"
    title="AI 扩图"
    :footer="false"
    @cancel="closeModal"
  >
    <a-row gutter="16">
      <a-col span="12">
        <h4>原始图片</h4>
        <img :src="picture?.url" :alt="picture?.name" style="max-width: 100%" />
      </a-col>
      <a-col span="12">
        <h4>扩图结果</h4>
        <img
          v-if="resultImageUrl"
          :src="resultImageUrl"
          :alt="picture?.name"
          style="max-width: 100%"
        />
        <div v-else-if="pollingHint" style="color: #888; margin-top: 8px">{{ pollingHint }}</div>
      </a-col>
    </a-row>
    <div style="margin-bottom: 16px" />
    <a-flex justify="center" gap="16">
      <a-button type="primary" :loading="submitting" ghost @click="createTask">生成图片</a-button>
      <a-button v-if="resultImageUrl" type="primary" :loading="uploadLoading" @click="handleUpload">
        应用结果
      </a-button>
    </a-flex>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  createPictureOutPaintingTaskUsingPost,
  getPictureOutPaintingTaskByIdUsingGet,
  uploadPictureByUrlUsingPost,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

interface Props {
  picture?: API.PictureVO
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()

const resultImageUrl = ref<string>('')
const submitting = ref(false)
const pollingHint = ref('')
let businessTaskId: number | null = null

const createTask = async () => {
  if (!props.picture?.id) {
    return
  }
  submitting.value = true
  pollingHint.value = ''
  try {
    const sid = props.spaceId != null ? Number(props.spaceId) : 0
    const res = await createPictureOutPaintingTaskUsingPost({
      pictureId: props.picture.id,
      spaceId: Number.isFinite(sid) ? sid : 0,
      parameters: {
        xScale: 2,
        yScale: 2,
      },
    })
    if (res.data.code === 0 && res.data.data?.id != null) {
      message.success('任务已提交，请稍候（扩图将预扣额度，失败或超时会退回）')
      businessTaskId = res.data.data.id
      startPolling()
    } else {
      message.error('提交失败，' + (res.data.message ?? ''))
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    message.error('提交失败，' + msg)
  } finally {
    submitting.value = false
  }
}

let pollingTimer: ReturnType<typeof setInterval> | null = null

const startPolling = () => {
  if (businessTaskId == null) {
    return
  }
  clearPolling(false)
  pollingTimer = setInterval(async () => {
    try {
      const res = await getPictureOutPaintingTaskByIdUsingGet(businessTaskId!)
      if (res.data.code !== 0 || !res.data.data) {
        return
      }
      const d = res.data.data
      const st = d.status
      if (st === 'SUCCEEDED') {
        message.success('扩图任务执行成功')
        resultImageUrl.value = d.outputImageUrl ?? ''
        clearPolling(true)
      } else if (st === 'FAILED') {
        message.error(d.errorMessage || '扩图任务失败')
        clearPolling(true)
      } else if (st === 'RECONCILING') {
        pollingHint.value = '处理超时，正在向云端确认结果…'
      } else if (st === 'PENDING' || st === 'RUNNING') {
        pollingHint.value = st === 'PENDING' ? '排队中…' : '扩图中…'
      }
    } catch (error: unknown) {
      console.error('扩图任务轮询失败', error)
      const errMsg = error instanceof Error ? error.message : String(error)
      message.error('扩图任务查询失败，' + errMsg)
      clearPolling(true)
    }
  }, 3000)
}

const clearPolling = (resetTask: boolean) => {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
  if (resetTask) {
    businessTaskId = null
    pollingHint.value = ''
  }
}

const uploadLoading = ref(false)

const handleUpload = async () => {
  uploadLoading.value = true
  try {
    const params: API.PictureUploadRequest = {
      fileUrl: resultImageUrl.value,
      spaceId: props.spaceId,
    }
    if (props.picture) {
      params.id = props.picture.id
    }
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.data.code === 0 && res.data.data) {
      message.success('图片上传成功')
      props.onSuccess?.(res.data.data)
      closeModal()
    } else {
      message.error('图片上传失败，' + res.data.message)
    }
  } catch (error: unknown) {
    console.error('图片上传失败', error)
    const m = error instanceof Error ? error.message : String(error)
    message.error('图片上传失败，' + m)
  }
  uploadLoading.value = false
}

const visible = ref(false)

const openModal = () => {
  visible.value = true
}

const closeModal = () => {
  visible.value = false
  clearPolling(true)
}

defineExpose({
  openModal,
})
</script>

<style>
.image-out-painting {
  text-align: center;
}
</style>
