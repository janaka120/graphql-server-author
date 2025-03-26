import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './schema.js'

import db from './_db.js';

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    authors() {
      return db.authors
    },
    reviews() {
      return db.reviews
    },
    review(parent, args) {
      return db.reviews.find(review => review.id === args.id)
    },
    game(parent, args) {
      return db.games.find(game => game.id === args.id)
    },
    author(parent, args) {
      return db.authors.find(author => author.id === args.id)
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(r => r.game_id === parent.id)
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(r => r.author_id === parent.id)
    }
  }
}

const server = new ApolloServer({
    typeDefs, //-- definitions of types of data, author
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log('Server ready at port', 4000);