# graphql-server-author

## Apollo docs
https://www.apollographql.com/docs/apollo-server/getting-started

### Step 1: Create a new project
mkdir graphql-server-example
cd graphql-server-example

npm init --yes && npm pkg set type="module"

### Step 2: Install dependencies

npm install @apollo/server graphql


### Step 3: Define your GraphQL schema

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;


Query by review id, game id, author id
`
query ReviewQuery($reviewId: ID!, $gameId: ID!, $authorId: ID!) {
  review(id: $reviewId) {
    rating
    content
  },
  game(id: $gameId) {
    id,
    title
  },
  author(id: $authorId) {
    id,
    name
  }
}

`