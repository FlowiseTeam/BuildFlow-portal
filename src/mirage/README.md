## What is this and why is it here?

Mirage.js server that is used to mock API calls during development. It is **not used in production**. The Mirage.js server is only initialized when the environment mode is set to development. This is done in the api.ts file. **Mirage.js intercepts all fetch requets, api calls are not visible in network tab.**

## How do I use it?

The Mirage.js server is initialized in the api.ts file. The server is only initialized when the environment mode is set to development.

## How to use it?

mockMirageServer.ts is the entry point for the Mirage.js server.

- models are used to define the database schema,
- factories are used to generate data,
- seeds are used to populate the database with data,
- routes are used to define the API endpoints,

## Folder structure

mirageMockServer.js // entry point for the Mirage.js server
├── factories // used to generate data
├── models // models
├── routes // used to define the API endpoints
└── seeds // used to populate the database with data
└── user.ts

## Keep in mind

- api endpoints must be passed to mockMirageServer(), otherwise it will throw inicialization error (wtf)
- all entities are forced to have additional **id** field
  - production: {\_id: 1, name: 'John Doe'}
  - mirage: {id: 1, name:, \_id: 1, 'John Doe'}
- TS support is bad
