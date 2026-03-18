// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 获取空间使用状态 POST /api/space/analyze/usage */
export async function getSpaceUsageAnalyzeUsingPost(
  body: { queryAll?: boolean; queryPublic?: boolean; spaceId?: number | string },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/usage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间分类分析 POST /api/space/analyze/category */
export async function getSpaceCategoryAnalyzeUsingPost(
  body: { queryAll?: boolean; queryPublic?: boolean; spaceId?: number | string },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/category', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间标签分析 POST /api/space/analyze/tag */
export async function getSpaceTagAnalyzeUsingPost(
  body: { queryAll?: boolean; queryPublic?: boolean; spaceId?: number | string },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/tag', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间大小分析 POST /api/space/analyze/size */
export async function getSpaceSizeAnalyzeUsingPost(
  body: { queryAll?: boolean; queryPublic?: boolean; spaceId?: number | string },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/size', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间用户分析 POST /api/space/analyze/user */
export async function getSpaceUserAnalyzeUsingPost(
  body: {
    queryAll?: boolean
    queryPublic?: boolean
    spaceId?: number | string
    timeDimension?: string
    userId?: string
  },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

/** 获取空间排行分析 POST /api/space/analyze/rank */
export async function getSpaceRankAnalyzeUsingPost(
  body: { queryAll?: boolean; queryPublic?: boolean; spaceId?: number | string; topN?: number },
  options?: { [key: string]: any }
) {
  return request<any>('/api/space/analyze/rank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}
