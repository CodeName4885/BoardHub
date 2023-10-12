import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";
// import "../static/game-warrior/css/font-awesome.min.css";
// import "../static/game-warrior/css/owl.carousel.css";

export function Header() {


  return (
    <header class="header-section">
        <div class="container">
            <a class="site-logo">
                <p>BoardHub</p>
            </a>
            <div class="user-panel">
                <a href="#">Login</a>  /  <a href="#">Register</a>
            </div>
            <div class="nav-switch">
                <i class="fa fa-bars"></i>
            </div>
            <nav class="main-menu">
                <ul>
                    <li><a href="">게임 정보</a></li>
                    <li><a href="">게임 후기</a></li>
                    <li><a href="">중고 거래</a></li>
                    <li><a href="">메이트</a></li>
                    <li><a href="">영상/공략</a></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}
