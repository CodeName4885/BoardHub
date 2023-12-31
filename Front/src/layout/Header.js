import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import { logout } from "../UserApiConfig/ApiService";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
import Logo from "../static/game-warrior/img/BoardHub-Logo_Smallx.jpg";

export function Header() {
    const isLoggedIn =
        localStorage.getItem("ACCESS_TOKEN") !== null ||
        sessionStorage.getItem("TOKEN") !== null;

    return (
        <header className="header-section">
            <div className="container">
                <a className="site-logo" href="/">
                    <div
                        style={{
                            backgroundImage: `url(${Logo})`,
                            width: "170px",
                            height: "40px",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                </a>
                {isLoggedIn ? (
                    <div className="user-panel">
                        <a href="/mypage/myinfo">마이페이지</a> /{" "}
                        <a href="/" onClick={logout}>
                            로그아웃
                        </a>
                    </div>
                ) : (
                    <div className="user-panel">
                        <a href="/Login">로그인</a> /{" "}
                        <a href="/join">회원가입</a>
                    </div>
                )}
                <div className="nav-switch">
                    <i className="fa fa-bars"></i>
                </div>
                <nav className="main-menu">
                    <ul>
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
                </nav>
            </div>
        </header>
    );
}
