## What is this and why is it here?

Mirage.js server that is used to mock API calls during development. It is **not used in production**. The Mirage.js server is only initialized when the environment mode is set to development. This is done in the api.ts file. **Mirage.js intercepts all fetch requets, api calls are not visible in network tab.**

## How do I use it?

The Mirage.js server is initialized in the api.ts file. The server is only initialized when the environment mode is set to development.

mockMirageServer.ts is the entry point for the Mirage.js server.

- models are used to define the database schema,
- factories are more complex way to generate data,
- seeds are simple way to generate data,
- routes are used to define the API endpoints,

# Why do I want to use it?

Mirage.js is a powerful library for creating a mock server with relational data models in JavaScript applications, enabling developers to simulate API endpoints and complex database relationships, which is essential for accurately developing and testing frontend functionalities in the absence of a real backend.

## Folder structure

mirageMockServer.js // entry point for the Mirage.js server
├── factories // used to generate data
├── models // models
├── routes // used to define the API endpoints
└── seeds // used to populate the database with data

## Keep in mind

- api endpoints must be passed to mockMirageServer(), otherwise it will throw inicialization error
- all entities are forced to have additional **id** field
  - production: {\_id: 1, name: 'John Doe'}
  - mirage: {id: 1, name:, \_id: 1, 'John Doe'}
- TS support is bad
