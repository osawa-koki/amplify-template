'use client'

import React from 'react'

import { Alert, Spinner, Table } from 'react-bootstrap'
import Link from 'next/link'
import { IoOpenOutline } from 'react-icons/io5'

import { type ChatRoom } from '@/src/API'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { FaCheck } from 'react-icons/fa'

interface Props {
  chatRooms: ChatRoom[] | null | Error
}

export default function ChatRoomIndexTable (props: Props): React.JSX.Element {
  const { chatRooms } = props

  const { user } = useAuthenticator((context) => [context.user])

  if (chatRooms == null) {
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

  if (chatRooms instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {chatRooms.message}
      </Alert>
    )
  }

  if (chatRooms.length === 0) {
    return (
      <Alert variant='warning' className='my-3'>
        No chat rooms found
      </Alert>
    )
  }

  return (
    <>
      <Table className='my-3'>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>message count</th>
            <th>yours?</th>
          </tr>
        </thead>
        <tbody>
          {chatRooms.map((chatRoom) => (
            <tr key={chatRoom.id}>
              <td>
                <Link href={`/api/todo/show?chat-room-id=${chatRoom.id}`}><IoOpenOutline /></Link>
              </td>
              <td>{chatRoom.name}</td>
              <td>{chatRoom.messages?.items.length ?? 0}</td>
              <td>{chatRoom.owner === user.userId ? <FaCheck className='text-success' /> : <></>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
