import "../static/game-warrior/css/animate.css";
import "../static/game-warrior/css/bootstrap.min.css";
import "../static/game-warrior/css/style.css";

export function Footer() {

  return (
    <footer className="footer-section">
        <div className="container">
            <ul className="footer-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="review.html">Games</a></li>
                <li><a href="categories.html">Blog</a></li>
                <li><a href="community.html">Forums</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <p className="copyright">
                Copyright &copy;All rights reserved | This template is made with
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            </p>
        </div>
    </footer>
  );
}
