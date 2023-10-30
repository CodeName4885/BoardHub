import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GameDetailCategory } from "./GameDetailCategory";
import { GameDetailItem } from "./GameDetailItem";
import {
    fetchByGameId,
    fetchCategoriesByGameId,
} from "./repositories/GameRepository";
import { GameCommentComponent } from "./GameCommentComponent";
import { Button as Btn } from "antd";

export function GameDetailComponent() {
    const params = useParams();
    const { gameId } = params;
    const [game, setGame] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getGame()
            .then((game) => {
                setGame(game);
            })
            .then(() => {
                getCategories().then((cate) => {
                    setCategories(cate);
                    setLoading(false);
                });
            });
    }, [gameId]);

    async function getGame() {
        return await fetchByGameId(gameId).then((data) => {
            return data;
        });
    }

    async function getCategories() {
        return await fetchCategoriesByGameId(gameId).then((data) => {
            return data;
        });
    }

    if (loading) {
        return (
            <div id="preloder">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <section className="page-section review-page spad">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-end align-items-center">
                            <Btn
                                className="mr-2"
                                onClick={() => navigate("/game/list")}
                                type="link"
                            >
                                목록
                            </Btn>
                            <Btn
                                onClick={() => navigate(`/game/edit/${gameId}`)}
                                type="primary"
                            >
                                수정요청
                            </Btn>
                        </div>
                        <div className="review-item row mb-1">
                            <GameDetailItem game={game} />
                        </div>
                        <div className="col-md-12 row">
                            <GameDetailCategory categories={categories} />
                        </div>
                        <div>
                            <GameCommentComponent />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
