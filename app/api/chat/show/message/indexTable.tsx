'use client'

import React from 'react'

import { Alert, Spinner, Table } from 'react-bootstrap'
import dayjs from 'dayjs'

import { type Message } from '@/src/API'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { FaCheck } from 'react-icons/fa'

interface Props {
  messages: Array<Message | null> | null | Error
}

export default function MessageIndexTable (props: Props): React.JSX.Element {
  const { messages } = props

  const { user } = useAuthenticator((context) => [context.user])

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
          </tr>
        </thead>
        <tbody>
          {messages.map((message: Message) => (
            <tr key={message.id}>
              <td>{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{message.content}</td>
              <td>{message.owner === user.userId ? <FaCheck className='text-success' /> : <></>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
