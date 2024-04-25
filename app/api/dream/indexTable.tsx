'use client'

import React from 'react'

import { Alert, Spinner, Table } from 'react-bootstrap'
import Link from 'next/link'
import { IoOpenOutline } from 'react-icons/io5'
import { IoMdDoneAll } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import dayjs from 'dayjs'

import { type Dream } from '@/src/API'
import { useAuthenticator } from '@aws-amplify/ui-react'

interface Props {
  dreams: Dream[] | null | Error
}

export default function DreamIndexTable (props: Props): React.JSX.Element {
  const { dreams } = props

  const { user } = useAuthenticator((context) => [context.user])

  if (dreams == null) {
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

  if (dreams instanceof Error) {
    return (
      <Alert variant='danger' className='my-3'>
        {dreams.message}
      </Alert>
    )
  }

  if (dreams.length === 0) {
    return (
      <Alert variant='warning' className='my-3'>
        No dreams found
      </Alert>
    )
  }

  return (
    <>
      <Table className='my-3'>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>description</th>
            <th>due date</th>
            <th>done</th>
            <th>yours?</th>
          </tr>
        </thead>
        <tbody>
          {dreams.map((dream) => (
            <tr key={dream.id}>
              <td>
                <Link href={`/api/dream/show?dream-id=${dream.id}`}><IoOpenOutline /></Link>
              </td>
              <td>{dream.name}</td>
              <td>{dream.description}</td>
              <td>{dayjs(dream.dueDate).format('YYYY-MM-DD')}</td>
              <td>{dream.done ?? false ? <IoMdDoneAll className='text-primary' /> : <MdCancel className='text-secondary' />}</td>
              <td>{dream.owner === user.userId ? <FaCheck className='text-success' /> : <></>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
