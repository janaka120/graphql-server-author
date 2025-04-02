// ExampleQuery.js
import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetAllGames {
    games {
        id,
        title
    }
  }
`;


export const ADD_GAME = gql`
  mutation AddGame($gameObj: AddGameInput!) {
    createGame(game: $gameObj) {
      id,
      title
    }
  }
`