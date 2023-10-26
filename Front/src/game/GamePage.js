import React from "react";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Outlet } from "react-router-dom";

export function GamePage() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
