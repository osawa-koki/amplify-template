'use client'

import React, { useState } from 'react'

import { Alert, Badge, Button, Form, Table } from 'react-bootstrap'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { IoIosHome } from 'react-icons/io'
import dayjs from 'dayjs'
import { FaCheckDouble } from 'react-icons/fa'
import { MdCancelPresentation } from 'react-icons/md'

import { type Dream } from '@/src/API'
import { updateDream } from '@/src/graphql/mutations'
import { graphqlClient } from '@/app/layout'
import DreamDeleteComponent from './delete'
import { useAuthenticator } from '@aws-amplify/ui-react'

const indexUrl = '/api/?selected=Dream'

interface Props {
  dream: Dream
  setDream: (dream: Dream) => void
}

export default function DreamShowComponent (props: Props): React.JSX.Element {
  const { dream, setDream } = props

  const { user } = useAuthenticator((context) => [context.user])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [tmpName, setTmpName] = useState<string | null>(null)
  const [tmpDescription, setTmpDescription] = useState<string | null>(null)
  const [tmpDueDate, setTmpDueDate] = useState<string | null>(null)

  const execUpdateDreamRecord = (key: string, value: string | boolean, reset: () => void): void => {
    setIsLoading(true)
    graphqlClient.graphql({
      query: updateDream,
      variables: {
        input: {
          id: dream.id,
          [key]: value
        }
      },
      authMode: 'apiKey'
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
      {dream.id !== user.userId && (
        <Alert variant='warning' className='my-3'>
          This is not your dream.
          <br />
          You can only view it.
        </Alert>
      )}
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
          <tr>
            <td>Status</td>
            <td>
              {(dream.done ?? false)
                ? (
                <Badge bg='success'>
                  <FaCheckDouble /> Done
                </Badge>
                  )
                : (
                <Badge bg='warning'>
                  <MdCancelPresentation /> Not yet
                </Badge>
                  )}
            </td>
            <td></td>
            <td></td>
          </tr>
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
      <div className='d-flex align-items-center'>
        <Button
          variant='primary'
          onClick={execUpdateDream}
          className='me-2'
          disabled={isLoading || (tmpName == null && tmpDescription == null)}
        >
          Update All
        </Button>
        <Button
          variant='info'
          onClick={() => { execUpdateDreamRecord('done', !(dream.done ?? false), () => {}) }}
          size='sm'
          disabled={isLoading}
        >
          {(dream.done ?? false) ? 'Undone' : 'Done'}
        </Button>
      </div>
      <hr />
      <DreamDeleteComponent id={dream.id} indexUrl={indexUrl} />
    </>
  )
}
