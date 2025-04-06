import { createContext } from "react";
import { GameI } from "./components/ListingGames";

export type Games = GameI[]

type InitValuesType = {games: Games}

export const initValues: InitValuesType = {
    games: []
}

const AppContext = createContext(initValues);

export {AppContext}