import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameDetailPage } from "./game/GameDetailPage";
import { GameListPage } from "./game/GameListPage";
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
        <Route path="game" >
            <Route path="list" element={<GameListPage />}/>
            <Route path="detail" element={<GameDetailPage />}/>
        </Route>
        <Route path="join" element={<Join />} />
        <Route path="joinagree" element={<JoinAgree />} />
        <Route path="entry-info" element={<Entryinfo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
