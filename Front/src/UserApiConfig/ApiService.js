import Swal from "sweetalert2";
import API_BASE_URL from "./Api-Config";

export function Call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    //로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        url: API_BASE_URL.BASE_URL + api,
        headers: headers,
        method: method,
    };
    if (request) {
        //GET method
        options.body = JSON.stringify(request);
        console.log(options.body);
    }
    return fetch(options.url, options)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 403) {
                window.location.href = "/login"; // redirect
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .catch((error) => {
            console.log("http error");
            console.log(error);
        });
}

export function login(users) {
    return Call("/login", "POST", users).then((response) => {
        if (response) {
            if (response.user_status === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "비활성화된 아이디 입니다.",
                    text: "활성화 하시겠습니까?",
                    showCancelButton: true,
                    confirmButtonColor: "#0B1761",
                    confirmButtonText: "활성화 하기",
                    cancelButtonText: "취소",
                }).then((result) => {
                    if (result.isConfirmed) {
                        activateuser(users);
                    }
                });
            } else {
                //로컬 스토리지에 토큰 저장 --> 브라우저를 닫아도 로그인이 유지될수있다
                console.log("data = ", response);
                const token = response.token;
                const expiratedTime = response.expiratedTime;
                localStorage.setItem("ACCESS_TOKEN", token);
                localStorage.setItem("EXPIRATEDTIME", expiratedTime);
                sessionStorage.setItem("USER_ID", response.user_id);
                //token이 존재하면 main으로 이동
                window.location.href = "/";
            }
        }
    });
}

//토큰 만료 여부 확인하는 함수
function checkTokenExpiration() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
        return;
    }
    const THIRTY_SECONDS = 30 * 1000;
    const currentTime = Date.now();
    console.log(currentTime);
    const exp = localStorage.getItem("EXPIRATEDTIME");
    console.log(exp);
    const transExp = new Date(exp).getTime();
    console.log(transExp);
    if (transExp - currentTime < THIRTY_SECONDS) {
        console.log("토큰이 만료되기 30초 전입니다.");

        //todo 토큰갱신
        refreshToken();
    }
}

setInterval(checkTokenExpiration, 10000);

function refreshToken() {
    console.log("Refresh token 갱신 보내기");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    Call("/refresh", "POST", refreshToken).then((response) => {
        console.log(response);
        if (typeof response === "undefined") {
            logout();
            window.location.href = "/login";
        } else {
            const token = response.token;
            const expiratedTime = response.expiratedTime;
            localStorage.setItem("ACCESS_TOKEN", token);
            localStorage.setItem("EXPIRATEDTIME", expiratedTime);
        }
    });
}

export function logout() {
    localStorage.removeItem("ACCESS_TOKEN", null);
    sessionStorage.removeItem("TOKEN", null);
    localStorage.removeItem("EXPIRATEDTIME", null);
    sessionStorage.removeItem("USER_ID", null);
    sessionStorage.removeItem("USER_EMAIL", null);
    window.location.href = "/login";
}

export function modifynickname(nicknameVal) {
    console.log("nicknameVal : ", nicknameVal);
    return Call("/modifynickname", "post", nicknameVal)
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            console.log("error : ", error);
        });
}
export function modifyphone(phoneVal) {
    console.log("phoneVal =>", phoneVal);
    return Call("/modifyphone", "post", phoneVal)
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            console.log("error = ", error);
        });
}
export function drawUser() {
    console.log("drawUser");
    return Call("/drawuser", "post", null)
        .then((response) => {
            console.log(response);
            logout();
        })
        .catch((error) => {
            console.log("error = ", error);
        });
}
export function activateuser(users) {
    return Call("/activateuser", "post", users).then((response) => {
        console.log(response);
        login(users);
    });
}
export function usernameChk(usernameVal) {
    console.log("usernameVal => ", usernameVal);
    return Call("/usernamechk", "post", usernameVal)
        .then((response) => {
            console.log(response);
            if (response) {
                window.location.href = "/find/pwdemaildupl";
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "아이디가 맞지 않습니다.",
                    confirmButtonColor: "#0B1761",
                    confirmButtonText: "확인",
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "오류가 발생했습니다...",
                text: `${error}`,
                confirmButtonColor: "#0B1761",
                confirmButtonText: "확인",
            });
        });
}
export function emailChk(inputChangeEmail) {
    console.log(inputChangeEmail);
    return Call("/emailchk", "post", inputChangeEmail)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "오류가 발생했습니다...",
                text: `${error}`,
                confirmButtonColor: "#0B1761",
                confirmButtonText: "확인",
            });
        });
}
export function getUsername() {
    return Call("/getusername", "POST", null)
        .then((response) => {
            console.log(response.username);
            return response;
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "오류가 발생했습니다...",
                text: `${error}`,
                confirmButtonColor: "#0B1761",
                confirmButtonText: "확인",
            });
        });
}

export function pwdChangeAPI(password) {
    console.log("password = ", password);
    return Call("/modifypassword", "post", password)
        .then((response) => {
            console.log(response);
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "비밀번호가 변경 되었습니다.",
                    confirmButtonColor: "#0B1761",
                    confirmButtonText: "확인",
                }).then(() => {
                    window.location.href = "/mypage/myinfo";
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "오류가 발생했습니다...",
                text: `${error}`,
                confirmButtonColor: "#0B1761",
                confirmButtonText: "확인",
            });
        });
}

export function kakaoSignin(kakaouser) {
    return Call("/kakaosignin", "post", kakaouser);
}
//---------------------------------------------------
//main api
export function getMainitem() {
    return Call("/getmainitem", "GET", null).then((response) => {
        console.log(response);
        return response;
    });
}
