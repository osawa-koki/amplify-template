'use client'

import React, { useEffect, useState } from 'react'

import { Alert } from 'react-bootstrap'
import { IoReload } from 'react-icons/io5'
import { toast } from 'react-toastify'

import { type ChatRoom } from '@/src/API'
import { listChatRooms } from '@/src/graphql/queries'

import { graphqlClient } from '@/app/layout'

import ChatRoomIndexComponent from './indexTable'
import ChatRoomCreateComponent from './create'

export default function ChatRoomComponent (): React.JSX.Element {
  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null | Error>(null)

  const [isLoading, setIsLoading] = useState(false)

  const fetchFn = (): void => {
    setIsLoading(true)
    graphqlClient.graphql({ query: listChatRooms, authMode: 'userPool' })
      .then((result) => {
        const rooms = result.data.listChatRooms.items.sort((a, b) => {
          if (a.createdAt == null || b.createdAt == null) return 0
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        })
        setChatRooms(rooms)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load chat rooms')
        setChatRooms(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchFn()
  }, [])

  return (
    <>
      <h1>Chat Room List</h1>
      <Alert variant='info' className='my-3'>
        This is a simple chat room list. You can create, update, and delete chat rooms.
        <br />
        Only you can see and operate your chat rooms.
      </Alert>
      <IoReload onClick={fetchFn} role='button' className={`${isLoading ? 'bg-secondary' : ''}`} />
      <ChatRoomIndexComponent chatRooms={chatRooms} />
      <hr />
      <ChatRoomCreateComponent afterCreate={fetchFn} isLoading={isLoading} setIsLoading={setIsLoading} />
    </>
  )
}
