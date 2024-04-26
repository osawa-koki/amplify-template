'use client'

import React, { useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/utils/graphqlClient'
import { createTodo } from '@/src/graphql/mutations'

interface Props {
  mutate: () => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export default function TodoCreateComponent (props: Props): React.JSX.Element {
  const { mutate, isLoading, setIsLoading } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const createButtonDisabled = useMemo(() => {
    return name === '' || description === ''
  }, [name, description])

  const createFn = async (): Promise<void> => {
    setIsLoading(true)

    const data = {
      name,
      description
    }
    try {
      await graphqlClient.graphql({
        query: createTodo,
        variables: { input: data },
        authMode: 'userPool'
      })
      toast.success('Todo created')
      setName('')
      setDescription('')
      mutate()
    } catch (err) {
      console.error('error creating todo:', err)
      toast.error('Failed to create todo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form.Control type='text' className='mt-2' placeholder='Enter name' value={name} onChange={(event) => { setName(event.target.value) }} />
      <Form.Control as='textarea' className='mt-2' placeholder='Enter description' value={description} onChange={(event) => { setDescription(event.target.value) }} />
      <Button variant='primary' className='mt-2' onClick={() => { void createFn() }} disabled={createButtonDisabled || isLoading}>
        Create
      </Button>
    </>
  )
}
