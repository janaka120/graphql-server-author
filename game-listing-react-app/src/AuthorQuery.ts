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