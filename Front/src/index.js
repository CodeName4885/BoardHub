import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameCreateComponent } from "./game/GameCreateComponent";
import { GameDetailComponent } from "./game/GameDetailComponent";
import { GameEditComponent } from "./game/GameEditComponent";
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
                        path="detail/:id"
                        element={<GameDetailComponent />}
                    />
                    <Route path="create" element={<GameCreateComponent />} />
                    <Route path="edit/:id" element={<GameEditComponent />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
