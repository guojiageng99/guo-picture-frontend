// @ts-ignore
/* eslint-disable */
import request from '@/request'

export async function listPictureCategoryAdminPageUsingPost(
  body: { current?: number; pageSize?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePictureCategory_>('/api/picture/category/admin/list/page', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function addPictureCategoryUsingPost(
  body: { categoryName?: string; sortOrder?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/picture/category/admin/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function updatePictureCategoryUsingPost(
  body: { id?: number; categoryName?: string; sortOrder?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/category/admin/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function deletePictureCategoryUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/category/admin/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}
