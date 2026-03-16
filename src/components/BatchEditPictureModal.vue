<template>
  <a-modal
    v-model:open="visible"
    title="批量编辑图片"
    :width="800"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :model="formData" layout="vertical">
      <a-form-item name="category" label="分类">
        <a-input v-model:value="formData.category" placeholder="请输入分类" allow-clear />
      </a-form-item>
      <a-form-item name="tags" label="标签">
        <a-select
          v-model:value="formData.tags"
          mode="tags"
          placeholder="请输入标签"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { editPictureUsingPost } from '@/api/pictureController.ts'

interface Props {
  spaceId?: number
  pictureList?: API.PictureVO[]
  onSuccess?: () => void
}

const props = defineProps<Props>()

const visible = ref(false)
const formData = reactive<API.PictureEditRequest>({})

const openModal = () => {
  visible.value = true
}

const handleOk = async () => {
  if (!props.pictureList || props.pictureList.length === 0) {
    message.warning('请选择要编辑的图片')
    return
  }

  try {
    // 批量更新图片
    const promises = props.pictureList.map((picture) => {
      return editPictureUsingPost({
        id: picture.id,
        spaceId: props.spaceId,
        ...formData,
      })
    })

    await Promise.all(promises)
    message.success('批量编辑成功')
    props.onSuccess?.()
    handleCancel()
  } catch (error: any) {
    message.error('批量编辑失败：' + (error.message || '未知错误'))
  }
}

const handleCancel = () => {
  visible.value = false
  // 重置表单
  formData.category = undefined
  formData.tags = undefined
}

defineExpose({
  openModal,
})
</script>

<style scoped></style>

