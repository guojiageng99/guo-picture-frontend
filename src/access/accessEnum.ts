/**
 * 路由 meta.access 取值：未设置 meta 表示公开访问
 */
export enum AccessEnum {
  /** 需登录（任意角色） */
  LOGIN = 'login',
  /** 需管理员 */
  ADMIN = 'admin',
}
