import { AccessEnum } from './accessEnum'

/** 当前登录用户是否满足路由要求的访问级别 */
export function canAccess(loginUser: { id?: number; userRole?: string } | null | undefined, access?: AccessEnum): boolean {
  if (access === undefined) {
    return true
  }
  if (!loginUser?.id) {
    return false
  }
  if (access === AccessEnum.LOGIN) {
    return true
  }
  if (access === AccessEnum.ADMIN) {
    return loginUser.userRole === 'admin'
  }
  return true
}

export function needLoginFirst(access?: AccessEnum): boolean {
  return access === AccessEnum.LOGIN || access === AccessEnum.ADMIN
}
