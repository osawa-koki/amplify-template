'use client'

import React from 'react'

import { Alert, Spinner, Table } from 'react-bootstrap'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'

import { type Message } from '@/src/API'
import { deleteMessage } from '@/src/graphql/mutations'
import { graphqlClient } from '@/app/layout'

interface Props {
  messages: Array<Message | null> | null | Error
  mutate: () => void
}

export default function MessageIndexTable (props: Props): React.JSX.Element {
  const { messages, mutate } = props

  const { user } = useAuthenticator((context) => [context.user])

  const execDeleteMessage = (id: string): void => {
    graphqlClient.graphql({
      query: deleteMessage,
      variables: {
        input: {
          id
        }
      },
      authMode: 'userPool'
    })
      .then(() => {
        toast.success('Deleted message')
        mutate()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to delete message')
      })
  }

  if (messages == null) {
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

  if (messages instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {messages.message}
      </Alert>
    )
  }

  if (messages.length === 0) {
    return (
      <Alert variant='warning' className='my-3'>
        No messages found
      </Alert>
    )
  }

  return (
    <>
      <Table className='my-3'>
        <thead>
          <tr>
            <th>date</th>
            <th>message</th>
            <th>yours?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {messages.sort((a, b) => {
            if (a?.createdAt == null || b?.createdAt == null) return 0
            const dayA = dayjs(a.createdAt)
            const dayB = dayjs(b.createdAt)
            if (dayA.isBefore(dayB)) return 1
            if (dayA.isAfter(dayB)) return -1
            return 0
          }).map((message: Message) => (
            <tr key={message.id}>
              <td>{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{message.content}</td>
              <td>{message.owner === user.userId ? <FaCheck className='text-success' /> : <></>}</td>
              <td>
                <FaRegTrashCan type='button' className='text-danger' onClick={() => { execDeleteMessage(message.id) }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
