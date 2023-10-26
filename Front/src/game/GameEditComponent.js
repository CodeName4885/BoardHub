import { useEffect } from "react";
import { editGame } from "../repositories/GameRepository";

export function GameEditComponent() {
    useEffect(() => {}, []);

    function applyEdit(e) {
        console.log(e);
        // await editGame();
    }

    return (
        <section className="spad">
            <div className="container">
                <form onSubmit={applyEdit}>
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>썸네일</h5>
                            </div>
                            <input /> 파일 선택
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 이미지 </h5>
                            </div>
                            <input /> 파일 선택
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임명 </h5>
                            </div>
                            <div>
                                <input /> 영문 (원제)
                                <input /> 한글
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>출시년도</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>플레이 최소인원</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>플레이 최대인원</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>플레이 최대인원</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>평균 플레이 시간</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>사용 최소연령</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 카테고리</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 진행방식</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>룰 디자이너</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>게임 아티스트</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className="row">
                        <div className="row col-md-12 m-4">
                            <div className="col-md-2">
                                <h5>출판사</h5>
                            </div>
                            <input />
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />

                    <button type="submit">적용</button>
                </form>
            </div>
        </section>
    );
}
