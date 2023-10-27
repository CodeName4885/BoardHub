import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameDetailComponent } from "./game/GameDetailComponent";
import { GameFormComponent } from "./game/GameFormComponent";
import { GameListComponent } from "./game/GameListComponent";
import { GamePage } from "./game/GamePage";
import { GameDetailPage } from "./game/GameDetailPage";
import { GameListPage } from "./game/GameListPage";
import { ReviewAddPage } from "./review/ReviewAddPage";
import { SolutionAddPage } from "./solution/SolutionAddPage";
import { SolutionListPage } from "./solution/SolutionListPage";
import { TradeAddPage } from "./trade/TradeAddPage";
import { ReviewDetailPage } from "./review/ReviewDetailPage";
import { ReviewListPage } from "./review/ReviewListPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Join from "./user/Join";
import JoinAgree from "./user/JoinAgree";
import Entryinfo from "./user/Entryinfo";

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

                <Route path="join" element={<Join />} />
                <Route path="joinagree" element={<JoinAgree />} />
                <Route path="entry-info" element={<Entryinfo />} />

                <Route path="review">
                    <Route path="add" element={<ReviewAddPage />} />
                    <Route path="detail" element={<ReviewDetailPage />} />
                    <Route path="list" element={<ReviewListPage />} />
                </Route>

                <Route path="trade">
                    <Route path="add" element={<TradeAddPage />} />
                </Route>

                <Route path="solution">
                    <Route path="add" element={<SolutionAddPage />} />
                    <Route path="list" element={<SolutionListPage />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
