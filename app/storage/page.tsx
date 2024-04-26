'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { type ListPaginateInput, list } from 'aws-amplify/storage'
import { type StorageAccessLevel } from '@aws-amplify/core'
import { Alert, Form } from 'react-bootstrap'

import UploadFileComponent from './upload'
import ListFilesComponent from './indexTable'

const storageAccessLevels: StorageAccessLevel[] = ['private', 'protected', 'guest']

export default function StoragePage (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [storageAccessLevel, setStorageAccessLevel] = useState<StorageAccessLevel>('private')

  const [files, setFiles] = useState<StorageItem[]>([])

  const fetchFn = async (): Promise<void> => {
    const listPaginateInput: ListPaginateInput = {
      prefix: '',
      options: {
        accessLevel: storageAccessLevel
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
  }, [storageAccessLevel])

  return (
    <>
      <Alert variant='info' className='my-3'>
        <Form.Group controlId='formBasicAccessLevel'>
          <Form.Label>Access Level</Form.Label>
          <Form.Control as='select' value={storageAccessLevel} onChange={(event) => {
            const { target } = event
            if (target == null) return
            const value = target.value
            setStorageAccessLevel(value as StorageAccessLevel)
          }}>
            {storageAccessLevels.map((storageAccessLevel) => {
              return (
                <option key={storageAccessLevel} value={storageAccessLevel}>{storageAccessLevel}</option>
              )
            })}
          </Form.Control>
        </Form.Group>
      </Alert>
      <hr />
      <UploadFileComponent mutate={() => { void fetchFn() }} storageAccessLevel={storageAccessLevel} />
      <hr className='my-5' />
      <ListFilesComponent files={files} isLoading={isLoading} setIsLoading={setIsLoading} mutate={fetchFn} storageAccessLevel={storageAccessLevel} />
    </>
  )
}
