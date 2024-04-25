'use client'

import React, { useEffect, useState } from 'react'

import { Alert } from 'react-bootstrap'
import { IoReload } from 'react-icons/io5'
import { toast } from 'react-toastify'

import { type Todo } from '@/src/API'
import { listTodos } from '@/src/graphql/queries'

import { graphqlClient } from '@/app/layout'

import TodoIndexComponent from './indexTable'
import TodoCreateComponent from './create'

export default function TodoComponent (): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[] | null | Error>(null)

  const [isLoading, setIsLoading] = useState(false)

  const fetchFn = (): void => {
    setIsLoading(true)
    graphqlClient.graphql({ query: listTodos, authMode: 'userPool' })
      .then((result) => {
        setTodos(result.data.listTodos.items.sort((a, b) => {
          if (a.createdAt == null || b.createdAt == null) return 0
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        }))
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load todos')
        setTodos(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchFn()
  }, [])

  return (
    <>
      <h1>Todo List</h1>
      <Alert variant='info' className='my-3'>
        This is a simple todo list. You can create and delete todos.
      </Alert>
      <div>
        <IoReload onClick={fetchFn} role='button' className={`${isLoading ? 'bg-secondary' : ''}`} />
      </div>
      <TodoIndexComponent todos={todos} />
      <hr />
      <TodoCreateComponent afterCreate={fetchFn} isLoading={isLoading} setIsLoading={setIsLoading} />
    </>
  )
}
