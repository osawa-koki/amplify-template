'use client'

import React, { useState } from 'react'

import { Button, Form, Table } from 'react-bootstrap'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { IoIosHome } from 'react-icons/io'
import dayjs from 'dayjs'

import { type Dream } from '@/src/API'
import { updateDream } from '@/src/graphql/mutations'
import { graphqlClient } from '@/app/layout'
import DreamDeleteComponent from './delete'

const indexUrl = '/api/?selected=Dream'

interface Props {
  dream: Dream
  setDream: (dream: Dream) => void
}

export default function DreamShowComponent (props: Props): React.JSX.Element {
  const { dream, setDream } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tmpName, setTmpName] = useState<string | null>(null)
  const [tmpDescription, setTmpDescription] = useState<string | null>(null)
  const [tmpDueDate, setTmpDueDate] = useState<string | null>(null)

  const execUpdateDreamRecord = (key: string, value: string, reset: () => void): void => {
    setIsLoading(true)
    graphqlClient.graphql({
      query: updateDream,
      variables: {
        input: {
          id: dream.id,
          [key]: value
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated dream')
        const data = result.data.updateDream
        setDream(data)
        reset()
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update dream')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const execUpdateDream = (): void => {
    const newName = tmpName ?? dream.name
    const newDescription = tmpDescription ?? dream.description
    const newDueDate = tmpDueDate ?? dream.dueDate
    if (newName === dream.name && newDescription === dream.description && newDueDate === dream.dueDate) {
      toast.info('No changes')
      return
    }
    graphqlClient.graphql({
      query: updateDream,
      variables: {
        input: {
          id: dream.id,
          name: newName,
          description: newDescription,
          dueDate: newDueDate
        }
      },
      authMode: 'userPool'
    })
      .then((result) => {
        toast.success('Updated dream')
        const data = result.data.updateDream
        setDream(data)
        setTmpName(null)
        setTmpDescription(null)
        setTmpDueDate(null)
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to update dream')
      })
  }

  return (
    <>
      <Link href={indexUrl}>
        <IoIosHome />
      </Link>
      <Table className='my-3'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            [
              { name: 'name', tmpValue: tmpName, value: dream.name, setFn: setTmpName, type: 'text' },
              { name: 'description', tmpValue: tmpDescription, value: dream.description, setFn: setTmpDescription, type: 'text' },
              { name: 'dueDate', tmpValue: tmpDueDate, value: dream.dueDate, setFn: setTmpDueDate, type: 'date' }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  <Form.Control
                    type={item.type}
                    value={item.tmpValue ?? item.value ?? ''}
                    onChange={(e) => { item.setFn(e.target.value) }}
                  />
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='secondary'
                      onClick={() => { item.setFn(null) }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
                <td>
                  {(item.tmpValue != null || (item.tmpValue ?? item.value) !== item.value) && (
                    <Button
                      variant='primary'
                      onClick={() => {
                        const value = item.tmpValue
                        if (value == null) return
                        execUpdateDreamRecord(item.name, value.toString(), () => { item.setFn(null) })
                      }}
                      disabled={isLoading}
                    >
                      Update
                    </Button>
                  )}
                </td>
              </tr>
            ))
          }
          {
            [
              { name: 'createdAt', value: dream.createdAt },
              { name: 'updatedAt', value: dream.updatedAt }
            ].map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{dayjs(item.value).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <hr />
      <Button
        variant='primary'
        onClick={execUpdateDream}
        disabled={isLoading || (tmpName == null && tmpDescription == null)}
      >
        Update All
      </Button>
      <hr />
      <DreamDeleteComponent id={dream.id} indexUrl={indexUrl} />
    </>
  )
}
