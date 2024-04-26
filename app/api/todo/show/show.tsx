'use client'

import React, { useState } from 'react'

import { Button, Form, Table } from 'react-bootstrap'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { IoIosHome } from 'react-icons/io'
import dayjs from 'dayjs'

import { type Todo } from '@/src/API'
import { updateTodo } from '@/src/graphql/mutations'
import { graphqlClient } from '@/app/utils/graphqlClient'

import TodoDeleteComponent from './delete'

const indexUrl = '/api/?selected=Todo'

interface Props {
  todo: Todo
  setTodo: (todo: Todo) => void
}

export default function TodoShowComponent (props: Props): React.JSX.Element {
  const { todo, setTodo } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tmpName, setTmpName] = useState<string | null>(null)
  const [tmpDescription, setTmpDescription] = useState<string | null>(null)

  const execUpdateTodoRecord = (key: string, value: string, reset: () => void): void => {
    setIsLoading(true)
    graphqlClient.graphql({
      query: updateTodo,
      variables: {
        input: {
          id: todo.id,
          [key]: value
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated todo')
        const data = result.data.updateTodo
        setTodo(data)
        reset()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update todo')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const execUpdateTodo = (): void => {
    const newName = tmpName ?? todo.name
    const newDescription = tmpDescription ?? todo.description
    if (newName === todo.name && newDescription === todo.description) {
      toast.info('No changes')
      return
    }
    graphqlClient.graphql({
      query: updateTodo,
      variables: {
        input: {
          id: todo.id,
          name: newName,
          description: newDescription
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated todo')
        const data = result.data.updateTodo
        setTodo(data)
        setTmpName(null)
        setTmpDescription(null)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update todo')
      })
  }

  return (
    <>
      <Link href={indexUrl}>
        <IoIosHome />
      </Link>
      <Table className='my-3'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            [
              { name: 'name', tmpValue: tmpName, value: todo.name, setFn: setTmpName },
              { name: 'description', tmpValue: tmpDescription, value: todo.description, setFn: setTmpDescription }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type='text'
                    value={item.tmpValue ?? item.value ?? ''}
                    onChange={(e) => { item.setFn(e.target.value) }}
                  />
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='secondary'
                      onClick={() => { item.setFn(null) }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='primary'
                      onClick={() => {
                        const value = item.tmpValue
                        if (value == null) return
                        execUpdateTodoRecord(item.name, value, () => { item.setFn(null) })
                      }}
                      disabled={isLoading}
                    >
                      Update
                    </Button>
                  )}
                </td>
              </tr>
            ))
          }
          {
            [
              { name: 'createdAt', value: todo.createdAt },
              { name: 'updatedAt', value: todo.updatedAt }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{dayjs(item.value).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <hr />
      <Button
        variant='primary'
        onClick={execUpdateTodo}
        disabled={isLoading || (tmpName == null && tmpDescription == null)}
      >
        Update All
      </Button>
      <hr />
      <TodoDeleteComponent id={todo.id} indexUrl={indexUrl} />
    </>
  )
}
