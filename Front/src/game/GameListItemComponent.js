import { useState } from "react";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function GameListItemComponent(item) {
    console.log(item)

    return (
        <>
            <div className="col-lg-3 col-md-6">
                <div className="review-item">
                    <div
                        className="review-cover"
                        style={{
                            backgroundImage: `url("${item.games.image}")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                    >
                        <div className="score yellow">9.3</div>
                    </div>
                    <div className="review-text">
                        <h5>{item.games.eng_title}</h5>
                    </div>
                </div>
            </div>
        </>
    );
}
