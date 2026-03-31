/**
 * 全局权限：枚举、校验、路由守卫、顶栏/侧栏菜单配置。
 */
export { AccessEnum } from './accessEnum'
export { canAccess, needLoginFirst } from './checkAccess'
export { setupAccessGuard } from './routeGuard'
export { HEADER_MENU_CONFIG } from './headerMenuConfig'
export { SIDER_MENU_CONFIG } from './siderMenuConfig'
