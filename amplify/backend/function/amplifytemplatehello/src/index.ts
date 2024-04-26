// @ts-nocheck

/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk')

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["piyopiyo"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise()

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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
  const { Parameter } = await ssm.getParameter({
    Name: process.env[secretName],
    WithDecryption: true
  }).promise()
  return Parameter?.Value ?? null
}

exports.handler = async (event: APIGatewayProxyEvent): APIGatewayProxyResult => {
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
