import { useContext } from "react";
import { AppContext, Games } from "../AppContext";
import GameItem from "./GameItem";
import { ApolloQueryResult } from "@apollo/client";

export interface GameI {
    id: string;
    title: string;
    platform?: string[];
}
interface ListingGamesI {
    loading: boolean;
    errorMessage?: string;
    itemClick: (id: string) => void;
    refetchGames: (variables?: {gameObj: Games} | undefined) => Promise<ApolloQueryResult<any>>;
}
const ListingGames = ({loading, errorMessage, itemClick, refetchGames}: ListingGamesI) => {

    const {games} = useContext(AppContext);

    if(loading) {
        return <div>Loading...</div>
    }

    if(errorMessage) {
        return <div>{errorMessage}</div>
    }

    const onItemDeleteHandler = (id: string) => {
        itemClick(id);
    }

    const onItemUpdateHandler = (id: string) => {
        itemClick(id);
    }

    return(
        <>
            <h1 className="text-3xl font-bold underline pb-4">Listing Games</h1>
            {games.map((game: GameI) => {
                return (
                <GameItem key={game.id} game={game} updateItem={onItemDeleteHandler} deleteItem={onItemUpdateHandler} refetchGames={refetchGames} />
            )})}
        </>
    )
}

export default ListingGames;