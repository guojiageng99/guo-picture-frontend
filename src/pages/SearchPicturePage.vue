<template>
  <div id="searchPicturePage">
    <h2 style="margin-bottom: 16px">以图搜图</h2>
    <a-alert
      v-if="!pictureId"
      message="请从图片列表中点击放大镜图标选择要搜索的图片"
      type="info"
      show-icon
      style="margin-bottom: 16px"
    />
    <template v-else>
      <h3 style="margin-bottom: 16px">原图</h3>
      <a-card hoverable style="width: 240px">
        <template #cover>
          <img
            :alt="picture.name"
            :src="picture.thumbnailUrl ?? picture.url"
            style="height: 180px; object-fit: cover"
          />
        </template>
      </a-card>
    <h3 style="margin: 16px 0">识图结果</h3>
    <!-- 图片结果列表：仅展示有效图片 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="displayList"
      :loading="loading"
    >
      <template #renderItem="{ item: resultItem }">
        <a-list-item style="padding: 0">
          <a :href="resultItem.fromUrl || resultItem.url" target="_blank">
            <a-card hoverable>
              <template #cover>
                <img
                  :alt="resultItem.name || '相似图'"
                  :src="resultItem.thumbUrl || resultItem.url"
                  style="height: 180px; object-fit: cover"
                  @error="() => onImageError(resultItem.thumbUrl || resultItem.url)"
                />
              </template>
            </a-card>
          </a>
        </a-list-item>
      </template>
    </a-list>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  getPictureVoByIdUsingGet,
  searchPictureByPictureUsingPost,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pictureId = computed(() => {
  const id = route.query?.pictureId
  return id ? (typeof id === 'string' ? id : String(id)) : undefined
})
const picture = ref<API.PictureVO>({})

// 获取图片详情
const fetchPictureDetail = async () => {
  if (!pictureId.value) return
  try {
    const res = await getPictureVoByIdUsingGet({
      id: pictureId.value,
    })
    if (res.data.code === 0 && res.data.data) {
      picture.value = res.data.data
    } else {
      message.error('获取图片详情失败，' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取图片详情失败：' + e.message)
  }
}

// 以图搜图结果
const dataList = ref<API.ImageSearchResult[]>([])
const loading = ref<boolean>(true)
// 加载失败的图片 URL，不展示
const failedUrls = ref<Set<string>>(new Set())

// 是否为有效图片 URL（过滤页面链接等）
const isValidImageUrl = (url: string) => {
  if (!url || url.length < 20) return false
  const lower = url.toLowerCase()
  return lower.includes('.jpg') || lower.includes('.jpeg') || lower.includes('.png') ||
    lower.includes('.webp') || lower.includes('.gif') || lower.includes('f=jpeg') ||
    lower.includes('fm=') || lower.includes('bdstatic.com') || lower.includes('alicdn.com') ||
    lower.includes('sinaimg') || (lower.includes('baidu.com') && lower.includes('img'))
}

// 仅展示有效且能加载的图片
const displayList = computed(() => {
  return dataList.value.filter(item => {
    const url = item.thumbUrl || item.url
    if (!url || failedUrls.value.has(url)) return false
    return isValidImageUrl(url)
  })
})

const onImageError = (url: string) => {
  if (url) failedUrls.value = new Set([...failedUrls.value, url])
}

// 获取搜图结果
const fetchResultData = async () => {
  if (!pictureId.value) {
    loading.value = false
    return
  }
  loading.value = true
  try {
    const res = await searchPictureByPictureUsingPost({
      pictureId: pictureId.value,
    })
    if (res.data.code === 0 && res.data.data) {
      dataList.value = res.data.data ?? []
      failedUrls.value = new Set()
    } else {
      message.error('获取数据失败，' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取数据失败，' + e.message)
  }
  loading.value = false
}

// 页面加载或 pictureId 变化时请求
const loadData = async () => {
  if (!pictureId.value) {
    message.warning('请先选择要搜索的图片')
    loading.value = false
    return
  }
  await fetchPictureDetail()
  await fetchResultData()
}

onMounted(() => {
  loadData()
})

watch(pictureId, () => {
  loadData()
})
</script>

<style scoped>
#searchPicturePage {
  margin-bottom: 16px;
}
</style>
