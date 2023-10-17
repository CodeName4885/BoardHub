import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { ReviewAddComponent} from "./ReviewAddComponent";

export function ReviewAddPage() {

    return (
        <>
            <Header/>
            <div className="App">
                <div className="review-container"></div>
                <br />
                <h2>제목</h2>
                <input type="text" placeholder="제목" name="title" />
            <ReviewAddComponent />
            <Footer/>
            </div>
        </>
    );
}