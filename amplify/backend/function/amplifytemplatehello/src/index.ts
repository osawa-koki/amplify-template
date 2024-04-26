/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  hogehoge
Amplify Params - DO NOT EDIT */

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import AWS from 'aws-sdk'

const ssm = new AWS.SSM()

const getSecret = async (secretName: string): Promise<string | null> => {
  const secretPath = process.env[secretName]
  if (secretPath == null) return null
  const { Parameter } = await ssm.getParameter({
    Name: secretPath,
    WithDecryption: true
  }).promise()
  return Parameter?.Value ?? null
}

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
      envVars: process.env,
      secret: await getSecret('piyopiyo')
    })
  }
}
