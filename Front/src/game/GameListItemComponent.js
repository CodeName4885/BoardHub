import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function GameListItemComponent(item) {
    console.log(item.games);
    const navigate = useNavigate();

    function onClick(e) {
        navigate(`/game/detail/${e.target.id}`);
    }

    return (
        <>
            <div className="col-lg-3 col-md-6 mt-5">
                <div className="review-item">
                    <div
                        className="review-cover"
                        style={{
                            backgroundImage: `url("${item.games.image}")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            cursor: "pointer",
                        }}
                        id={`${item.games.gameId}`}
                        onClick={onClick}
                    >
                        <div className="score yellow">9.3</div>
                    </div>
                    <div className="review-text">
                        <h5
                            id={`${item.games.gameId}`}
                            style={{ cursor: "pointer" }}
                            onClick={onClick}
                        >
                            {item.games.orgTitle}
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}
