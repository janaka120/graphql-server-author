import { useQuery } from '@apollo/client';
import './App.css';
import { GET_GAMES } from './AuthorQuery';

function App() {

  const {loading, error, data} = useQuery(GET_GAMES);

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
    </>
  )
}

export default App
