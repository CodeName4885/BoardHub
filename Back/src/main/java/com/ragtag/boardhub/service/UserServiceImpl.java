package com.ragtag.boardhub.service;

import com.ragtag.boardhub.DTO.Images;
import com.ragtag.boardhub.DTO.ImgUpload;
import com.ragtag.boardhub.DTO.userDTO.KoreanNickNameGenerator;
import com.ragtag.boardhub.DTO.userDTO.Role;
import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;
import com.ragtag.boardhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final ImgUpload imgUpload;
    private final UserRepository userRepository;
    private final KoreanNickNameGenerator koranNickNameGenerator;
    //프로필 이미지를 DB에 저장하기위해 생성
    private final Users realUser = new Users();

    //회원가입
    @Override
    public int join(Users users) {
        realUser.setUser_email(users.getUser_email());
        realUser.setName(users.getName());
        if(users.getNickname().isEmpty()){
            realUser.setNickname(koranNickNameGenerator.generateNickName());
        }else{
            realUser.setNickname(users.getNickname());
        }
        realUser.setPassword(users.getPassword());
        realUser.setPhone(users.getPhone());
        realUser.setUsername(users.getUsername());
        realUser.setRole(Role.USER);
        log.info("서비스 realUser = {}", realUser);
        return userRepository.join(realUser);
    }
    // 프로필 이미지 name 추출
    @Override
    public void imgUpload(MultipartFile profile) throws IOException {
        Images images = imgUpload.saveFile(profile);
        log.info("서비스 images : {}", images.getFileName());
        realUser.setProfile(images.getFileName());
    }
    //아이디 중복 체크
    @Override
    public Boolean usernameChk(String username) {
        boolean result = false;
        int num = userRepository.usernameChk(username);
        if(num == 0){
            result = true;
        }
        return result;
    }

    @Override
    public Users getByCredentials(String username, String password) {
        return userRepository.getByCredentials(username,password);
    }

    @Override
    public Users findByUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean modifyNickname(String username, String nickname) {
        boolean response = false;
        int result = userRepository.modifynickname(username, nickname);
        if (result > 0) {
            response = true;
        }
        return response;
    }

    @Override
    public boolean modifyphone(String username, String phone) {
        boolean response = false;
        int result = userRepository.modifyphone(username, phone);
        if (result > 0) {
            response = true;
        }
        return response;
    }

    @Override
    public boolean drawUser(String username) {
        boolean response = false;
        int result = userRepository.drawUser(username);
        if (result > 0) {
            response = true;
        }
        return response;
    }

    @Override
    public boolean activateUser(String username) {
        boolean response = false;
        int result = userRepository.activateUser(username);
        if (result > 0) {
            response = true;
        }
        return response;
    }

    @Override
    public String emailCheck(String username) {
        return userRepository.emailCheck(username);
    }

    @Override
    public boolean modifypassword(String username, String password) {
        boolean response = false;
        int result = userRepository.modifypassword(username, password);
        if (result > 0) {
            response = true;
        }
        return response;
    }

    @Override
    public String passwordChk(String username) {
        return userRepository.passwordChk(username);
    }

    @Override
    public Boolean getSocailUser(String email) {
        boolean response = false;
        int result = userRepository.getSocailUser(email);
        log.info("Service result = {}", result);
        if(result > 0){
            response = true;
        }
        return response;
    }

    @Override
    public int addSocailUser(SocailDTO kakaouserinfo) {
        return userRepository.addSocailUser(kakaouserinfo);
    }

    @Override
    public Users getUserNickname(Long user_id) {
        System.out.println("user_id SErvice :" + user_id);
        return userRepository.getUserNickname(user_id);
    }


}
