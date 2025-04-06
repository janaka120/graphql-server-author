import { useEffect, useState } from 'react';
import './App.css';
import CreateGame from './components/CreateGame';
import ListingGames, { GameI } from './components/ListingGames';
import { AppContext } from './AppContext';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from './AuthorQuery';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGame] = useState<GameI | null>(null);
  const {loading, data, error, refetch } = useQuery(GET_GAMES);
  
  useEffect(() => {
    if(data && data.games) {
      setGames(data.games);
    }
  }, [data?.games]);

  const selectGameItem = (id: string) => {
    const gameObj = games?.find((g: GameI) => g.id === id);
    if(gameObj) {
      const {id, title, platform} = gameObj;
      setSelectedGame({id, title, platform});
    }
  }

  return (
    <AppContext.Provider value={{games}}>
      <CreateGame refetchGames={refetch} selectedGame={selectedGames} />
      <ListingGames loading={loading} errorMessage={error?.message} itemClick={selectGameItem} />
    </AppContext.Provider>
  )
}

export default App;
