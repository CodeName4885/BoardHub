import React, { useState } from "react";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { GameListComponent } from "./GameListComponent";

export function GameListPage() {

    const [sort, setSort] = useState();

    return (
    <>
        <Header />

        <section className="review-section spad">
            <div className="container">
                <div className="section-title">
                    <a href="#" value="best">베스트 50</a>
                    <a href="#" value="recent">최신게임</a>
                    <a href="#" value="old">오래된 게임</a>
                    <a href="#" value="category">장르별</a>
                </div>
                    <GameListComponent />
                </div>
        </section>

        <Footer />

    </>
    );
    }
