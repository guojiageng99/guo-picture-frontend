// @ts-ignore
/* eslint-disable */
import request from '@/request'

export async function listPictureTagAdminPageUsingPost(
  body: { current?: number; pageSize?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePagePictureTag_>('/api/picture/tag/admin/list/page', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function addPictureTagUsingPost(
  body: { tagName?: string; sortOrder?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/picture/tag/admin/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function updatePictureTagUsingPost(
  body: { id?: number; tagName?: string; sortOrder?: number },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/tag/admin/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function deletePictureTagUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/picture/tag/admin/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}
