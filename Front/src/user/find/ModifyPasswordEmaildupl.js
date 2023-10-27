import Logo from "../../static/game-warrior/img/BoardHub-Logo-Tp.png"
import pwd from "../../static/game-warrior/css/pwd.module.css"
import {IoLockClosedOutline} from "react-icons/io5"
import { useState, useRef, useEffect } from "react"
import { emailChk } from "../../UserApiConfig/ApiService"
import Swal from "sweetalert2"
function ModifyPasswordEmaildupl() {
  //이메일 작성 이벤트
  const [inputChangeEmail, setInputChangeEmail] = useState("");

  const onChangeEmail = (e) => {
    setInputChangeEmail(e.target.value);
  };

  //이메일 인증 버튼 클릭 및 인증 번호 확인 폼 활성화
  const [isMailConfirm, setIsMailConfirm] = useState(false);
  const mailConfirm = () =>{
      emailChk(inputChangeEmail).then((response)=>{
        console.log("modifyPasswordMailresponse = ", response);
        if(response){
          fetch('http://localhost:8080/mailconfirm',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(inputChangeEmail)
          })
          .then(response => response.text())
          .then(data => {
            console.log("인증번호 : " + data);
            Swal.fire({
              icon: "info",
              title: "인증 번호 발송",
              text: "해당 메일로 인증 번호가 발송되었습니다. 확인부탁드립니다.",
              confirmButtonText: "확인",
              confirmButtonColor: "#0B1761"
            })
            setIsMailConfirm(true);
            setMinute(60);
            setSecond(0);
            setRecievedData(data);
          })
          .catch(error => {
            console.log("응답실패" + error);
          })
        }else{
          Swal.fire({
            icon: "warning",
            title: "이메일이 맞지 않습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#0B1761"
          })
        }
      })
     
  }

  // 이메일 인증 타이머
  const timer = useRef();
  const [minute, setMinute] = useState(60);
  const [second, setSecond] = useState(0);


  useEffect(() => {
    if(isMailConfirm){
      timer.current = setInterval(()=>{
        if (second > 0){
          setSecond(second -1);
        }else{
          if(minute === 0){
            clearInterval(timer.current);
            setIsMailConfirm(false);
          }else{
            setMinute(minute -1);
            setSecond(59);
          }
        }
      }, 1000);
      return () => clearInterval(timer.current);
    }
  }, [isMailConfirm, minute, second])

  //이메일 인증 체크 
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [recievedData, setRecievedData] = useState(null); 
  const [inputData, setInputData] = useState();
  const [sendBtn, setSendBtn] = useState(true);
  function inputDataChange(e){
    setInputData(e.target.value);
  }

  const mailConfirmCheck = () =>{
    if(recievedData !== inputData){
      Swal.fire({
        icon: "error",
        title: "인증 번호가 맞지 않습니다.",
        text: "다시 작성 해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#0B1761"
      })
    }else{
      Swal.fire({
        icon: "success",
        title: "인증에 성공하였습니다!",
        text: "아래 글들을 작성하여 가입을 해주세요!",
        confirmButtonColor: "#0B1761",
        confirmButtonText: "확인"
      })
      clearInterval(timer.current);
      setIsMailConfirm(false);
      setSendBtn(false);
      setIsConfirmed(true);
    }
  }
  const moveNext = () =>{
    window.location.href="/find/newpwd";
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
              <span className={pwd['content-article-text']}><span style={{color: "#069FEE"}}>이메일 인증</span>을 진행해주세요.</span>
            </div>
            <div className={pwd['email-box']}>
            <div className={pwd['email-input-box']}>
              <input type="email" name="user_email" placeholder="이메일" readOnly={!sendBtn} onChange={onChangeEmail} />
            </div>
            <div className={pwd['send-email-box']}>
              <button className={`${pwd['send-email-btn']} ${inputChangeEmail === '' || !sendBtn ? pwd['disabled'] : ''}`} disabled={inputChangeEmail === "" || !sendBtn} onClick={mailConfirm}>인증메일 발송</button>
            </div>
          </div>
          <div className={pwd['email-box']}>
            <div className={`${pwd['email-input-box']} ${isMailConfirm === false ? pwd['disabled'] : ''}`}>
              <input className={`${pwd['mailconfirm-input']} ${!isMailConfirm ? pwd['disabled'] : ''}`} disabled={!isMailConfirm} placeholder="인증번호" type="text" name="verification" onChange={inputDataChange} />
              {isMailConfirm ? (
                <div className="timer">{String(minute).padStart(2, "0")}:{String(second).padStart(2, "0")}</div>
              ) : null}
            </div>
            <div className={pwd['send-email-box']}>
              <button className={`${pwd['mailconfirm-btn']} ${!isMailConfirm ? pwd['disabled'] : ''}`} display={!isMailConfirm} onClick={mailConfirmCheck}>인증번호 확인</button>
            </div>
          </div>
          </article>
          <div className={pwd['next-btn-box']}>
          <button className={`${pwd['next-btn']} ${!isConfirmed ? pwd['disabled'] : ''}`} disabled={!isConfirmed} onClick={moveNext}>다음 단계</button>
          </div>
        </div>
      </section>
    </div>  
  );
}

export default ModifyPasswordEmaildupl;
