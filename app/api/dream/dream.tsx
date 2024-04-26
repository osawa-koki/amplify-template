'use client'

import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { IoReload } from 'react-icons/io5'

import { type Dream } from '@/src/API'
import { graphqlClient } from '@/app/utils/graphqlClient'
import { listDreams } from '@/src/graphql/queries'

import DreamCreateComponent from './create'
import DreamIndexTable from './indexTable'

export default function DreamComponent (): React.JSX.Element {
  const [dreams, setDreams] = useState<Dream[] | null | Error>(null)

  const [isLoading, setIsLoading] = useState(false)

  const fetchFn = (): void => {
    setIsLoading(true)
    graphqlClient.graphql({ query: listDreams, authMode: 'userPool' })
      .then((result) => {
        setDreams(result.data.listDreams.items.sort((a, b) => {
          if (a.createdAt == null || b.createdAt == null) return 0
          if (a.createdAt < b.createdAt) return -1
          if (a.createdAt > b.createdAt) return 1
          return 0
        }))
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load dreams')
        setDreams(err)
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
      <h1>Dream List</h1>
      <Alert variant='info' className='my-3'>
        This is a simple dream list. You can create, update, and delete todos.
        <br />
        Everyone can see your dreams, but only you can operate them.
      </Alert>
      <IoReload onClick={fetchFn} role='button' className={`${isLoading ? 'bg-secondary' : ''}`} />
      <DreamIndexTable dreams={dreams} />
      <hr />
      <DreamCreateComponent mutate={fetchFn} isLoading={isLoading} setIsLoading={setIsLoading} />
    </>
  )
}
