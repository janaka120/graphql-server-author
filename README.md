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


### Query by review id, game id, author id
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
// variables
`
{
  "reviewId": "1",
  "gameId": "2",
  "authorId": "3"
}
`

### Add schema relation, query game review
`
export const typeDefs = #graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
`

resolvers - When someone asks for the reviews of a Game, find all the reviews in our database where the game_id matches the id of the Game they're asking about, and return those reviews.
The resolver function:

1. Receives the parent object: This object represents the Game for which the reviews field is being queried.
2. Filters db.reviews: It uses the filter() method to create a new array containing only the reviews where the game_id property matches the id property of the parent (the current game).
3. Returns the filtered array: The resolver returns the resulting array of reviews, which represents the reviews associated with the specified game.
`
const resolvers = {
  Query: {
    review(parent, args) {
      return db.reviews.find(review => review.id === args.id)
    },
    game(parent, args) {
      return db.games.find(game => game.id === args.id)
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(r => r.game_id === parent.id)
    }
  }
}
`

Query - Apollo sever 
`
query queryGameReviews($gameId: ID!) {
  game(id: $gameId) {
    id,
    platform,
    reviews {
      id,
      rating,
      content
    }
  }
}
`

### Mutation - create, update, delete, In GraphQL, Mutation is a root type, similar to Query. It's used for operations that modify data on the server (e.g., creating, updating, or deleting).
// trigger mutation by Apollo Server
`
mutation DeleteGame($gameId: ID!) {
  deleteGame(id: $gameId) {
    id,
    title
  }
}
`
// variables
`
{
  gameId: "1"
}
`

#### Create Game

`input AddGameInput { title: String platform: [String!] }`

input AddGameInput:
input is a special type in GraphQL used for defining the structure of arguments passed to mutations.
It's similar to a regular object type, but it's specifically designed for input values.

`
type Mutation {
  createGame(game: AddGameInput): Game
}
`

This defines a mutation named createGame.
game: AddGameInput:
This specifies that the createGame mutation accepts a single argument named game.
AddGameInput is the type of this argument. This means the client must provide data conforming to the AddGameInput structure.