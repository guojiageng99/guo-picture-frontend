import { AccessEnum } from './accessEnum'

export interface SiderMenuItemConfig {
  key: string
  label: string
  access?: AccessEnum
}

/** 侧栏：未登录仍可看公共图库；个人相关需登录 */
export const SIDER_MENU_CONFIG: SiderMenuItemConfig[] = [
  { key: '/', label: '公共图库' },
  { key: '/my_space', label: '我的空间', access: AccessEnum.LOGIN },
  { key: '/team_space', label: '团队空间', access: AccessEnum.LOGIN },
]
