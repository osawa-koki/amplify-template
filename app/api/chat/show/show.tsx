'use client'

import React, { useState } from 'react'

import { Button, Form, Table } from 'react-bootstrap'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { IoIosHome } from 'react-icons/io'
import dayjs from 'dayjs'

import { type ChatRoom } from '@/src/API'
import { updateChatRoom } from '@/src/graphql/mutations'
import { graphqlClient } from '@/app/layout'
import ChatRoomDeleteComponent from './delete'
import MessageCreateComponent from './message/create'
import MessageIndexTable from './message/indexTable'

const indexUrl = '/api/?selected=Chat'

interface Props {
  chatRoom: ChatRoom
  setChatRoom: (chatRoom: ChatRoom) => void
  afterChange: () => void
}

export default function ChatRoomShowComponent (props: Props): React.JSX.Element {
  const { chatRoom, setChatRoom, afterChange } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tmpName, setTmpName] = useState<string | null>(null)

  const execUpdateChatRoomRecord = (key: string, value: string, reset: () => void): void => {
    setIsLoading(true)
    graphqlClient.graphql({
      query: updateChatRoom,
      variables: {
        input: {
          id: chatRoom.id,
          [key]: value
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated chat room')
        const data = result.data.updateChatRoom
        setChatRoom({
          ...chatRoom,
          ...data,
          messages: chatRoom.messages
        })
        reset()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update chat room')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const execUpdateChatRoom = (): void => {
    const newName = tmpName ?? chatRoom.name
    if (newName === chatRoom.name) {
      toast.info('No changes')
      return
    }
    graphqlClient.graphql({
      query: updateChatRoom,
      variables: {
        input: {
          id: chatRoom.id,
          name: newName
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated chat room')
        const data = result.data.updateChatRoom
        setChatRoom({
          ...chatRoom,
          ...data,
          messages: chatRoom.messages
        })
        setTmpName(null)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update chat room')
      })
  }

  return (
    <>
      <Link href={indexUrl}>
        <IoIosHome />
      </Link>
      <Table className='my-3'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            [
              { name: 'name', tmpValue: tmpName, value: chatRoom.name, setFn: setTmpName }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type='text'
                    value={item.tmpValue ?? item.value ?? ''}
                    onChange={(e) => { item.setFn(e.target.value) }}
                  />
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='secondary'
                      onClick={() => { item.setFn(null) }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='primary'
                      onClick={() => {
                        const value = item.tmpValue
                        if (value == null) return
                        execUpdateChatRoomRecord(item.name, value, () => { item.setFn(null) })
                      }}
                      disabled={isLoading}
                    >
                      Update
                    </Button>
                  )}
                </td>
              </tr>
            ))
          }
          {
            [
              { name: 'createdAt', value: chatRoom.createdAt },
              { name: 'updatedAt', value: chatRoom.updatedAt }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{dayjs(item.value).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <hr />
      <Button
        variant='primary'
        onClick={execUpdateChatRoom}
        disabled={isLoading || (tmpName == null)}
      >
        Update All
      </Button>
      <hr />
      <ChatRoomDeleteComponent id={chatRoom.id} indexUrl={indexUrl} />
      <hr />
      <MessageIndexTable messages={chatRoom.messages?.items ?? null} />
      <MessageCreateComponent chatRoomId={chatRoom.id} afterCreate={afterChange} />
    </>
  )
}
