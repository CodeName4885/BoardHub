import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { SolutionAddComponent } from "./SolutionAddComponent";


export function SolutionAddPage() {
  return (
      <>
          <Header/>
          <div className="App">
              <div className="solution-container"></div>
              <br />
              <h2>제목</h2>
              <SolutionAddComponent />
              <Footer/>
          </div>
      </>
    );
}
