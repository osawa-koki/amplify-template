'use client'

import React, { useMemo, useState } from 'react'
import { type UploadDataInput, uploadData } from 'aws-amplify/storage'
import { type StorageAccessLevel } from '@aws-amplify/core'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

interface Props {
  mutate: () => void
  storageAccessLevel: StorageAccessLevel
}

export default function UploadComponent (props: Props): React.JSX.Element {
  const { mutate, storageAccessLevel } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [fileName, setFileName] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const buttonIsDisabled = useMemo(() => {
    return fileName == null || file == null
  }, [fileName, file, storageAccessLevel])

  const uploadFile = async (): Promise<void> => {
    if (file == null) return
    if (fileName == null) return
    const uploadDataInput: UploadDataInput = {
      key: fileName,
      data: file,
      options: {
        accessLevel: storageAccessLevel
      }
    }
    try {
      setIsLoading(true)
      const uploadDataOutput = uploadData(uploadDataInput)
      const result = await uploadDataOutput.result
      console.log(result)
      toast.success('Upload success.')
      setFileName('')
      setFile(null)
      mutate()
    } catch (error) {
      toast.error('Upload failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form.Group controlId='formBasicName' className='mt-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder='Enter name' value={fileName} onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { target } = event
          if (target == null) return
          const value = target.value
          setFileName(value)
        }} />
      </Form.Group>
      <Form.Group controlId='formBasicFile' className='mt-3'>
        <Form.Label>File</Form.Label>
        <Form.Control type='file' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { target: { files } } = event
          if (files == null) return
          const file = files[0]
          setFile(file)
          setFileName(file.name)
        }} />
      </Form.Group>
      <Button variant='primary' onClick={() => { void uploadFile() }} className='mt-3' disabled={buttonIsDisabled || isLoading}>Upload</Button>
      {isLoading && <p>Uploading...</p>}
    </>
  )
}
