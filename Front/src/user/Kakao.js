import { useEffect, useState } from "react";
import { kakaoToken, kakaoUserinfo } from "./socialAPI/OAuth";
import { Call } from "../UserApiConfig/ApiService";

const Kakao = () => {
  const [loading, setLoading] = useState(true);
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  console.log("code = ", code);

  useEffect(() => {
    if (code) {
      kakaoToken(code).then((response) => {
        const access_token = response.access_token;
        console.log("kakao : ", response);
        sessionStorage.setItem("TOKEN", access_token);
        setLoading(false);
        kakaoUserinfo(access_token).then((result)=>{
          console.log("result =>", result);
          const user_id = result.id;
          const email = result.kakao_account.email;
          const name = result.kakao_account.profile.nickname;
          const profileimage = result.kakao_account.profile.profile_image_url;
          console.log(user_id);
          console.log(email);
          console.log(name);
          console.log(profileimage);
          sessionStorage.setItem("USER_EMAIL", email);
          const data = {
            "user_id" : user_id,
            "email" : email,
            "name": name,
            "profileimage": profileimage
          }
          Call("/kakaouserinfoadd", "POST", data).then((result)=>{
            console.log("kakao user info add = ", result);
              window.location.href = "/";
          }).catch((error)=>{
            console.error(error);
          })
        });
      }).catch((error) => {
        console.error("Error fetching data: ", error);

      });
    }
  }, []);
  if (loading) {
    return (
        <div id="preloder">
            <div class="loader"></div>
        </div>
    );
}
  return(
    <>
    </>
  );
}

export default Kakao;