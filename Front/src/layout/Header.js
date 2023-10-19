import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function Header() {
    return (
        <header className="header-section">
            <div className="container">
                <a className="site-logo">
                    <p>BoardHub</p>
                </a>
                <div className="user-panel">
                    <a href="#">Login</a> / <a href="#">Register</a>
                </div>
                <div className="nav-switch">
                    <i className="fa fa-bars"></i>
                </div>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a href="#">게임 정보</a>
                        </li>
                        <li>
                            <a href="#">게임 후기</a>
                        </li>
                        <li>
                            <a href="#">중고 거래</a>
                        </li>
                        <li>
                            <a href="#">메이트</a>
                        </li>
                        <li>
                            <a href="#">영상/공략</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
