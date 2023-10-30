import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import mypage from "../../static/game-warrior/css/mypage.module.css"
import { Call } from "../../UserApiConfig/ApiService";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { modifynickname } from "../../UserApiConfig/ApiService";
import { modifyphone } from "../../UserApiConfig/ApiService";
import { drawUser } from "../../UserApiConfig/ApiService";
import Swal from "sweetalert2";


function Mypage() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const socialtoken = sessionStorage.getItem("TOKEN");
  const [userData, setUserData] = useState(null);
  console.log(userData);
  useEffect(() => {
    if (token !== null) {
      Call("/mypage", "POST", null)
        .then((response) => {
          setUserData(response);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
    if(socialtoken !== null){
      const email = sessionStorage.getItem("USER_EMAIL");
      Call("/socialmypage", "POST", email)
      .then((response)=>{
        setUserData(response);
      })

    }
  }, [token, socialtoken]);
  const [showModify, setShowModify] = useState(false);
    
  const handleModifyClick = () =>{
    setShowModify(!showModify);
    setShowModifyPhone(false);
  }
  const handleCancleClick = () =>{
    setShowModify(false);
  }
  const [showModifyPhone, setShowModifyPhone] = useState(false);
    
  const handlemodifyPhoneClick = () =>{
    setShowModifyPhone(!showModifyPhone);
    setShowModify(false);
  }
  const handlePhoneCancleClick = () =>{
    setShowModifyPhone(false);
  }

  const [nicknameVal, setNicknameVal] = useState("");
  console.log(nicknameVal);
  const onChangeNicknameInput = (e) =>{
    const modifynicknameinputVal = e.target.value;
    setNicknameVal(modifynicknameinputVal)
  }
   const HandleOnClickNickname = () => {
    console.log("onClick");
    modifynickname(nicknameVal);
   }

   const [phoneVal, setPhoneVal] = useState("");
  console.log(phoneVal);
  const onChangePhoneInput = (e) =>{
    const modifyPhoneinputVal = e.target.value;
    setPhoneVal(modifyPhoneinputVal)
  }
   const HandleOnClickPhone = () => {
    console.log("onClick");
    modifyphone(phoneVal);
   }

  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
      탈퇴 신청후에는 로그인이 불가능 하며, 이용이 제한됩니다.
    </Tooltip>
  );

  const drawClick = () =>{
    Swal.fire({
      icon: "warning",
      title: "회원 탈퇴 신청",
      html: "<h6>회원탈퇴 완료 시 해당 계정의 모든 정보가 삭제되어 복구가 불가능합니다.</h6><br/><h6>회원탈퇴 신청 취소는 15일 이내에 가능합니다.</h6><br/>",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonText: "회원 탈퇴 신청",
      confirmButtonColor: "#0B1761",
      cancelButtonText: "취소"
    }).then((result) => {
        if(result.isConfirmed){
          drawUser();
        }
    })
  }

  const movement = ()=>{
    window.location.href="/find/pwd";
  }
  if(token === null && socialtoken === null){
    return <Navigate to="/login" replace={true} />
  }else{

    

  return (
    <>
    <Header />
    <div className={mypage['body']}>
      <div className={mypage['content-title-box']}>
       <h3 className={mypage['content-title']}>내 정보</h3>
      </div>
      <section className={mypage['mypage-wrap']}>
        <div className={mypage['content-side']}>
            <div className={mypage['profile-card']}>
                <div className={mypage['profile-card-img']}>
                  {socialtoken != null ? (
                    <img src={userData && userData.profileimage ? userData.profileimage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="프로필 이미지"/>
                  ) : (
                    <img
                      src={
                        "C:\\kdh\\project3\\Back\\src\\main\\resources\\static\\img\\" +
                        (userData && userData.profile
                          ? userData.profile
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                      }
                      alt="프로필 이미지"
                    />
                  )}
                </div>
                <div className={mypage['profile-nickname-box']}>
                  {socialtoken != null ? (
                    <span className={mypage['profile-nickname']}>{userData && userData.name}</span>
                  ) : (
                    <span className={mypage['profile-nickname']}>{userData && userData.nickname}</span>
                  )}
                  
                </div>
                <ul className={mypage['profile-info']}>
                  <li>
                    활동 일수
                  </li>
                  <li>
                    작성 게시글
                  </li>
                  <li>
                    작성 댓글
                  </li>
                </ul>
            </div>
          <nav className={mypage['side-nav']}>
            <ul className={mypage['side-nav-list']}>
              <li className={`${mypage['side-nav-item']} ${mypage['active']}`}>
                  회원 정보
              </li>
              <li className={mypage['side-nav-item']}>
                  게임 정보
              </li>
              <li className={mypage['side-nav-item']}>
                  내 활동
              </li>
              <li className={mypage['side-nav-item']}>
                  댓글
              </li>
            </ul>
          </nav>
        </div>
        <div className={mypage['content-body']}>
          <div className={mypage['content-body-wrap']}>
            <h3 className={mypage['content-body-title']}>회원 정보</h3>
          </div>
          <nav className={mypage['content-body-nav']}>
            <ul className={mypage['content-body-items']}>
              <li className={mypage['content-body-items-item']}>
                회원 정보
              </li>
            </ul>
          </nav>
          <div className={mypage['content-body-form-section']}>
            <h4 className={mypage['content-body-form-section-title']}>회원정보 설정</h4>
          </div>
          <table className={mypage['content-body-form-section-table']}>
            <colgroup>
              <col className={mypage['first-col']} />
              <col className={mypage['second-col']} />
            </colgroup>
            <tbody>
              <tr>
                <th className={mypage['table-h']}>회원번호</th>
                {socialtoken != null ? (<td className={mypage['table-d']}>{userData && userData.user_id}</td>)
                :(<td className={mypage['table-d']}>{userData && userData.user_id}</td>)}
              </tr>
            </tbody>
            {socialtoken != null ? (null) : (
              <tbody>
              <tr>
                <th className={mypage['table-h']}>아이디</th>
                <td className={mypage['table-d']}>{userData && userData.username}</td>
              </tr>
            </tbody>
            )}
            {socialtoken != null ? (null) : (
              <tbody>
              <tr>
                <th className={mypage['table-h']}>비밀번호</th>
                <td className={mypage['table-d']}><strong>●●●●●●●●●●</strong><button className={mypage['table-btn']} onClick={movement}>변경</button></td>
              </tr>
            </tbody>
            )}
            {socialtoken != null ? (null) : (
              <tbody>
              <tr>
                <th className={mypage['table-h']}>닉네임</th>
                <td className={mypage['table-d']}>{userData && userData.nickname}<button className={`${mypage['table-btn']} ${mypage['nickname-btn']}`} onClick={handleModifyClick} style={{display: showModify ? 'none' : 'inline-block'}}>변경</button>
                  {showModify &&(
                  <div className={mypage['modify-nickname-box']} style={{display: 'block'}}>
                    <input type="text" name="nickname" className={mypage['modify-nickname-input']} placeholder="변경 닉네임" onChange={onChangeNicknameInput} />
                    <br/>
                    <button className={mypage['table-btn']} style={{marginLeft: '0'}} onClick={HandleOnClickNickname}>변경</button> <button className={mypage['table-btn']} style={{backgroundColor: "#FFFFFF", color: "#666666", border: "1px solid #d9d9d9"}} onClick={handleCancleClick}>취소</button>
                  </div>
                  )}
                </td>
              </tr>
            </tbody>
            )}
            
            <tbody>
              <tr>
                <th className={mypage['table-h']}>이메일</th>
                {socialtoken != null ? (
                  <td className={mypage['table-d']}>{userData && userData.email}</td>
                ) : (
                  <td className={mypage['table-d']}>{userData && userData.user_email}</td>
                )}
              </tr>
            </tbody>
            {socialtoken != null ? (null) : (
              <tbody>
              <tr>
                <th className={mypage['table-h']}>전화번호</th>
                <td className={mypage['table-d']}>{userData && userData.phone}<button className={mypage['table-btn']} onClick={handlemodifyPhoneClick} style={{display: showModifyPhone ? 'none' : 'inline-block'}}>변경</button>
                  {showModifyPhone &&(
                  <div className={mypage['modify-nickname-box']} style={{display: 'block'}}>
                    <input type="text" name="nickname" className={mypage['modify-nickname-input']} placeholder="변경 전화번호" onChange={onChangePhoneInput} />
                    <br/>
                    <button className={mypage['table-btn']} style={{marginLeft: '0'}} onClick={HandleOnClickPhone}>변경</button> <button className={mypage['table-btn']} style={{backgroundColor: "#FFFFFF", color: "#666666", border: "1px solid #d9d9d9"}} onClick={handlePhoneCancleClick}>취소</button>
                  </div>
                  )}
                </td>
              </tr>
            </tbody>
            )}
            <tbody>
              <tr>
                <th className={mypage['table-h']}>탈퇴신청</th>
                <td className={mypage['table-d']}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                  <span><AiOutlineInfoCircle size={20} color="#878787"/></span>
                  </OverlayTrigger>
                  <button className={mypage['table-btn']} style={{backgroundColor: "#FFFFFF", color: "#666666", border: "1px solid #d9d9d9"}} onClick={drawClick}>탈퇴신청</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
  }
}

export default Mypage;
