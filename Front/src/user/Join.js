import Logo from "../static/game-warrior/img/BoardHub-Logo-Tp.png"
import joincss from "../static/game-warrior/css/join.module.css";
function Join() {
  return (
    <div className={joincss['body']}>
      <section className={joincss['wrap']}>
        <div className={joincss['logo']} style={
          {
            backgroundImage:`url(${Logo})`,
            width: '200px',
            height: '170px',
            backgroundSize: 'cover'
          }
        }></div>
        <h3 className={joincss['title']}><strong>BoardHub</strong> 가입을 시작합니다!</h3>
        <p className={joincss['coment']}>회원가입을 위해 가입 방식을 선택하세요.</p>
        <a href="/joinagree">
          <button className={joincss['join-email']}>이메일로 가입하기</button>
        </a>
      </section>
    </div>
  );
}

export default Join;
