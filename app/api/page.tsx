'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { IoReload } from 'react-icons/io5'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { listTodos } from '../../src/graphql/queries'

import { graphqlClient } from '../layout'
import { type Todo } from '../../src/API'
import { createTodo, deleteTodo } from '../../src/graphql/mutations'

export default function Todos (): React.JSX.Element {
  const [todos, setTodos] = useState<Todo[] | null | Error>(null)

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

  const [isLoading, setIsLoading] = useState(false)

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
      fetchFn()
    } catch (err) {
      console.error('error creating todo:', err)
      toast.error('Failed to create todo')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFn = async (id: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return
    setIsLoading(true)

    try {
      await graphqlClient.graphql({
        query: deleteTodo,
        variables: { input: { id } },
        authMode: 'userPool'
      })
      toast.success('Todo deleted')
      fetchFn()
    } catch (err) {
      console.error('error deleting todo:', err)
      toast.error('Failed to delete todo')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFn()
  }, [])

  if (todos == null) {
    return (
      <div className='d-flex justify-content-between'>
        <Spinner animation='border' variant='primary' />
        <Spinner animation='border' variant='secondary' />
        <Spinner animation='border' variant='success' />
        <Spinner animation='border' variant='danger' />
        <Spinner animation='border' variant='warning' />
      </div>
    )
  }

  if (todos instanceof Error) {
    return (
      <Alert variant='danger'>
        {todos.message}
      </Alert>
    )
  }

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <IoReload onClick={fetchFn} role='button' className={`${isLoading ? 'bg-secondary' : ''}`} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>
                <Button variant='danger' onClick={() => { void deleteFn(todo.id) }} disabled={isLoading}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <td>
              <Form.Control type='text' placeholder='Enter name' value={name} onChange={(event) => { setName(event.target.value) }} />
            </td>
            <td>
              <Form.Control as='textarea' placeholder='Enter description' value={description} onChange={(event) => { setDescription(event.target.value) }} />
            </td>
            <td>
              <Button variant='primary' onClick={() => { void createFn() }} disabled={createButtonDisabled || isLoading}>
                Create
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
