import type { AccessEnum } from './accessEnum'

declare module 'vue-router' {
  interface RouteMeta {
    /** 未设置则公开访问 */
    access?: AccessEnum
  }
}

export {}
