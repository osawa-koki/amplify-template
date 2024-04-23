'use client'

import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Table } from 'react-bootstrap'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { type FetchUserAttributesOutput, fetchUserAttributes } from 'aws-amplify/auth'

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

  if (attributes == null) {
    return (
      <Alert variant='warning'>
        Fetching user attributes...
      </Alert>
    )
  }

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sub</td>
            <td>{attributes.sub}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              {attributes.email}
              {attributes.email_verified === 'true'
                ? (
                <Badge bg='primary' className='ms-3'>Verified</Badge>
                  )
                : (
                <Badge bg='warning' className='ms-3'>Not Verified</Badge>
                  )}
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{attributes.name}</td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <Button variant='primary' onClick={signOut}>Sign Out</Button>
    </>
  )
}
