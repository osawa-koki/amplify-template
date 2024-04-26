'use client'

import React from 'react'
import { Table } from 'react-bootstrap'

import Modal from '@/components/Modal'

function statusCodeToText (statusCode: number): string {
  const statusStr = statusCode.toString()
  switch (true) {
    case statusStr.startsWith('1'):
      return 'Informational'
    case statusStr.startsWith('2'):
      return 'Success'
    case statusStr.startsWith('3'):
      return 'Redirection'
    case statusStr.startsWith('4'):
      return 'Client Error'
    case statusStr.startsWith('5'):
      return 'Server Error'
    default:
      return 'Unknown'
  }
}

function statusCodeToEmoji (statusCode: number): string {
  const statusStr = statusCode.toString()
  switch (true) {
    case statusStr.startsWith('1'):
      return '🟡'
    case statusStr.startsWith('2'):
      return '🟢'
    case statusStr.startsWith('3'):
      return '🟡'
    case statusStr.startsWith('4'):
      return '🔴'
    case statusStr.startsWith('5'):
      return '🔴'
    default:
      return '❓'
  }
}

interface Props {
  functionResponse: FunctionResponse | null
  closeModal: () => void
}

export default function FunctionResponseModal (props: Props): React.JSX.Element {
  const { functionResponse, closeModal } = props

  if (functionResponse == null) return <></>

  return (
    <>
      <Modal modalIsOpen={functionResponse != null} closeModal={closeModal}>
        <h1>Function Response</h1>
        <Table>
          <tbody>
            <tr>
              <td className='text-nowrap'>Status Code</td>
              <td>
                {statusCodeToEmoji(functionResponse.statusCode)} {functionResponse.statusCode} {statusCodeToText(functionResponse.statusCode)}
              </td>
            </tr>
            <tr>
              <td className='text-nowrap'>Body</td>
              <td>
                <pre>
                  {JSON.stringify(JSON.parse(functionResponse.body), null, 2)}
                </pre>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </>
  )
}
