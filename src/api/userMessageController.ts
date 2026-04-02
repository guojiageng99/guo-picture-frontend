// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** listPage POST /api/user/message/list/page */
export async function listUserMessagePageUsingPost(
  body: API.UserMessageQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserMessage_>('/api/user/message/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** markRead POST /api/user/message/read */
export async function markUserMessageReadUsingPost(
  body: API.UserMessageReadRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/user/message/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** unreadCount GET /api/user/message/unread/count */
export async function getUserMessageUnreadCountUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/message/unread/count', {
    method: 'GET',
    ...(options || {}),
  })
}
