import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { TradeAddComponent } from "./TradeAddComponent"

export function TradeAddPage() {
    return (
        <>
            <Header/>
            <div className="App">
                <div className="trade-container"></div>
                <br />
                <h2>제목</h2>
                <TradeAddComponent />
                <Footer/>
            </div>
        </>
    );
}