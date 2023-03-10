import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.mjs';

let port = 3000;
const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);