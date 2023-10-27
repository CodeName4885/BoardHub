import React from "react";
<<<<<<< HEAD

=======
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
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
