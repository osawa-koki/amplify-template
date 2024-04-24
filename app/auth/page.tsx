'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { type FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth'
import ShowComponent from '../../components/pages/auth/show'

export default function App (): React.JSX.Element {
  const { user, signOut } = useAuthenticator((context) => [context.user])
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null)

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
      <hr />
      <Button variant='secondary' onClick={() => { if (window.confirm('Are you sure you want to sign out?')) signOut?.() }}>Sign Out</Button>
    </>
  )
}
