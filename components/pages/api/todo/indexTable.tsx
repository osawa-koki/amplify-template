'use client'

import React from 'react'

import { type Todo } from '@/src/API'
import { Alert, Spinner, Table } from 'react-bootstrap'

interface Props {
  todos: Todo[] | null | Error
}

export default function TodoIndexTable (props: Props): React.JSX.Element {
  const { todos } = props

  if (todos == null) {
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

  if (todos instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {todos.message}
      </Alert>
    )
  }

  return (
    <>
      <Table className='my-3'>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
