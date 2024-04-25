import { type ChatRoom } from '@/src/API'

/**
 * @param T - The type to change the `messages` property to `any`.
 * @returns The type with the `messages` property changed to `any`.
 */
type WithAnyMessages<T> = {
  [P in keyof T]: P extends 'messages' ? any : T[P];
}

/**
 * A `ChatRoom` type with the `messages` property changed to `any`.
 */
type ShallowChatRoom = WithAnyMessages<ChatRoom>

export type { ShallowChatRoom }
