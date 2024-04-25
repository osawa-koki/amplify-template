'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import TodoShowComponent from './show'

export default function TodoShow (): React.JSX.Element {
  const searchParams = useSearchParams()

  const todoId = searchParams.get('todo-id')

  return (
    <>
      {JSON.stringify(todoId)}
      <TodoShowComponent />
    </>
  )
}
