import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { GameDetailPage } from "./game/GameDetailPage";
import { GameListPage } from "./game/GameListPage";
import {ReviewAddPage} from "./review/ReviewAddPage";
import {SolutionAddPage} from "./solution/SolutionAddPage";
import {SolutionListPage} from "./solution/SolutionListPage";
import {TradeAddPage} from "./trade/TradeAddPage";
import {ReviewDetailPage} from "./review/ReviewDetailPage";
import {ReviewListPage} from "./review/ReviewListPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";



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
      </Routes>
    </Router>

      <Router>
          <Routes>
              <Route path="review">
              <Route path="add" element={<ReviewAddPage/>}/>
              <Route path="detail" element={<ReviewDetailPage/>}/>
              <Route path="list" element={<ReviewListPage/>}/>
              </Route>
          </Routes>
      </Router>

     <Router>
         <Routes>
             <Route path="trade">
                 <Route path="add" element={<TradeAddPage/>}/>
             </Route>
         </Routes>
     </Router>

      <Router>
          <Routes>
              <Route path="solution">
                  <Route path="add" element={<SolutionAddPage/>}/>
                  <Route path="list" element={<SolutionListPage/>}/>
              </Route>
          </Routes>
      </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
