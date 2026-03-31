import type { Router } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { canAccess, needLoginFirst } from './checkAccess'
import { AccessEnum } from './accessEnum'

let firstFetchLoginUser = true

/**
 * 全局路由守卫：按路由 meta.access 校验；无权限跳转无权限页，未登录跳转登录页。
 */
export function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const loginUserStore = useLoginUserStore()
    let loginUser = loginUserStore.loginUser

    if (firstFetchLoginUser) {
      try {
        await loginUserStore.fetchLoginUser()
        loginUser = loginUserStore.loginUser
      } catch (e) {
        console.warn('获取用户信息失败:', e)
      }
      firstFetchLoginUser = false
    }

    const leaf = to.matched[to.matched.length - 1]
    const access = leaf?.meta?.access as AccessEnum | undefined

    if (canAccess(loginUser, access)) {
      next()
      return
    }

    if (!loginUser?.id && needLoginFirst(access)) {
      next({
        path: '/user/login',
        query: { redirect: to.fullPath },
      })
      return
    }

    next({ path: '/no-auth' })
  })
}
