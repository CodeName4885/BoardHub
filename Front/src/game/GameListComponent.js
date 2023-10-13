import { useEffect, useState } from "react";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { GameListItemComponent } from "./GameListItemComponent";
import { API_URL, GAME_LIST } from "../Constants";

export function GameListComponent() {

    const [url, setUrl] = useState(API_URL + GAME_LIST);
    const [games, setGames] = useState([]);

    useEffect(() => {
        getApi(url)
    }, []);

    async function getApi(url) {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        setGames(data)
    }

    return (
        <>
            <div class="row">
                {games.map((item) => (
                    <GameListItemComponent games={item} />
                ))}
            </div>
        </>
    );
}
