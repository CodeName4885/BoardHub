package com.ragtag.boardhub.controller;


import com.ragtag.boardhub.DTO.userDTO.AccessTokenResponse;
import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;
import com.ragtag.boardhub.service.RegisterMail;
import com.ragtag.boardhub.service.TokenProvider;
import com.ragtag.boardhub.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    private final RegisterMail registerMail;
    private final TokenProvider tokenProvider;

    // 이메일 인증
    @PostMapping("/mailconfirm")
    @ResponseBody
    public String mailConfirm(@RequestBody String email) throws Exception {
        log.info("email = {}", email);
        try {
            email = email.replaceAll("\"", "");
            String code = registerMail.sendSimpleMessage(email);
            System.out.println("인증코드 : " + code);
            return code;
        } catch (Exception e) {
            e.printStackTrace();  // 콘솔에 오류를 출력
            return "오류! 이메일을 정확히 입력해주세요";
        }
    }

    // 프로필 이미지
    @PostMapping("/profile")
    public ResponseEntity<String> recieveProfile(MultipartFile profile) throws IOException {
        log.info("프로필 이미지 파일 : {}", (Object) profile);
        userService.imgUpload(profile);
        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

    //아이디 중복 체크
    @PostMapping("/usernamecheck")
    public ResponseEntity<Boolean> usernameCheck(@RequestBody String username){
        username = username.replace("\"", "");//json으로 가져올때 ""표를 붙혀서 가져오기 떄문에 제거 해줌
        log.info("아이디 중복체크 : {}", username);
        Boolean result = userService.usernameChk(username);
        return new ResponseEntity<Boolean>(result,HttpStatus.OK);
    }

    //회원 가입
    @PostMapping( "/join")
    public ResponseEntity<String> join(@RequestBody Users users){
        log.info("회원정보 = {}", users);
        Boolean usernameChk = userService.usernameChk(users.getUsername());
        String result = "";
        if(usernameChk){
            int joinUser = userService.join(users);
            if(joinUser == 1){
                result = "success";
            }
        }else{
            result = "아이디 중복 체크를 부탁드립니다.";
        }
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }
    // 로그인
    // 클라이언트에서 POST 메소드를 사용하여 로그인 정보를 전송할 때 해당 정보를 처리하는 엔드포인트
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody Users users){
        Users user = userService.getByCredentials(
                users.getUsername(),
                users.getPassword()
        );
        log.info("users = {}" , user);
        if(user != null){
            final String token = tokenProvider.create(user.getUsername());
            Date expiratedTime = tokenProvider.getExpirationDate(token);
            log.info("token: {}", token);
            log.info("expiratedTime : {}", expiratedTime);
            AccessTokenResponse accessTokenResponse = new AccessTokenResponse(token, expiratedTime, user.getUser_id(), user.getUser_status());

            return ResponseEntity.ok(accessTokenResponse);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden 상태 코드 반환
        }
    }
    @PostMapping("/mypage")
    public ResponseEntity<?> getMypageData(@AuthenticationPrincipal String username){
        log.info("mypage username = {}", username);
        Users users = userService.findByUser(username);
        log.info("mypage users = {}", users);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshtoken(@AuthenticationPrincipal String username){
        log.info("username = {}",username);
        if(username != null){
            String newAccessToken = tokenProvider.createNewAccessToken(username);
            Date expiratedTime = tokenProvider.getExpirationDate(newAccessToken);
            log.info("expiratedTime : {}", expiratedTime);
            AccessTokenResponse accessTokenResponse = new AccessTokenResponse(newAccessToken, expiratedTime, 1);
            return ResponseEntity.ok(accessTokenResponse);
        }else {
            return new ResponseEntity<>("fail..",HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/modifynickname")
    public ResponseEntity<?> modifynickname(@AuthenticationPrincipal String username, @RequestBody String nickname){
        nickname = nickname.replace("\"", "");//json으로 가져올때 ""표를 붙혀서 가져오기 떄문에 제거 해줌
        log.info("nickname => {}", nickname);
        Users byUser = userService.findByUser(username);
        if(byUser != null){
            boolean result = userService.modifyNickname(username, nickname);
            if(result){
                return ResponseEntity.ok().body("success");
            }else{
                return ResponseEntity.badRequest().body("result fail..");
            }
        }else {
            return ResponseEntity.badRequest().body("fail...");
        }
    }
    @PostMapping("/modifyphone")
    public ResponseEntity<?> modifyphone(@AuthenticationPrincipal String username, @RequestBody String phone){
        phone = phone.replace("\"", "");
        log.info("phone => {}", phone);
        Users byUser = userService.findByUser(username);
        if(byUser != null){
            boolean result = userService.modifyphone(username, phone);
            if(result){
                return ResponseEntity.ok().body("success");
            }else{
                return ResponseEntity.badRequest().body("result fail..");
            }
        }else {
            return ResponseEntity.badRequest().body("fail...");
        }
    }

    @PostMapping("/drawuser")
    public ResponseEntity<?> drawuser(@AuthenticationPrincipal String username){
        Users byUser = userService.findByUser(username);
        if(byUser != null){
            boolean result = userService.drawUser(username);
            if(result){
                return ResponseEntity.ok().body("success");
            }else{
                return ResponseEntity.badRequest().body("result fail..");
            }
        }else {
            return ResponseEntity.badRequest().body("fail...");
        }
    }
    @PostMapping("/activateuser")
    public ResponseEntity<?> activateuser(@RequestBody Users users){
        Users user = userService.getByCredentials(
                users.getUsername(),
                users.getPassword()
        );
        if(user != null){
            boolean result = userService.activateUser(users.getUsername());
            if(result){
                return ResponseEntity.ok().body("success");
            }else{
                return ResponseEntity.badRequest().body("result fail..");
            }
        }else {
            return ResponseEntity.badRequest().body("fail...");
        }
    }

    @PostMapping("/usernamechk")
    public ResponseEntity<?> usernamechk(@AuthenticationPrincipal String username, @RequestBody String chkUsername){
        chkUsername = chkUsername.replace("\"", "");
        if(username.equals(chkUsername)){
            return ResponseEntity.ok(true);
        }else {
            return ResponseEntity.badRequest().body(false);
        }
    }
    @PostMapping("/emailchk")
    public ResponseEntity<?> emailchk(@AuthenticationPrincipal String username, @RequestBody String email){
        email = email.replace("\"", "");
        Users byUser = userService.findByUser(username);
        if(byUser != null){
            String result = userService.emailCheck(username);
            if(result.equals(email)){
                return ResponseEntity.ok(true);
            }else{
                return ResponseEntity.badRequest().body(false);
            }
        }else {
            return ResponseEntity.badRequest().body("fail...");
        }
    }

    @PostMapping("/getusername")
    public ResponseEntity<?> getusername(@AuthenticationPrincipal String username){

        HashMap<String, String> response = new HashMap<>();
        response.put("username", username);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/modifypassword")
    public ResponseEntity<?> modifypassword(@AuthenticationPrincipal String username, @RequestBody String password){
        password = password.replace("\"", "");
        log.info("password => {}", password);
        String passwordChk = userService.passwordChk(username);

        if(passwordChk.equals(password)){
            return ResponseEntity.badRequest().body("fail...");
        }else {
            boolean result = userService.modifypassword(username, password);
            if(result){
                return ResponseEntity.ok(true);
            }else {
                return ResponseEntity.badRequest().body(false);
            }
        }

    }

    @PostMapping("/kakaouserinfoadd")
    public ResponseEntity<?> kakaoUserInfoAdd(@RequestBody SocailDTO kakaouserinfo){
        log.info("kakao user info add start!");
        log.info("kakaoUserInfo => {}", kakaouserinfo);
        Boolean result = userService.getSocailUser(kakaouserinfo.getEmail());
        if(!result){
            int num = userService.addSocailUser(kakaouserinfo);
            if(num != 0){
                Users users = userService.findByUser(kakaouserinfo.getEmail());
                return ResponseEntity.ok(users.getUser_id());
            }
        }else{
            Users users = userService.findByUser(kakaouserinfo.getEmail());
            return ResponseEntity.ok(users.getUser_id());
        }
        return ResponseEntity.ok(userService.findByUser(kakaouserinfo.getEmail()).getUser_id());
    }

    @PostMapping("/googleuserinfoadd")
    public ResponseEntity<?> googleUserInfoAdd(@RequestBody SocailDTO googleuserinfo){
        log.info("google user info add start!");
        log.info("googleuserinfo => {}", googleuserinfo);
        Boolean result = userService.getSocailUser(googleuserinfo.getEmail());

        if(!result){
            int num = userService.addSocailUser(googleuserinfo);
            if(num != 0){
                Users users = userService.findByUser(googleuserinfo.getEmail());
                return ResponseEntity.ok(users.getUser_id());
            }
        }else{
            Users users = userService.findByUser(googleuserinfo.getEmail());
            return ResponseEntity.ok(users.getUser_id());
        }
        return ResponseEntity.ok(userService.findByUser(googleuserinfo.getEmail()).getUser_id());
    }

    @PostMapping("/socialmypage")
    public ResponseEntity<?> socialMypage(@RequestBody String email){
        email = email.replace("\"", "");
        log.info("social mypage email = {}", email);
        Users users = userService.findByUser(email);
        if (users != null) {
            SocailDTO socailDTO = new SocailDTO();
            socailDTO.setUser_id(users.getUser_id());
            socailDTO.setEmail(users.getUser_email());
            socailDTO.setName(users.getName());
            socailDTO.setProfileimage(users.getProfile());
            return ResponseEntity.ok(socailDTO);
        }else{
            return ResponseEntity.badRequest().body("failed...");
        }
    }
}
