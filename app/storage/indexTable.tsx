' use client'

import React from 'react'
import { getUrl, remove } from 'aws-amplify/storage'
import { Table } from 'react-bootstrap'

import { IoReloadSharp } from 'react-icons/io5'
import { FaDownload } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'

import { toast } from 'react-toastify'

import dayjs from 'dayjs'

interface Props {
  files: StorageItem[]
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  mutate: () => Promise<void>
}

export default function ListfilesComponent (props: Props): React.JSX.Element {
  const { files, isLoading, setIsLoading, mutate } = props

  return (
    <>
      <IoReloadSharp onClick={() => {
        setIsLoading(true)
        mutate()
          .then(() => {
          })
          .catch((error) => {
            console.error(error)
            toast.error('Failed to load files.')
          })
          .finally(() => {
            setIsLoading(false)
          })
      }} className={`${isLoading ? 'bg-secondary' : ''} border my-1`} role='button' />
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>size</th>
            <th>lastModified</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            return (
              <tr key={file.key}>
                <td>{file.key}</td>
                <td>{file.size}</td>
                <td>{file.lastModified != null ? dayjs(file.lastModified).format('YYYY-MM-DD HH:mm:ss') : 'undefined'}</td>
                <td>
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <FaDownload onClick={async () => {
                    const getUrlResult = await getUrl({
                      key: file.key,
                      options: {
                        accessLevel: 'private'
                      }
                    })
                    const url = getUrlResult.url.href
                    const a = document.createElement('a')
                    a.href = url
                    a.download = file.key
                    a.click()
                    a.remove()
                  }} role='button' />
                </td>
                <td>
                  <FaTrash onClick={() => {
                    if (!window.confirm('Are you sure you want to delete this file?')) return
                    try {
                      void remove({
                        key: file.key,
                        options: {
                          accessLevel: 'private'
                        }
                      })
                      toast.success('File deleted.')
                    } catch (error) {
                      console.error(error)
                      toast.error('Failed to delete file.')
                    } finally {
                      void mutate()
                    }
                  }} role='button' className='text-danger' />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
