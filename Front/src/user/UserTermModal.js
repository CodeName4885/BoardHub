<<<<<<< HEAD

=======
import joincss from "../static/game-warrior/css/join.module.css";
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d

function UserTermModal({setModalOpen2, setSectionDisplay, setBgc}) {
  const closeModal = () =>{
    setModalOpen2(false);
    setSectionDisplay('block')
    setBgc('#ffffff')
  }
  return (
    <>
<<<<<<< HEAD
        <div className="body">
        <div className="modal-wrap">
          <div className="modal-title">
            <button className="modal-closebtn" onClick={closeModal}>x</button>
            <h5 className="modal-title-content">&#91;BoardHub&#93; 개인정보 수집 및 이용동의</h5>
          </div>
          <div className="modal-body">
=======
        <div className={joincss['body']}>
        <div className={joincss['modal-wrap']}>
          <div className={joincss['modal-title']}>
            <button className={joincss['modal-closebtn']} onClick={closeModal}>x</button>
            <h5 className={joincss['modal-title-content']}>&#91;BoardHub&#93; 개인정보 수집 및 이용동의</h5>
          </div>
          <div className={joincss['modal-body']}>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
            <p><strong style={{fontSize: '18px'}}>1. 개인정보의 처리 목적</strong><br/>
            회사는 아래의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

            1) 회원제 서비스 이용에 따른 본인 식별•인증, 회원가입 의사 확인, 회원자격 유지•관리, 연령확인, 법정대리인의 동의여부 확인 및 본인인증, 부정 이용 방지와 비인가 사용 방지 및 제재, 불만처리 및 고객상담 등 민원처리, 분쟁 조정을 위한 기록보존, 고지사항 전달, 회원관리, 계정전환을 위하여 개인정보를 이용합니다.

            2) 서비스 제공에 관한 계약 이행 및 이에 따른 요금정산, 콘텐츠 제공, 구매 및 요금 결제, 물품 배송, 본인 인증, 요금 추심, 인디게임 후기 작성자의 게임 플레이타임 공개, 최적화된 서비스 제공을 위한 문제해결(서비스 안정성 확보, 부정 프로그램 사용 방지, 계정 및 아이템 보호 등), 연구, 분석 및 서비스 개발 수행, 안정적인 서비스 운영을 위하여 개인정보를 이용합니다.

            3) 신규 서비스(제품) 개발 및 특화, 접속 빈도 파악 또는 서비스 이용에 대한 통계, 인구통계학적 특성에 따른 맞춤형 서비스 제공에 개인정보를 이용합니다.</p>
          
            <p><strong style={{fontSize: '18px'}}>2. 개인정보의 수집 항목</strong><br/>
            
            1) 회사는 서비스 제공에 필요한 최소한의 개인정보를 ‘필수 항목’으로, 그 외 개인정보는 ‘선택 항목’으로 구분하여 개별적으로 동의할 수 있는 절차를 마련하고 있습니다. 또한 회사는 이용자가 필요한 최소한의 개인정보 이외의 개인정보를 제공하지 아니한다는 이유로 해당 서비스 제공을 거부하지 않습니다.
            <br/>
            2) 서비스 이용과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
            - IP주소, 접속로그, 국가, 쿠키, 서비스 이용 기록, 부정 이용 기록, 결제 기록, PC 사양정보, 기기정보(OS, 모델명, UUID 등의 고유번호, 광고식별자)
            </p>
            <p><strong style={{fontSize: '18px'}}>3. 개인정보의 보유 및 이용기간</strong><br/>
            
            회사는 원칙적으로 개인정보의 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관계법령에서 정한 기간 또는 이용자에게 동의를 받은 경우 그 기간 동안 보존합니다.

            1) 이용자의 개인정보는 원칙적으로 개인정보의 수집목적 또는 제공받은 목적이 달성되면 지체 없이 파기됩니다 단, 회사는 개인정보 도용 등으로 인한 원치 않는 회원탈퇴 등의 소비자 불만 및 분쟁해결 등을 위한 목적으로 회원탈퇴 신청 후 30일간 개인정보를 보관한 후 재생이 불가능한 방법으로 파기합니다.<br/>

            2) 상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령 및 회사 내부 방침에 의하여 보존할 필요가 있는 경우 회사는 일정한 기간 동안 이용자 정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.<br/>
            이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만 개인정보 수집 및 이용 동의를 거부하실 경우 서비스 이용이 제한되거나 불가할 수 있습니다.<br/>
	
            더 자세한 내용은 "개인정보처리방침"을 참고하시기 바랍니다.
            </p>
          </div>
<<<<<<< HEAD
          <button className="checkbtn"onClick={closeModal}>확인</button>
=======
          <button className={joincss['checkbtn']}onClick={closeModal}>확인</button>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
        </div>
      </div>
    </>
  );
}

export default UserTermModal;
