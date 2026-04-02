import { getUserMessageUnreadCountUsingGet } from '@/api/userMessageController'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUnreadMessageStore = defineStore('unreadMessage', () => {
  const unreadCount = ref(0)

  async function refresh() {
    try {
      const res = await getUserMessageUnreadCountUsingGet()
      if (res.data.code === 0 && res.data.data != null) {
        unreadCount.value = Number(res.data.data)
      } else {
        unreadCount.value = 0
      }
    } catch {
      unreadCount.value = 0
    }
  }

  function clear() {
    unreadCount.value = 0
  }

  return { unreadCount, refresh, clear }
})
