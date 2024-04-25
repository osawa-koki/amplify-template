'use client'

import React, { useMemo, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/layout'
import { createDream } from '@/src/graphql/mutations'

interface Props {
  afterCreate: () => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export default function DreamCreateComponent (props: Props): React.JSX.Element {
  const { afterCreate, isLoading, setIsLoading } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Date | null>(null)

  const createButtonDisabled = useMemo(() => {
    return name === '' || description === '' || dueDate == null
  }, [name, description])

  const createFn = async (): Promise<void> => {
    setIsLoading(true)

    const data = {
      name,
      description
    }
    try {
      await graphqlClient.graphql({
        query: createDream,
        variables: { input: data },
        authMode: 'userPool'
      })
      toast.success('Dream created')
      setName('')
      setDescription('')
      setDueDate(null)
      afterCreate()
    } catch (err) {
      console.error('error creating dream:', err)
      toast.error('Failed to create dream')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <td>Name</td>
            <td><Form.Control type='text' placeholder='Enter name' value={name} onChange={(event) => { setName(event.target.value) }} /></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><Form.Control as='textarea' placeholder='Enter description' value={description} onChange={(event) => { setDescription(event.target.value) }} /></td>
          </tr>
          <tr>
            <td>Due Date</td>
            <td><Form.Control type='date' placeholder='Enter due date' value={dueDate?.toISOString().split('T')[0]} onChange={(event) => { setDueDate(new Date(event.target.value)) }} /></td>
          </tr>
        </tbody>
      </Table>
      <Button variant='primary' className='mt-2' onClick={() => { void createFn() }} disabled={createButtonDisabled || isLoading}>
        Create
      </Button>
    </>
  )
}
