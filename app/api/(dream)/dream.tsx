'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { type Dream } from '@/src/API'
import { graphqlClient } from '@/app/layout'
import { listDreams } from '@/src/graphql/queries'

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
      {JSON.stringify(dreams)}
    </>
  )
}
