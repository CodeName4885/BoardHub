import { Select, Space, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { GameListComponent } from "./GameListComponent";
import { CATEGORY } from "../Constants";

export function GameListPage() {
    return (
        <>
            <Header />

            <section className="review-section spad">
                <GameListComponent />
            </section>

            <Footer />
        </>
    );
}
