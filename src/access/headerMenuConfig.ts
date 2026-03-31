import { AccessEnum } from './accessEnum'

/** 顶栏菜单：与路由 path 对应，access 用于隐藏无权限项 */
export interface HeaderMenuItemConfig {
  key: string
  label: string
  title: string
  access?: AccessEnum
}

export const HEADER_MENU_CONFIG: HeaderMenuItemConfig[] = [
  { key: '/', label: '主页', title: '主页' },
  { key: '/add_picture', label: '创建图片', title: '创建图片', access: AccessEnum.LOGIN },
  { key: '/admin/userManage', label: '用户管理', title: '用户管理', access: AccessEnum.ADMIN },
  { key: '/admin/pictureManage', label: '图片管理', title: '图片管理', access: AccessEnum.ADMIN },
  { key: '/admin/spaceManage', label: '空间管理', title: '空间管理', access: AccessEnum.ADMIN },
]
