import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <ul className="footer-menu">
                    <li>
                        <a href="/game/list">게임 정보</a>
                    </li>
                    <li>
                        <a href="/review/list">게임 후기</a>
                    </li>
                    <li>
                        <a href="/trade/list">중고 거래</a>
                    </li>
                    <li>
                        <a href="/mate/list">메이트</a>
                    </li>
                    <li>
                        <a href="/solution/list">영상/공략</a>
                    </li>
                </ul>
                {/* <p className="copyright">
                    Copyright &copy;All rights reserved | This template is made
                    with
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                    by{" "}
                    <a href="https://colorlib.com" target="_blank">
                        Colorlib
                    </a>
                </p> */}
            </div>
        </footer>
    );
}
