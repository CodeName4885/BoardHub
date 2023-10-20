import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
import { GameListItemComponent } from "./game/GameListItemComponent";
import { GameDetailComponent } from "./game/GameDetailComponent";
import { GameCreateComponent } from "./game/GameCreateComponent";
import { GameEditComponent } from "./game/GameEditComponent";
import { GamePage } from "./game/GamePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route index element={<App />} />
                <Route path="game" element={<GamePage />}>
                    <Route path="list" element={<GameListItemComponent />} />
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
=======
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
>>>>>>> 8e3ded9273ce50f1bb79af160f3c7964349ab9f4
);

reportWebVitals();
