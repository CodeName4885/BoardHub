import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png"
<<<<<<< HEAD
import "../static/game-warrior/css/join.css";
function Join() {
  return (
    <div className="body">
      <section className="wrap">
        <div className="logo" style={
=======
import joincss from "../static/game-warrior/css/join.module.css";
function Join() {
  return (
    <div className={joincss['body']}>
      <section className={joincss['wrap']}>
        <div className={joincss['logo']} style={
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
          {
            backgroundImage:`url(${Logo})`,
            width: '200px',
            height: '170px',
            backgroundSize: 'cover'
          }
        }></div>
<<<<<<< HEAD
        <h3 className="title"><strong>BoardHub</strong> 가입을 시작합니다!</h3>
        <p className="coment">회원가입을 위해 가입 방식을 선택하세요.</p>
        <a href="/joinagree">
          <button className="join-email">이메일로 가입하기</button>
        </a>
        <p className="middle-line"><span className="or">또는</span></p>
          <div className="social-list">
            <ul>
              <li>구글</li>
              <li>카카오</li>
              <li>네이버</li>
              <li>페이스북</li>
            </ul>
          </div>
=======
        <h3 className={joincss['title']}><strong>BoardHub</strong> 가입을 시작합니다!</h3>
        <p className={joincss['coment']}>회원가입을 위해 가입 방식을 선택하세요.</p>
        <a href="/joinagree">
          <button className={joincss['join-email']}>이메일로 가입하기</button>
        </a>
>>>>>>> c78795c565dca992dd7c51979aa55b10585ea39d
      </section>
    </div>
  );
}

export default Join;
