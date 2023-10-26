import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameDetailComponent } from "./game/GameDetailComponent";
import { GameFormComponent } from "./game/GameFormComponent";
import { GameListComponent } from "./game/GameListComponent";
import { GamePage } from "./game/GamePage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route index element={<App />} />
                <Route path="game" element={<GamePage />}>
                    <Route path="list" element={<GameListComponent />} />
                    <Route
                        path="detail/:gameId"
                        element={<GameDetailComponent />}
                    />
                    <Route
                        path="edit/:gameId"
                        element={<GameFormComponent />}
                    />
                    <Route path="create" element={<GameFormComponent />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
