# BoardHub

# [목차]

  1. 프로젝트 개요

  2. 프로젝트 설명

  3. 향후 과제

# [프로젝트 개요]

  |항목|내용|
  |-------------|-----|
  |프로젝트 소개|남녀노소 나이에 상관없이즐길 수 있는 보드게임을 한곳에 모으고 <br>사용자들 간에 소통을 통해서 서로 같이 즐길수 있는 사이트를 목표로 개발 하였습니다.|
  |개발인원|총 3명|
  |담당역할|강동하(팀장) : 회원가입 및 로그인 / 소셜 로그인 / 실시간 시뮬레이터<br> 홍지윤(테크리더) : OpenAPI 수집 / 게임 리스트 및 상세 구현<br> 김태욱(팀원) : YouTube 영상 스크랩핑 / 커뮤니티 구현 / Editor 구현<br>전원(DB 설계 / 웹 개발 (Front & Back))
  |개발 기간|총 3주 소요 (2023-10-06 ~ 2023-10-27)
  |성과 및 결과| 기한 내 기능 구현|

# [프로젝트 설명]

  1) 사용기술

       Back-End : Java / Spring Boot, Mybatis<br>
       Front-End : ReactJS, JavaScript, HTML, CSS<br>
       Server : Apache Tomcat, Node.JS, AWS EC2, Docker<br>
       Tools : IntelliJ IDEA / VS Code<br>
       OS : Windows 10<br>
       Collaboration : Git / GitHub, Notion<br>
       DB : Oracle 11g<br>

2) 목표로한 프로젝트 구조

     <img src="./image/skill.png" alt="목표로한 기술스택 아키텍쳐">

3) 프로젝트 전체 구현 기능

     1. 시뮬레이터 및 로그인 및 회원가입

         -> 로그인 및 시뮬레이터 : 일반 로그인과 소셜로그인 (구글, 카카오)

             - 일반 로그인 : 회원가입을 통한 로그인
             - 소셜 로그인 : 카카오 또는 구글을 통한 간편 로그인 기능
             - 시뮬레이터 : 메인화면 좌측 사이드바에 실시간으로 보드게임 순위가 바뀌는 시뮬레이터
        
          <img src="./image/login.gif" alt="로그인 GIF" width="800px" height="500px">
          <br>
          <br>
         -> 회원가입 : 이메일 인증을 통한 회원가입

             - 이메일 인증 : 이메일로 인증 번호를 전송 인증번호 틀릴시 가입 불가능
             - 아이디 중복 체크 : 아이디 중복시 사용 불가능
             - 랜덤 닉네임 : 닉네임을 작성하지 않고 등록시 랜덤으로 닉네임 부여

          <img src="./image/join.gif" alt="회원가입 GIF" width="800px" height="500px">
          <br>
          <br>
         -> 마이 페이지 : 비밀번호 및 닉네임, 전화 번소 수정

             - 비밀번호 변경 : 자신의 아이디 입력후 이메일인증을하고 비밀번호 변경 가능
             - 닉네임, 전화번호 변경 : 변경 버튼 클릭시 입력창 생성 바로 변경 가능
        
          <img src="./image/modify.gif" alt="회원가입 GIF" width="800px" height="500px">
          <br>
          <br>

    3. 게임 정보 및 상세 페이지

         -> 게임 정보 : 보드게임을 리스트로 보여주는 페이지

              - 카테고리 정렬 : 해당 카테고리에 맞는 게임들만 정렬되서 보여짐

          <img src="./image/gamelist.gif" alt="회원가입 GIF" width="800px" height="500px">
          <br>
          <br>

         -> 상세 페이지 : 게임들의 정보들 상세하게 볼 수 있는 페이지

              - 한 줄평 : 게임에 대한 한줄평을 작성할 수 있다.

          <img src="./image/gamecoment.gif" alt="회원가입 GIF" width="800px" height="500px">
          <br>
          <br>

   4. 커뮤니티

        -> 커뮤니티 리스트 : 게임 들의 후기들을 작성하고 서로 소통할 수있는 페이지

             - 네이버 리뷰 : 네이버에 작성된 실제 리뷰를 볼 수 있음
             - 리뷰 작성 : 에디터를 이용하여 리뷰를 작성할 수 있음
             - 리뷰 리스트 : 작성한 리뷰를 리스트로 보여짐
  
        <img src="./image/reviewlist.gif" alt="회원가입 GIF" width="800px" height="500px">
        <br>
        <br>
        -> 리뷰 상세 및 영상 공략 : 리뷰 상세와 영상공략이있는 페이지

             - 리뷰 상세 : 작성한 리뷰를 상세하게 보여짐
             - 리뷰 댓글 : 댓글을 작성 가능, 댓글에 댓글 까지 구현
             - 영상 공략 : YouTube 영상을 볼 수있음, 자신만의 공략을 작성할 수도 있음

        <img src="./image/reviewreplyandyoutube.gif" alt="회원가입 GIF" width="800px" height="500px">
        <br>
        <br>

 # [향후 과제]

   1. 평점 기능 추가 및 좋아요와 찜 기능 추가
   2. 커뮤니티 UI 개선
   3. 실시간 랭킹 자체 실시간 데이터로 개선 - 위 평점 기능을 추가해서 변경 가능
   4. 지도 기능 추가 - 메이트 구할 때 유용하게 사용 
   5. 관리자 기능 추가 - 사용자가 보드게임을 수정 또는 추가 요청을 관리할 수 있음 

