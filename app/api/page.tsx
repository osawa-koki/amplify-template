'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Alert, Form } from 'react-bootstrap'

import TodoComponent from './todo/todo'

type SelectedComponent = '' | 'Todo'
const allowedSelectedComponents: SelectedComponent[] = ['', 'Todo']

export default function Todos (): React.JSX.Element {
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>('')
  const selected = searchParams.get('selected')

  useEffect(() => {
    if (allowedSelectedComponents.includes(selected as SelectedComponent)) {
      setSelectedComponent(selected as SelectedComponent)
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (selectedComponent !== '') {
      router.push(
        `${pathname}?${createQueryString('selected', selectedComponent)}`,
        undefined
      )
    } else {
      router.push(
        pathname,
        undefined
      )
    }
  }, [selectedComponent])

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
