import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <ul className="footer-menu">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Games</a>
                    </li>
                    <li>
                        <a href="#">Blog</a>
                    </li>
                    <li>
                        <a href="#">Forums</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
                <p className="copyright">
                    Copyright &copy;All rights reserved | This template is made
                    with
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                    by{" "}
                    <a href="https://colorlib.com" target="_blank">
                        Colorlib
                    </a>
                </p>
            </div>
        </footer>
    );
}
