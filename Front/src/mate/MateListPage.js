import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import {MateListComponent} from "./MateListComponent";

export function MateListPage() {
    return (
        <>
            <Header/>
            <div className="App">
                <MateListComponent/>
                <Footer/>
            </div>
        </>
    );
}