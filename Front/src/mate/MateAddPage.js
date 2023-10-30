import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { MateAddComponent } from "./MateAddComponent";

export function MateAddPage() {
    return (
        <>
            <Header />
            <div className="App">
                <div className="review-container"></div>
                <br />
                <MateAddComponent />
                <Footer />
            </div>
        </>
    );
}
