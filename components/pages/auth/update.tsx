import React, { useEffect, useState } from 'react'
import { type FetchUserAttributesOutput } from 'aws-amplify/auth'
import Modal from '../../Modal'
import { Badge, Form, Table } from 'react-bootstrap'

interface Props {
  modalIsOpen: boolean
  closeModal: () => void
  initialValues: FetchUserAttributesOutput | null
}

export default function UpdateComponent (props: Props): React.JSX.Element {
  const { initialValues, modalIsOpen, closeModal } = props
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(initialValues)

  useEffect(() => {
    setAttributes(initialValues)
  }, [initialValues])

  return (
    <>
      <Modal modalIsOpen={modalIsOpen} closeModal={() => { setAttributes(initialValues); closeModal() }}>
        <h1>Update User Attributes</h1>
        <pre>{JSON.stringify(initialValues, null, 2)}</pre>
        <hr />
        <Table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sub</td>
              <td>
                <Form.Control
                  type='text'
                  value={attributes?.sub}
                  onChange={(e) => {
                    setAttributes({ ...attributes, sub: e.target.value })
                  }}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <Form.Control
                  type='email'
                  value={attributes?.email}
                  onChange={(e) => {
                    setAttributes({ ...attributes, email: e.target.value })
                  }}
                  disabled
                />
                {attributes?.email_verified === 'true'
                  ? (
                  <Badge bg='primary'>Verified</Badge>
                    )
                  : (
                  <Badge bg='warning'>Not Verified</Badge>
                    )}
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <Form.Control
                  type='text'
                  value={attributes?.name}
                  onChange={(e) => {
                    setAttributes({ ...attributes, name: e.target.value })
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Birthday</td>
              <td>
                <Form.Control
                  type='date'
                  value={attributes?.birthdate}
                  onChange={(e) => {
                    setAttributes({ ...attributes, birthdate: e.target.value })
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </>
  )
}
