'use client'

import React, { useState } from 'react'

import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { graphqlClient } from '@/app/utils/graphqlClient'
import { fn } from '@/src/graphql/queries'
import FunctionResponseModal from './modal'

export default function FuncPage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [functionResponse, setFunctionResponse] = useState<FunctionResponse | null>(null)

  const callFn = (): void => {
    setIsLoading(true)
    graphqlClient.graphql({ query: fn })
      .then((result): void => {
        const fn = result.data.fn
        if (fn == null) throw new Error('fn is null')
        setFunctionResponse(fn)
      })
      .catch((err): void => {
        toast.error(err.message)
      })
      .finally((): void => {
        setIsLoading(false)
      })
  }
  return (
    <>
      <h1>Func Page</h1>
      <Button variant='primary' onClick={callFn} disabled={isLoading}>Call Fn</Button>
      <FunctionResponseModal functionResponse={functionResponse} closeModal={(): void => { setFunctionResponse(null) }} />
    </>
  )
}
