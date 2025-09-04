import { geoguessrGames } from "./geoguessr-registry";
import { miscGames } from "./misc-registry";
import { regularGames } from "./regular-registry";

export const games = [...geoguessrGames, ...regularGames, ...miscGames];
