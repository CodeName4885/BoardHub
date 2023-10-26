import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameListComponent } from "./game/GameListComponent";
import { GameDetailComponent } from "./game/GameDetailComponent";
import { GameCreateComponent } from "./game/GameCreateComponent";
import { GameEditComponent } from "./game/GameEditComponent";
import { GamePage } from "./game/GamePage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Join from "./user/Join";
import JoinAgree from "./user/JoinAgree";
import Entryinfo from "./user/Entryinfo";
import CompleteJoin from "./user/CompleteJoin";
import Login from "./user/Login";
import Mypage from "./user/mypage/Mypage";
import ModifyPassword from "./user/find/ModifyPassword";
import ModifyPasswordEmaildupl from "./user/find/ModifyPasswordEmaildupl";
import ModifyRealChangePwd from "./user/find/ModifyRealChangePwd";
import Kakao from "./user/Kakao";

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
        <Route path="join" element={<Join />} />
        <Route path="joinagree" element={<JoinAgree />} />
        <Route path="login" element={<Login />} />
        <Route path="completed-join" element={<CompleteJoin />} />
        <Route path="entry-info" element={<Entryinfo />} />
        <Route path="auth/kakao/callback" element={<Kakao /> }/>
        <Route path="mypage">
          <Route path="myinfo" element={<Mypage />} />
        </Route>
        <Route path="find">
          <Route path="pwd" element={<ModifyPassword />}/>
          <Route path="pwdemaildupl" element={<ModifyPasswordEmaildupl />}/>
          <Route path="newpwd" element={<ModifyRealChangePwd />}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
