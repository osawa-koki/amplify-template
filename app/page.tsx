'use client'

import React from 'react'
import Image from 'next/image'

import { useAuthenticator } from '@aws-amplify/ui-react'

import setting from '../setting'

export default function Home (): React.JSX.Element {
  const { user } = useAuthenticator((context) => [context.user])
  return (
    <>
      <div id='Index' className='d-flex flex-column align-items-center'>
        {JSON.stringify(user)}
        <h1>{setting.title}</h1>
        <Image id='Logo' className='mt-3 mw-100 border rounded-circle' width={100} height={100} src='/tako.png' alt='Logo' />
      </div>
    </>
  )
}
