'use client'

import { graphqlClient } from '@/app/layout'
import { createMessage } from '@/src/graphql/mutations'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

interface Props {
  chatRoomId: string
  afterCreate: () => void
}

export default function MessageCreateComponent (props: Props): React.JSX.Element {
  const { chatRoomId, afterCreate } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')

  const sendMessage = (): void => {
    setIsLoading(true)
    graphqlClient.graphql({
      query: createMessage,
      variables: {
        input: {
          content: message,
          chatRoomMessagesId: chatRoomId
        }
      },
      authMode: 'userPool'
    })
      .then(() => {
        toast.success('Message sent')
        setMessage('')
        afterCreate()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to send message')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Form.Control as='textarea' className='mt-2' placeholder='Enter message' value={message} onChange={(event) => { setMessage(event.target.value) }} />
      <Button variant='primary' className='mt-2' onClick={sendMessage} disabled={isLoading}>
        Send
      </Button>
    </>
  )
}
