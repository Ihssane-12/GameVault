import { gameList } from "./data.js";
import { appState } from "./state.js";

export function getVisibleGames() {
  return gameList.filter((game) => {
    const categoryOk = appState.selectedCategory === 'All' || game.genre === appState.selectedCategory;
    const searchOk = game.title.toLowerCase().includes(appState.searchText.toLowerCase().trim());
    return categoryOk && searchOk;
  });
}