const REST_API_KEY = "247ee3e6b3ce18bf1d6e0d148480c675";

const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

const KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export function kakaoToken(code) {
    let headers = new Headers();
    headers.append(
        "Content-type",
        "application/x-www-form-urlencoded;charset=utf-8"
    );

    let options = {
        url: KAKAO_TOKEN_URL,
        headers: headers,
        method: "POST",
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
        }),
    };
    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}
export function kakaoUserinfo(access_token) {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token}`);
    headers.append(
        "Content-type",
        "application/x-www-form-urlencoded;charset=utf-8"
    );

    let options = {
        url: KAKAO_USERINFO_URL,
        headers: headers,
        method: "POST",
        body: null,
    };
    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}
