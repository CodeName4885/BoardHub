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
import { ReviewAddPage } from "./review/ReviewAddPage";
import { ReviewDetailPage } from "./review/ReviewDetailPage";
import { ReviewListPage } from "./review/ReviewListPage";
import { SolutionAddPage } from "./solution/SolutionAddPage";
import { SolutionListPage } from "./solution/SolutionListPage";
import { TradeAddPage } from "./trade/TradeAddPage";
import Entryinfo from "./user/Entryinfo";
import Join from "./user/Join";
import JoinAgree from "./user/JoinAgree";
import Login from "./user/Login";
import CompleteJoin from "./user/CompleteJoin";
import Kakao from "./user/Kakao";
import Mypage from "./user/mypage/Mypage";
import ModifyPassword from "./user/find/ModifyPassword";
import ModifyPasswordEmaildupl from "./user/find/ModifyPasswordEmaildupl";
import ModifyRealChangePwd from "./user/find/ModifyRealChangePwd";

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
                <Route path="login" element={<Login />} />
                <Route path="completedjoin" element={<CompleteJoin />} />
                <Route path="entry-info" element={<Entryinfo />} />
                <Route path="auth/kakao/callback" element={<Kakao />} />
                <Route path="mypage">
                    <Route path="myinfo" element={<Mypage />} />
                </Route>
                <Route path="find">
                    <Route path="pwd" element={<ModifyPassword />} />
                    <Route
                        path="pwdemaildupl"
                        element={<ModifyPasswordEmaildupl />}
                    />
                    <Route path="newpwd" element={<ModifyRealChangePwd />} />
                </Route>

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
