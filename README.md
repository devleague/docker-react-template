Use `npm run start` to start the react server

`docker-compose up` to start the backend server along with postgres and redis.

`
"proxy": "http://localhost:8080",
"nodemonConfig": {
  "watch": ["server"]
},
`
The above configurations tells the react proxy server to redirect all api calls to the backend docker instance. The `nodemonConfig` tells nodemon to only watch the server dir.

The way the knexfile is setup, there is a single configuration shared by both development and production.

Migrations and Seeds are now run automatically on launching the express docker container via the deploy-*.js files. It also launches the server with node in production mode or launches nodemon watching all files in development mode.
