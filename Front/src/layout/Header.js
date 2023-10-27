<<<<<<< HEAD
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
<<<<<<< HEAD

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
=======
=======
import { logout } from "../UserApiConfig/ApiService";
import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
// import "../static/game-warrior/css/font-awesome.min.css";
// import "../static/game-warrior/css/owl.carousel.css";
import Logo from "../static/game-warrior/img/BoardHub-Logo_Smallx.jpg";
export function Header() {
<<<<<<< HEAD


=======
    const isLoggedIn = localStorage.getItem("ACCESS_TOKEN") !== null || sessionStorage.getItem("TOKEN") !== null;
    
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
  return (
    <header className="header-section">
        <div className="container">
            <a className="site-logo" href="/">
                <div style={
                    {backgroundImage:`url(${Logo})`,
                    width: '170px',
                    height: '40px',
                    backgroundRepeat: 'no-repeat'
                }
                }></div>
            </a>
<<<<<<< HEAD
            <div className="user-panel">
                <a href="#">로그인</a>  /  <a href="join">회원가입</a>
            </div>
=======
            {isLoggedIn ?(
            <div className="user-panel">
                <a href="/mypage/myinfo">마이페이지</a>  /  <a href="/" onClick={logout}>로그아웃</a>
            </div>
            ):(
                <div className="user-panel">
                <a href="/Login">로그인</a>  /  <a href="join">회원가입</a>
            </div>
            )}
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
            <div className="nav-switch">
                <i className="fa fa-bars"></i>
            </div>
            <nav className="main-menu">
                <ul>
<<<<<<< HEAD
                    <li><a href="">게임 정보</a></li>
=======
                    <li><a href="/game/list">게임 정보</a></li>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
                    <li><a href="">게임 후기</a></li>
                    <li><a href="">중고 거래</a></li>
                    <li><a href="">메이트</a></li>
                    <li><a href="">영상/공략</a></li>
                </ul>
            </nav>
        </div>
    </header>
  );
<<<<<<< HEAD
>>>>>>> 8e3ded9273ce50f1bb79af160f3c7964349ab9f4
=======
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
}
