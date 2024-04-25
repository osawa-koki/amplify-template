'use client'

import React, { useState } from 'react'

import { Alert, Form } from 'react-bootstrap'

import TodoComponent from './todo/todo'

type SelectedComponent = '' | 'Todo'

export default function Todos (): React.JSX.Element {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>('')

  return (
    <>
      <Form.Select
        value={selectedComponent}
        onChange={(e) => { setSelectedComponent(e.target.value as SelectedComponent) }}
        className='my-3'
      >
        <option value=''>Select Component</option>
        <option value='Todo'>Todo</option>
      </Form.Select>
      {selectedComponent === '' && (
        <Alert variant='info'>Please select a component</Alert>
      )}
      {selectedComponent === 'Todo' && <TodoComponent />}
    </>
  )
}
