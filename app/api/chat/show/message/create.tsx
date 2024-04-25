'use client'

import { graphqlClient } from '@/app/layout'
import { createMessage } from '@/src/graphql/mutations'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface Props {
  chatRoomId: string
}

export default function MessageCreateComponent (props: Props): React.JSX.Element {
  const { chatRoomId } = props

  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    console.log('chatRoomId:', chatRoomId)
  }, [chatRoomId])

  const sendMessage = (): void => {
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
      .then((result) => {
        console.log('result:', result)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <Form.Control as='textarea' className='mt-2' placeholder='Enter message' value={message} onChange={(event) => { setMessage(event.target.value) }} />
      <Button variant='primary' className='mt-2' onClick={sendMessage}>
        Send
      </Button>
    </>
  )
}
