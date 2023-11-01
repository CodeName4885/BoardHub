import { Button as Btn } from "antd";

export function GameDetailItem({ game }) {
    const gameInfoStyle = {
        fontSize: "30px",
        fontWeight: "bold",
        color: "black",
    };

    return (
        <>
            <div
                className="review-cover col-md-4 mr-4"
                style={{
                    backgroundImage: `url("${game.image}")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    maxWidth: 350,
                    minHeight: 470,
                }}
            ></div>
            <div className="review-cover mt-2">
                <h4 style={{ fontWeight: "bold" }}>종합 순위</h4>
                <div className="row mt-2">
                    <div className="mt-1 ml-3">
                        <h4>
                            {game.orgTitle} ({game.releaseDate})
                        </h4>
                        <h4>{game.title}</h4>
                    </div>
                </div>
                <div>
                    <div className="row text-center ml-2 mt-5">
                        <div className="mr-4">
                            <span style={gameInfoStyle}>
                                {game.minPlayer == game.maxPlayer
                                    ? `${game.maxPlayer} 명`
                                    : `${game.minPlayer}~${game.maxPlayer}명`}
                            </span>
                            <p>인원</p>
                        </div>
                        <div className="mr-4">
                            <span style={gameInfoStyle}>
                                {game.playingTime}분
                            </span>
                            <p>평균 플레이 시간</p>
                        </div>
                        <div className="mr-4">
                            <span style={gameInfoStyle}>
                                {game.minAge > 0
                                    ? `${game.minAge}세 이상`
                                    : "ALL"}
                            </span>
                            <p>사용 연령</p>
                        </div>
                    </div>
                    <div className="ml-2 mt-3">
                        <h4>좋아요 : 43개</h4>
                        <h4 className="mt-2">찜 : 53개</h4>
                    </div>
                    <div className="row ml-2 mt-4">
                        <Btn type="primary" className="mr-3">
                            좋아요
                        </Btn>
                        <Btn type="primary">찜</Btn>
                    </div>
                </div>
            </div>
        </>
    );
}
