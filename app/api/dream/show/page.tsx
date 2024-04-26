'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Alert, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { type Dream } from '@/src/API'
import { getDream } from '@/src/graphql/queries'
import { graphqlClient } from '@/app/utils/graphqlClient'

import DreamShowComponent from './show'

export default function DreamShow (): React.JSX.Element {
  const searchParams = useSearchParams()

  const dreamId = searchParams.get('dream-id')

  const [dream, setDream] = useState<Dream | null | Error>(null)

  const fetchFn = (): void => {
    if (dreamId == null) {
      setDream(new Error('dream ID is not found'))
      return
    }
    graphqlClient
      .graphql({ query: getDream, variables: { id: dreamId }, authMode: 'userPool' })
      .then((result) => {
        const dream = result.data.getDream
        if (dream == null) {
          throw new Error('Dream not found')
        }
        setDream(dream)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load dreams')
        setDream(err)
      })
  }

  useEffect(() => {
    fetchFn()
  }, [])

  if (dream == null) {
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

  if (dream instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {dream.message}
      </Alert>
    )
  }

  return (
    <>
      <DreamShowComponent dream={dream} setDream={setDream} />
    </>
  )
}
