import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import {
    fetchByGameId,
    getCategoriesById,
} from "../repositories/GameRepository";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { useParams } from "react-router-dom";

import { GameDetailCategory } from "./GameDetailCategory";
import { GameDetailItem } from "./GameDetailItem";
import { GameDetailCompare } from "./GameDetailCopare";

export function GameDetailComponent() {
    const params = useParams();
    const [game, setGame] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

    console.log(params);
    console.log(game);

    useEffect(() => {
<<<<<<< HEAD
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
=======
        console.log("useEffect");
        getApi();
    }, [params]);

    async function getApi() {
        try {
            const data = await fetchByGameId(params.id);
            setGame(data);
            await getCategories();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function getCategories() {
        const data = await getCategoriesById(params.id);
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
        console.log(data);
        setCategories(data);
    }

    if (loading) {
        return (
            <div id="preloder">
<<<<<<< HEAD
                <div className="loader"></div>
=======
                <div class="loader"></div>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
            </div>
        );
    }

    return (
        <section className="page-section review-page spad">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
<<<<<<< HEAD
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
=======
                        <div className="review-item row">
                            <GameDetailItem game={game} />
                            <div className="col-md-12">
                                <GameDetailCategory categories={categories} />

                                <div className="col-md-12">
                                    <GameDetailCompare game={game} />
                                </div>
                            </div>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
