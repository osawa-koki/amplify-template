'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Alert, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { type ChatRoom } from '@/src/API'
import { getChatRoom } from '@/src/graphql/queries'
import { graphqlClient } from '@/app/utils/graphqlClient'

import ChatRoomShowComponent from './show'

export default function ChatRoomShow (): React.JSX.Element {
  const searchParams = useSearchParams()

  const chatRoomId = searchParams.get('chat-room-id')

  const [chatRoom, setChatRoom] = useState<ChatRoom | null | Error>(null)

  const fetchFn = (): void => {
    if (chatRoomId == null) {
      setChatRoom(new Error('Chat Room ID is not found'))
      return
    }
    graphqlClient
      .graphql({ query: getChatRoom, variables: { id: chatRoomId }, authMode: 'userPool' })
      .then((result) => {
        const chatRoom = result.data.getChatRoom
        if (chatRoom == null) {
          throw new Error('Chat Room not found')
        }
        setChatRoom(chatRoom)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load chat rooms')
        setChatRoom(err)
      })
  }

  useEffect(() => {
    fetchFn()
  }, [])

  if (chatRoom == null) {
    return (
      <div className='d-flex justify-content-between my-3'>
        <Spinner animation='border' variant='primary' />
        <Spinner animation='border' variant='secondary' />
        <Spinner animation='border' variant='success' />
        <Spinner animation='border' variant='danger' />
        <Spinner animation='border' variant='warning' />
      </div>
    )
  }

  if (chatRoom instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {chatRoom.message}
      </Alert>
    )
  }

  return (
    <>
      <ChatRoomShowComponent chatRoom={chatRoom} setChatRoom={setChatRoom} mutate={fetchFn} />
    </>
  )
}
