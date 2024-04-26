'use client'

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/utils/graphqlClient'
import { deleteChatRoom } from '@/src/graphql/mutations'

interface Props {
  id: string
  indexUrl: string
}

export default function ChatRoomDeleteComponent (props: Props): React.JSX.Element {
  const { id, indexUrl } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const execDeleteChatRoom = (): void => {
    if (!window.confirm('Are you sure to delete?')) return
    setIsLoading(true)
    graphqlClient.graphql({
      query: deleteChatRoom,
      variables: { input: { id } },
      authMode: 'userPool'
    })
      .then(() => {
        toast.success('Deleted chat room')
        setTimeout(() => {
          window.location.href = indexUrl
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to delete chat room')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Button
        variant='danger'
        onClick={execDeleteChatRoom}
        disabled={isLoading}
      >
        Delete
      </Button>
    </>
  )
}
