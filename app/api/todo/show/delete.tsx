'use client'

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/utils/graphqlClient'
import { deleteTodo } from '@/src/graphql/mutations'

interface Props {
  id: string
  indexUrl: string
}

export default function TodoDeleteComponent (props: Props): React.JSX.Element {
  const { id, indexUrl } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const execDeleteTodo = (): void => {
    if (!window.confirm('Are you sure to delete?')) return
    setIsLoading(true)
    graphqlClient.graphql({
      query: deleteTodo,
      variables: { input: { id } },
      authMode: 'userPool'
    })
      .then(() => {
        toast.success('Deleted todo')
        setTimeout(() => {
          window.location.href = indexUrl
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to delete todo')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Button
        variant='danger'
        onClick={execDeleteTodo}
        disabled={isLoading}
      >
        Delete
      </Button>
    </>
  )
}
