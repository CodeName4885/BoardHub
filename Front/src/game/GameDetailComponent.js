import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    fetchByGameId,
    fetchCategoriesByGameId,
} from "../repositories/GameRepository";
import { GameDetailCategory } from "./GameDetailCategory";
import { GameDetailCompare } from "./GameDetailCompare";
import { GameDetailItem } from "./GameDetailItem";
import { Button } from "react-bootstrap";

export function GameDetailComponent() {
    const params = useParams();
    const { gameId } = params;
    const [game, setGame] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    console.log(params);
    console.log(game);

    useEffect(() => {
        getGame();
    }, [gameId]);

    async function getGame() {
        await fetchByGameId(gameId).then(async (data) => {
            setGame(data);
            await getCategories().then(() => {
                setLoading(false);
            });
        });
    }

    async function getCategories() {
        const data = await fetchCategoriesByGameId(gameId);
        console.log(data);
        setCategories(data);
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
                            <a
                                className="mr-2"
                                href="/game/list"
                                style={{ fontSize: 20 }}
                            >
                                목록
                            </a>
                            <Button
                                onClick={() => navigate(`/game/edit/${gameId}`)}
                            >
                                수정요청
                            </Button>
                        </div>
                        <div className="review-item row">
                            <GameDetailItem game={game} />
                        </div>
                        <div className="col-md-12 row">
                            <GameDetailCategory categories={categories} />

                            {/* <div className="col-md-12">
                                <GameDetailCompare game={game} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
