import { Header } from "../layout/Header";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function GameListComponent() {


  return (
    <>
        <section class="page-section review-page spad">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="review-item">
                            <div class="review-cover" style={{backgroundImage: `url("../static/game-warrior/img/review/5.jpg")`}}>
                                <div class="score yellow">9.3</div>
                            </div>
                            <div class="review-text">
                                <h4>게임 제목</h4>
                                <p>설명</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center pt-4">
                    <button class="site-btn btn-sm">더보기</button>
                </div>
            </div>
        </section>
    </>
  );
}
