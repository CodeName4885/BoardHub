import React, { useEffect, useState } from "react";
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

    console.log(params);
    console.log(game);

    useEffect(() => {
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
        console.log(data);
        setCategories(data);
    }

    if (loading) {
        return (
            <div id="preloder">
                <div class="loader"></div>
            </div>
        );
    }

    return (
        <section className="page-section review-page spad">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="review-item row">
                            <GameDetailItem game={game} />
                            <div className="col-md-12">
                                <GameDetailCategory categories={categories} />

                                <div className="col-md-12">
                                    <GameDetailCompare game={game} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
