import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png";
import joincss from "../static/game-warrior/css/join.module.css";

function CompleteJoin() {
    return (
        <div className={joincss["body"]}>
            <section className={joincss["wrap"]}>
                <div
                    className={joincss["logo"]}
                    style={{
                        backgroundImage: `url(${Logo})`,
                        width: "200px",
                        height: "170px",
                        backgroundSize: "cover",
                    }}
                ></div>
                <h3 className={joincss["title"]}>회원가입을 환영합니다.</h3>
                <p className={joincss["coment"]}>
                    BoardHub에서 제공하는 다양한 서비스를 즐겨보세요!
                </p>
                <a href="/login">
                    <button className={joincss["join-email"]}>
                        BoardHub 시작하기
                    </button>
                </a>
            </section>
        </div>
    );
}

export default CompleteJoin;
