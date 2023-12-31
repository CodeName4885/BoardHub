import React from "react";
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
