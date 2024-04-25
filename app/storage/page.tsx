'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { type ListPaginateInput, list } from 'aws-amplify/storage'

import UploadFileComponent from './upload'
import ListFilesComponent from './indexTable'

export default function StoragePage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [files, setFiles] = useState<StorageItem[]>([])

  const fetchFn = async (): Promise<void> => {
    const listPaginateInput: ListPaginateInput = {
      prefix: '',
      options: {
        accessLevel: 'private'
      }
    }
    try {
      const listResult = await list(listPaginateInput)
      const items = listResult.items
      setFiles(items)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFn()
      .then(() => {
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to load files.')
      })
  }, [])

  return (
    <>
      <UploadFileComponent mutate={() => { void fetchFn() }} />
      <hr className='my-5' />
      <ListFilesComponent files={files} isLoading={isLoading} setIsLoading={setIsLoading} mutate={fetchFn} />
    </>
  )
}
