import { useMutation, useQuery } from '@apollo/client';
import './App.css';
import { GET_GAMES, ADD_GAME } from './AuthorQuery';

function App() {

  const {loading, error, data} = useQuery(GET_GAMES);
  const [createGame] = useMutation(ADD_GAME);

  const createGameHandler = () => {
    createGame({
      variables : {
        "gameObj": {
          "title": "Test Game - 3",
          "platform": ["Action", "Art"]
        },
      }
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>Listing All Games</div>
      {
        data.games.map((d: { id: string; title: string }) => {
          return <div key={d.id}>{d.title}</div>
        })
      }
      <button onClick={createGameHandler}>Add Game</button>
    </>
  )
}

export default App
