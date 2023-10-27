import Logo from "../../static/game-warrior/img/BoardHub-Logo-Tp.png"
import pwd from "../../static/game-warrior/css/pwd.module.css"
import {IoLockClosedOutline} from "react-icons/io5"
import { useState } from "react"
import { usernameChk } from "../../UserApiConfig/ApiService"
function ModifyPassword() {
  const [usernameVal, setUsernameVal] = useState("");

  const onChangeUsername = (e) =>{
    const usernameInput = e.target.value;
    setUsernameVal(usernameInput);
  }

  const usernameCheck = () => {
    usernameChk(usernameVal)
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
              <span className={pwd['content-article-text']}><span style={{color: "#069FEE"}}>아이디</span>를 입력해주세요</span>
            </div>
            <div className={pwd['content-article-input-box']}>
              <input className={pwd['content-article-input']} onChange={onChangeUsername} type="text" placeholder="아이디를 입력해 주세요"/>
            </div>
          </article>
          <div className={pwd['find-id-box']}>
            <span className={pwd['find-id']}>아이디를 찾으시나요?</span>
            <button className={pwd['find-id-btn']}>아이디 찾기</button>
          </div>
          <div className={pwd['next-btn-box']}>
            <button className={pwd['next-btn']} onClick={usernameCheck}>다음 단계</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModifyPassword;
