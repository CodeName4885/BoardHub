package com.ragtag.boardhub.service;

import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    int join(Users users);

    void imgUpload(MultipartFile profile) throws IOException;

    Boolean usernameChk(String username);

    Users getByCredentials(String username, String password);

    Users findByUser(String username);

    boolean modifyNickname(String username, String nickname);

    boolean modifyphone(String username, String phone);

    boolean drawUser(String username);

    boolean activateUser(String username);

    String emailCheck(String username);

    boolean modifypassword(String username, String password);

    String passwordChk(String username);

    Boolean getSocailUser(String email);

    int addSocailUser(SocailDTO kakaouserinfo);
}
