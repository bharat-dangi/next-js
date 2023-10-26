# Steps to run project on local machine
* Clone this project first.
* Then follow below steps:

## Server
* Go to server directory and create .env file.
* Go to server directory on cmd.
* .env sample is below and fill your values:
```
ADDRESS_CHECK_URL= <API_URL>
ADDRESS_CHECK_API_KEY= <API_KEY>
PORT= <PORT_NUMBER>
```
* Then switch to node version 16 and run `npm i`
* Then run command `npm run start:dev`

### To run unit tests
* You need to run command `npm run test-unit` under server directory.

## Client
* Go to client directory and create .env file.
* Go to client directory on cmd.
* .env sample is below and fill your values:
```
NEXT_PUBLIC_GRAPHQL_API= http://localhost:{YOUR_SERVER_PORT}/graphql
```
* Then switch to node version 16 and run `npm i`
* Then run command `npm run build`
* Then run command `npm start`