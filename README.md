## Dependencies
This project uses Node.js v20.8.0 (npm 10.1.0). It might not work with other versions. If you are using different versions of Node on your computer please consider using nvm (https://github.com/nvm-sh/nvm/blob/master/README.md).

## Installation

```bash
$ npm install
```

## To set up the app 

```bash
# copy env file
$ cp .env.example .env

# copy docker-compose file
$ cp docker-compose.example.yml docker-compose.yml

# spins up the DB
$ docker-compose up

# initial migration to create the tables & constraints
$ npm run migration:run
```

## Test

```bash
# unit tests
$ npm run test:unit

# repository tests
$ npm run test:repo

# e2e tests
$ npm run test:e2e

# all
$ npm run test
```
