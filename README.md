Use `npm run start` to start the react server

`docker-compose up` to start the backend server along with postgres and redis.

`
"proxy": "http://localhost:8080",
"nodemonConfig": {
  "watch": ["server"]
},
`
The above configurations tells the react proxy server to redirect all api calls to the backend docker instance. The `nodemonConfig` tells nodemon to only watch the server dir.

The way the knexfile is setup, the development section allow the user to run the knex migration from the host computer and is routed to the docker instance using localhost. The production section is used by docker to setup the postgres DB and it's connections to the rest of the docker containers.

This is controlled using the `ENVIRONMENT` property within the docker-compose.override.yml file, under the environment section.

`knex migrate:latest` will run any migrations made, but this needs to be run in the server dir as that is where the knexfile.js is.

The `npm run dev` script within the package.json file sets up the how docker is going to run the express server using nodemon.
