import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png";
import joincss from "../static/game-warrior/css/join.module.css";
import { useState, useEffect, useRef } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import Swal from "sweetalert2";
function Entryinfo() {
  //이메일 작성 이벤트
  const [inputChangeEmail, setInputChangeEmail] = useState("");
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  const onChangeEmail = (e) => {
    setInputChangeEmail(e.target.value);
    setJoinData((prevData) => ({
      ...prevData,
      user_email : e.target.value,
    }));
  };

  //이메일 인증 버튼 클릭 및 인증 번호 확인 폼 활성화
  const [isMailConfirm, setIsMailConfirm] = useState(false);
  const mailConfirm = () =>{
      console.log(inputChangeEmail)
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
  const [recievedData, setRecievedData] = useState(null); 
  const [inputData, setInputData] = useState();
  const [sendBtn, setSendBtn] = useState(true);
  const [isUsernameDisabled, setIsUsernameDisabled ] = useState(false);
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
      setIsUsernameDisabled(true);
    }
  }

  // 프로필 사진 
  const onChange = (e) => {
    if (e.target.files[0]) {
      // 화면에 프로필 사진 표시
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          const formData = new FormData();
          formData.append('profile', e.target.files[0]);

          fetch("http://localhost:8080/profile",{
            method: "POST",
            body: formData
          })
          .then(response => response.text())
          .then(response => {
            console.log("통신성공",response);
          })
          .catch(error => {
            console.log("통신실패",error);
          })
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else { // 업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  //아이디 중복 체크
  const [usernameCheckMsg, setUsernameCheckMsg] = useState("");
  const [usernameCheckStatus, setUsernameCheckStatus ] = useState(0);
  const usernameInput = useRef(null);
  const usernameCheck = ()=>{
    const usernameVal = joinData.username;
    console.log("username = ", usernameVal);

    fetch("http://localhost:8080/usernamecheck",{
      method:"POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(usernameVal)
    })
    .then(response => response.text())
    .then(response => {
      console.log("통신성공",response);
      if(response === "true"){
        setUsernameCheckMsg("사용 가능한 아이디 입니다.");
        setUsernameCheckStatus(1);
      }else{
        setUsernameCheckMsg("중복된 아이디 입니다.");
        setUsernameCheckStatus(0);
      }
    })
    .catch(error => {
      console.log("통신실패", error);
    })
  }
  
  // 비밀번호 재입력 일치 호가인
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
 
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkPassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handleConfirmPasswordBlur = () => {
    checkPassword();
  };
  // 랜덤 닉네임 생성
  

  // 서버로 데이터 보내기
    const [joinData, setJoinData] = useState({
      username : "",
      password : "",
      name : "",
      nickname : "",
      phone : "",
      user_email : "",
    })
  const join = () => {
    console.log("joinData = ", joinData);
    if(usernameCheckStatus === 0){
      Swal.fire({
        icon: "error",
        text: "아이디 중복 체크를 부탁드립니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#0B1761"
      })
      return
    }

    fetch("http://localhost:8080/join",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(joinData)
    })
    .then(response => response.text())
    .then(data => {
      console.log("통신성공",data);
      if(data === "아이디 중복 체크를 부탁드립니다."){
        Swal.fire({
          icon: "error",
          text: "아이디 중복 체크를 부탁드립니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#0B1761"
        })
      }
    })
    .catch(error => {
      console.log("통신실패",error);
    })
  }
  const handleonChange = (e) =>{
    const {name , value} = e.target;
    if (name === "password") {
      setPassword(value);
    }
    setJoinData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }
  // 다음 버튼 활성화/비활성화
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);

  useEffect(() => {
    // 이메일, 인증번호, 아이디, 비밀번호, 이름, 닉네임, 전화번호가 모두 입력되었는지 확인
    if (
      inputChangeEmail && 
      recievedData &&
      joinData.username &&
      joinData.password &&
      joinData.name &&
      joinData.phone &&
      password === confirmPassword // 비밀번호가 일치하는지 확인
    ) {
      setIsAllInputFilled(true);
    } else {
      setIsAllInputFilled(false);
    }
  }, [inputChangeEmail, recievedData, joinData.username, joinData.password, joinData.name, joinData.phone, password, confirmPassword]);

  return (
    <div className={joincss['body']}>
      <section className={joincss['wrap']}>
        <div className={joincss['logo']} style={{
          backgroundImage: `url(${Logo})`,
          width: '200px',
          height: '170px',
          backgroundSize: 'cover'
        }}></div>
        <div className={joincss['entry-wrap']}>
          <p className={joincss['label-box']}>
            <label>이메일</label>
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['email-input-box']}>
              <input type="email" name="user_email" readOnly={!sendBtn} onChange={onChangeEmail} />
            </div>
            <div className={joincss['send-email-box']}>
              <button className={`${joincss['send-email-btn']} ${inputChangeEmail === "" || !sendBtn ? join['disabled'] : ''}`} disabled={inputChangeEmail === "" || !sendBtn} onClick={mailConfirm}>인증메일 발송</button>
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>인증번호</label>
          </p>
          <div className={joincss['email-box']}>
            <div className={`${joincss['email-input-box']} ${isMailConfirm === false ? joincss['disabled'] : ''}`}>
              <input className={`${joincss['mailconfirm-input']} ${!isMailConfirm ? joincss['disabled'] : ''}`} disabled={!isMailConfirm} type="text" name="verification" onChange={inputDataChange} />
              {isMailConfirm ? (
                <div className={joincss['timer']}>{String(minute).padStart(2, "0")}:{String(second).padStart(2, "0")}</div>
              ) : null}
            </div>
            <div className={joincss['send-email-box']}>
              <button className={`${joincss['mailconfirm-btn']} ${!isMailConfirm ? joincss['disabled'] : ''}`} display={!isMailConfirm} onClick={mailConfirmCheck}>인증번호 확인</button>
            </div>
          </div>
          <p className={joincss['label-box']}> 
            <label>프로필 사진</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>&#187; 프로필 사진을 등록하시려면 아래 사진을 클릭해주세요.</span>
          </p>
          <div className={joincss['profile-box']}>
            <label for="upload-profile">
              <Space wrap size={200}>
                <Avatar shape="square" size={200} src={Image} icon={<UserOutlined />} />
              </Space>
            </label>
            <input
              id="upload-profile"
              type='file'
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg'
              name='profile_img'
              onChange={onChange}
              ref={fileInput} />
          </div>
          <p className={joincss['label-box']}>
            <label>아이디</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={`${joincss['usernameCheck']} ${usernameCheckMsg === "중복된 아이디 입니다." ? joincss['red'] : ''}`}>{usernameCheckMsg}</span>
          </p>
          <div className={joincss['email-box']}>
            <div className={`${joincss['email-input-box']} ${!isUsernameDisabled ? joincss['disabled'] : ''}`}>
              <input 
              className={`${joincss['username-input']} ${!isUsernameDisabled ? joincss['disabled'] : ''}`}
              ref={usernameInput}  
              type="text" name="username" 
              disabled={!isUsernameDisabled} 
              onChange={handleonChange} />
            </div>
            <div className={joincss['send-email-box']}>
              <button className={`${joincss['send-username-btn']} ${!isUsernameDisabled ? join['disabled'] : ''}`} disabled={!isUsernameDisabled} onClick={usernameCheck}>아이디 중복 체크</button>
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>비밀번호</label>
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['same-input-box']}>
              <input type="password" name="password" onChange={handleonChange} />
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>비밀번호 재입력</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {passwordError && (
              <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>
            )}
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['same-input-box']}>
              <input type="password" onBlur={handleConfirmPasswordBlur} onChange={handleConfirmPasswordChange} />
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>이름</label>
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['same-input-box']}>
              <input type="text" name="name" onChange={handleonChange} />
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>닉네임</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>&#187; 닉네임을 작성하지 않으시면 랜덤 닉네임이 적용됩니다.</span>
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['same-input-box']}>
              <input type="text" name="nickname"  onChange={handleonChange} />
            </div>
          </div>
          <p className={joincss['label-box']}>
            <label>전화번호</label>
          </p>
          <div className={joincss['email-box']}>
            <div className={joincss['same-input-box']}>
              <input type="text" name="phone" onChange={handleonChange} />
            </div>
          </div>
            <div className={joincss['send-btn-box']}>
              <a href="/completed-joincss">
                <button className={`${joincss['send-btn']} ${!isAllInputFilled ? joincss['disabled'] : ''}`} disabled={!isAllInputFilled} onClick={join}>다음</button>
              </a>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Entryinfo;