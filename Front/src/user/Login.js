import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png";
import { useState } from "react";
import { Call, login } from "../UserApiConfig/ApiService";
import joincss from "../static/game-warrior/css/join.module.css";
import { SiKakaotalk } from "react-icons/si";
import { KAKAO_AUTH_URL } from "./socialAPI/OAuth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const clientId =
    "782072190783-49o1l5dp544nfa4e7bbt7ot33h0rh6nt.apps.googleusercontent.com";

function Login() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const submit = () => {
        login(userData);
    };

    const handleonChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                <div className={joincss["login-title-box"]}>
                    <h5 className={joincss["login-title"]}>아이디 로그인</h5>
                </div>
                <br />
                <div className={joincss["email-box"]}>
                    <div className={joincss["same-input-box"]}>
                        <input
                            type="text"
                            name="username"
                            placeholder="아이디"
                            onChange={handleonChange}
                        />
                    </div>
                </div>
                <br />
                <div className={joincss["email-box"]}>
                    <div className={joincss["same-input-box"]}>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            onChange={handleonChange}
                        />
                    </div>
                </div>
                <div className={joincss["login-ck"]}>
                    <input
                        id="login_ck"
                        className={joincss["agree-ckbox"]}
                        type="checkbox"
                    />
                    <label for="login_ck">
                        <div className={joincss["cktext-box"]}>
                            <span className={joincss["cktext"]}>
                                로그인 유지
                            </span>
                        </div>
                    </label>
                </div>
                <button className={joincss["login-btn"]} onClick={submit}>
                    로그인 하기
                </button>
                <p className={joincss["middle-line"]}>
                    <span className={joincss["or"]}>또는</span>
                </p>
                <div className={joincss["social-list"]}>
                    <ul>
                        <li>
                            <a href="">
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        buttonText=""
                                        onSuccess={(credentialResponse) => {
                                            console.log(credentialResponse);
                                            const access_token =
                                                credentialResponse.credential;
                                            sessionStorage.setItem(
                                                "TOKEN",
                                                access_token
                                            );
                                            console.log(
                                                jwtDecode(access_token)
                                            );
                                            const {
                                                exp,
                                                email,
                                                name,
                                                picture,
                                            } = jwtDecode(access_token);
                                            sessionStorage.setItem(
                                                "USER_EMAIL",
                                                email
                                            );
                                            const data = {
                                                user_id: exp,
                                                email: email,
                                                name: name,
                                                profileimage: picture,
                                            };
                                            console.log("exp = ", exp);
                                            console.log("email = ", email);
                                            console.log("name = ", name);
                                            console.log(
                                                "profileimage = ",
                                                picture
                                            );
                                            Call(
                                                "/googleuserinfoadd",
                                                "POST",
                                                data
                                            ).then((response) => {
                                                console.log(response);
                                                window.location.href = "/";
                                            });
                                        }}
                                        onError={() => {
                                            console.log("로그인 실패");
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </a>
                        </li>
                        <li>
                            <a href={KAKAO_AUTH_URL}>
                                <SiKakaotalk size="30" color="#111111" />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Login;
