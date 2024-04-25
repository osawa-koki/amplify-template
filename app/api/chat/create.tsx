'use client'

import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/layout'
import { createChatRoom } from '@/src/graphql/mutations'
import { type CreateChatRoomInput } from '@/src/API'

interface Props {
  mutate: () => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export default function ChatRoomCreateComponent (props: Props): React.JSX.Element {
  const { mutate, isLoading, setIsLoading } = props

  const [name, setName] = useState('')

  const createButtonDisabled = useMemo(() => {
    return name === ''
  }, [name])

  const createFn = async (): Promise<void> => {
    setIsLoading(true)

    const data: CreateChatRoomInput = {
      name
    }
    try {
      await graphqlClient.graphql({
        query: createChatRoom,
        variables: { input: data },
        authMode: 'userPool'
      })
      toast.success('Chat room created')
      setName('')
      mutate()
    } catch (err) {
      console.error('error creating chat room:', err)
      toast.error('Failed to create chat room')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form.Control type='text' className='mt-2' placeholder='Enter name' value={name} onChange={(event) => { setName(event.target.value) }} />
      <Button variant='primary' className='mt-2' onClick={() => { void createFn() }} disabled={createButtonDisabled || isLoading}>
        Create
      </Button>
    </>
  )
}
