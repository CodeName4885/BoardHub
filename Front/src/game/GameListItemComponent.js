import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
                            marginBottom: 7,
                        }}
                        id={`${item.games.gameId}`}
                        onClick={onClick}
                    ></div>
                    <div className="review-text">
                        <a>
                            <Title
                                level={4}
                                id={`${item.games.gameId}`}
                                onClick={onClick}
                            >
                                {item.games.title}
                            </Title>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
