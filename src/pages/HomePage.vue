<template>
  <div id="homePage">
    <div class="search-bar">
      <a-input-search
        v-model:value="searchParams.searchText"
        placeholder="从海量图片中搜索"
        enter-button="搜索"
        size="large"
        @search="doSearch"
      />
    </div>

    <div v-if="popularCategoryList.length" class="popular-bar">
      <span class="popular-label">热门分类：</span>
      <a-space wrap>
        <a-tag
          v-for="c in popularCategoryList"
          :key="'pc-' + c"
          color="blue"
          style="cursor: pointer"
          @click="selectPopularCategory(c)"
        >
          {{ c }}
        </a-tag>
      </a-space>
    </div>

    <div v-if="popularTagList.length" class="popular-bar">
      <span class="popular-label">热门标签：</span>
      <a-space wrap>
        <a-tag
          v-for="t in popularTagList"
          :key="'pt-' + t"
          color="processing"
          style="cursor: pointer"
          @click="selectPopularTag(t)"
        >
          {{ t }}
        </a-tag>
      </a-space>
    </div>

    <a-tabs v-model:active-key="selectedCategory" @change="doSearch">
      <a-tab-pane key="all" tab="全部" />
      <a-tab-pane v-for="category in categoryList" :key="category" :tab="category" />
    </a-tabs>
    <div class="tag-bar">
      <span style="margin-right: 8px">标签：</span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
          v-for="(tag, index) in tagList"
          :key="tag"
          v-model:checked="selectedTagList[index]"
          @change="doSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>
    <PictureList :dataList="dataList" :loading="loading" />
    <a-pagination
      style="text-align: right"
      v-model:current="searchParams.current"
      v-model:pageSize="searchParams.pageSize"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { listPictureTagCategoryUsingGet, listPictureVoByPageUsingPost } from '@/api/pictureController'
import { message } from 'ant-design-vue'
import PictureList from '@/components/PictureList.vue'

const dataList = ref<API.PictureVO[]>([])
const total = ref(0)
const loading = ref(true)

const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend',
})

const categoryList = ref<string[]>([])
const selectedCategory = ref<string>('all')
const tagList = ref<string[]>([])
const selectedTagList = ref<boolean[]>([])
const popularTagList = ref<string[]>([])
const popularCategoryList = ref<string[]>([])

watch(
  tagList,
  (list) => {
    selectedTagList.value = list.map(() => false)
  },
  { immediate: true },
)

const fetchData = async () => {
  loading.value = true
  const params = {
    ...searchParams,
    tags: [] as string[],
  }
  if (selectedCategory.value !== 'all') {
    params.category = selectedCategory.value
  }
  selectedTagList.value.forEach((useTag, index) => {
    if (useTag) {
      params.tags.push(tagList.value[index])
    }
  })
  const res = await listPictureVoByPageUsingPost(params)
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = Number(res.data.data.total ?? 0)
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
  loading.value = false
}

const onPageChange = (page: number, pageSize: number) => {
  searchParams.current = page
  searchParams.pageSize = pageSize
  fetchData()
}

const doSearch = () => {
  searchParams.current = 1
  fetchData()
}

const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    tagList.value = res.data.data.tagList ?? []
    categoryList.value = res.data.data.categoryList ?? []
    popularTagList.value = res.data.data.popularTagList ?? []
    popularCategoryList.value = res.data.data.popularCategoryList ?? []
  } else {
    message.error('获取标签分类列表失败，' + res.data.message)
  }
}

const selectPopularCategory = (c: string) => {
  if (categoryList.value.includes(c)) {
    selectedCategory.value = c
    doSearch()
  }
}

const selectPopularTag = (t: string) => {
  const index = tagList.value.indexOf(t)
  if (index >= 0) {
    const next = [...selectedTagList.value]
    next[index] = true
    selectedTagList.value = next
    doSearch()
  }
}

onMounted(async () => {
  await getTagCategoryOptions()
  await fetchData()
})
</script>

<style scoped>
#homePage {
  margin-bottom: 16px;
}

#homePage .search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}

#homePage .popular-bar {
  margin-bottom: 12px;
}

#homePage .popular-label {
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.65);
}

#homePage .tag-bar {
  margin-bottom: 16px;
}
</style>
