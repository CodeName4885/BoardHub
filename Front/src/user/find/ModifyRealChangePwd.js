import Logo from "../../static/game-warrior/img/BoardHub-Logo-Tp.png"
import pwd from "../../static/game-warrior/css/pwd.module.css"
import {IoLockClosedOutline} from "react-icons/io5"
import { getUsername } from "../../UserApiConfig/ApiService";
import { useState } from "react";
import Swal from "sweetalert2";
import { pwdChangeAPI } from "../../UserApiConfig/ApiService";
function ModifyRealChangePwd() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  getUsername().then((response)=> {
    setUsername(response.username);
  })

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

 
  const hadleValidate = () => {
    if(password !== confirmPassword){
      Swal.fire({
        icon: "warning",
        title: "비밀번호가 일치하지 않습니다.",
        confirmButtonColor: "#0B1761",
        confirmButtonText: "확인"
      })
    }else if(password === ""){
      Swal.fire({
        icon: "warning",
        title: "비밀번호를 입력해주세요.",
        confirmButtonColor: "#0B1761",
        confirmButtonText: "확인"
      })
    }else{
      pwdChangeAPI(password)
    }
  
  }

  return (
    <div className={pwd['body']}>
      <section className={pwd['wrap']}>
        <div className={pwd['logo']} style={
          {
            backgroundImage:`url(${Logo})`,
            width: '200px',
            height: '170px',
            backgroundSize: 'cover'
          }
        }></div>
        <div className={pwd['content-wrap']}>
          <div className={pwd['content-title-box']}>
            <h2 className={pwd['content-title']}>비밀번호 변경</h2>
          </div>
          <article className={pwd['content-article']}>
            <div className={pwd['icon-box']}>
              <i><IoLockClosedOutline size={150}/></i>
            </div>
            <div className={pwd['content-article-text-box']}>
              <span className={pwd['content-article-text']}><span style={{color: "#069FEE"}}>{username}</span>님, 이제 새로운 비밀번호를 설정해 주세요.</span>
            </div>
            <div className={pwd['email-box']}>
            <div className={pwd['email-input-box']}>
              <input type="password" name="user_email" placeholder="비밀번호" onChange={handlePasswordChange} />
            </div>
          </div>
          <div className={pwd['email-box']}>
            <div className={pwd['email-input-box']} >
              <input className={pwd['mailconfirm-input']} placeholder="비밀번호 확인" type="password" name="verification" onChange={handleConfirmPasswordChange}/>
            </div>
          </div>
          </article>
          <div className={pwd['next-btn-box']}>
          <button className={pwd['next-btn']} onClick={hadleValidate}>다음 단계</button>
          </div>
        </div>
      </section>
    </div>  
  );
}

export default ModifyRealChangePwd;
