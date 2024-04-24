'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { type FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth'
import ShowComponent from '../../components/pages/auth/show'
import UpdateComponent from '../../components/pages/auth/update'

export default function App (): React.JSX.Element {
  const { user, signOut } = useAuthenticator((context) => [context.user])
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null)

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)
  const openUpdateModal = (): void => { setUpdateModalIsOpen(true) }
  const closeUpdateModal = (): void => { setUpdateModalIsOpen(false) }

  useEffect(() => {
    if (user == null) return
    fetchUserAttributes()
      .then((result) => {
        setAttributes(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [user])

  if (user == null) {
    return (
      <Alert variant='danger'>
        You are not signed in.
      </Alert>
    )
  }

  return (
    <>
      <ShowComponent attributes={attributes} />
      <UpdateComponent modalIsOpen={updateModalIsOpen} closeModal={closeUpdateModal} initialValues={attributes} />
      <hr />
      <div className='d-flex'>
        <Button variant='primary' className='me-2' onClick={openUpdateModal}>Update</Button>
        <Button variant='secondary' className='me-2' onClick={() => { if (window.confirm('Are you sure you want to sign out?')) signOut?.() }}>Sign Out</Button>
      </div>
    </>
  )
}
