// ExampleQuery.js
import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetAllGames {
    games {
        id,
        title,
        platform
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

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $editGame: EditGameInput!) {
    updateGame(id: $id, editGame: $editGame) {
      id,
      title
    }
  }
`

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`