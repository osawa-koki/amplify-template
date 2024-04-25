'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { Button } from 'react-bootstrap'
import { BsGearFill } from 'react-icons/bs'

import { useAuthenticator } from '@aws-amplify/ui-react'

import pages from '@/pages'

interface Props {
  currentPage: string | null
}

function Menu (props: Props): React.JSX.Element {
  const { currentPage } = props

  const { user, signOut } = useAuthenticator((context) => [context.user])

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <>
      <div id='Menu' className={menuOpen ? 'on' : ''}>
        <>
          {pages.map((page, index: number) => {
            return (
              <Link
                key={index}
                href={page.path}
                className={`btn ${
                  currentPage === page.path
                    ? 'btn-primary active'
                    : ''
                }`}
              >
                {page.emoji}&nbsp;{page.name}
              </Link>
            )
          })}
          {user != null && (
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to sign out?')) signOut?.()
              }}
              className='btn btn-secondary mt-5'
            >
              Sign Out
            </Button>
          )}
        </>
      </div>
      <div id='ToMenu'>
        <Button
          id='Closer'
          variant='primary'
          className={`btn-close btn-close-white ${menuOpen ? 'on' : ''}`}
          onClick={() => {
            setMenuOpen(false)
          }}
        ></Button>
        <BsGearFill
          id='Opener'
          className={menuOpen ? 'off' : ''}
          onClick={() => {
            setMenuOpen(true)
          }}
        ></BsGearFill>
      </div>
    </>
  )
}

export default Menu
