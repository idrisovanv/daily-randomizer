# Developer's list dashboard with daily list randomizer

This project consits of server and client directories. The client project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using template [redux-saga-typescript](https://github.com/dulajdeshan/cra-template-redux-saga-typescript). The server project was bootstrapped with [TypeScript Express Starter](https://github.com/ljlm0402/typescript-express-starter) using template Sequelize.

## Server

### Running on the local machine

### In `server` directory:

1. Create local environment file `.env.development.local`. Example of file content is in ` .env.development.local.sample`. Edit to your local postgres db credentials.
2. Run `npm i` to install npm modules
3. Run `npx sequelize db:create` to create database from env file if doesn't exist.
4. Run `npm run dev` to run server
5. Endpoints swagger docs will be available on `/api-docs` dir

## Client

### Running on the local machine

### In `client` directory:

1. Create local environment file `.env`. Example of file content is in ` .env.sample`.
2. Run `npm i` to install npm modules
3. Run `npm start` to run server
