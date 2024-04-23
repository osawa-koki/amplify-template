'use client'

import React from 'react'
import { Button, Table } from 'react-bootstrap'

import { useAuthenticator } from '@aws-amplify/ui-react'

export default function App (): React.JSX.Element {
  const { user, signOut } = useAuthenticator((context) => [context.user])

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
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.signInDetails?.loginId}</td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <Button variant='primary' onClick={signOut}>Sign Out</Button>
    </>
  )
}
