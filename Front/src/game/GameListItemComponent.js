import { useNavigate } from "react-router-dom";

export function GameListItemComponent(item) {
    const navigate = useNavigate();

    function onClick(e) {
        navigate(`/game/detail/${e.target.id}`);
    }

    return (
        <>
            <div>
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
                        {/* <div className="score yellow">9.3</div> */}
                    </div>
                    <div className="review-text">
                        <h5
                            id={`${item.games.gameId}`}
                            style={{ cursor: "pointer" }}
                            onClick={onClick}
                        >
                            {item.games.title}
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}
