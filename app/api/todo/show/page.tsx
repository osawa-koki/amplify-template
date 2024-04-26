'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Alert, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { type Todo } from '@/src/API'
import { getTodo } from '@/src/graphql/queries'
import { graphqlClient } from '@/app/utils/graphqlClient'

import TodoShowComponent from './show'

export default function TodoShow (): React.JSX.Element {
  const searchParams = useSearchParams()

  const todoId = searchParams.get('todo-id')

  const [todo, setTodo] = useState<Todo | null | Error>(null)

  const fetchFn = (): void => {
    if (todoId == null) {
      setTodo(new Error('Todo ID is not found'))
      return
    }
    graphqlClient
      .graphql({ query: getTodo, variables: { id: todoId }, authMode: 'userPool' })
      .then((result) => {
        const todo = result.data.getTodo
        if (todo == null) {
          throw new Error('Todo not found')
        }
        setTodo(todo)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load todos')
        setTodo(err)
      })
  }

  useEffect(() => {
    fetchFn()
  }, [])

  if (todo == null) {
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

  if (todo instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {todo.message}
      </Alert>
    )
  }

  return (
    <>
      <TodoShowComponent todo={todo} setTodo={setTodo} />
    </>
  )
}
