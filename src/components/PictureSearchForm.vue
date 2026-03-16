<template>
  <a-form layout="inline" :model="formData" @finish="handleSearch">
    <a-form-item name="name" label="名称">
      <a-input v-model:value="formData.name" placeholder="请输入名称" allow-clear />
    </a-form-item>
    <a-form-item name="category" label="分类">
      <a-input v-model:value="formData.category" placeholder="请输入分类" allow-clear />
    </a-form-item>
    <a-form-item name="tags" label="标签">
      <a-select
        v-model:value="formData.tags"
        mode="tags"
        placeholder="请输入标签，回车添加"
        style="min-width: 180px"
        allow-clear
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">搜索</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  onSearch?: (params: API.PictureQueryRequest) => void
}

const props = defineProps<Props>()

const formData = reactive<API.PictureQueryRequest>({})

const handleSearch = () => {
  props.onSearch?.(formData)
}
</script>

<style scoped></style>

