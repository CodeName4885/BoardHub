package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;

public interface UserRepository {
    Users findByUsername(String username);

    int join(Users users);

    int usernameChk(String username);

    Users getByCredentials(String username, String password);

    int modifynickname(String username, String nickname);

    int modifyphone(String username, String phone);

    int drawUser(String username);

    int activateUser(String username);

    String emailCheck(String username);

    int modifypassword(String username, String password);

    String passwordChk(String username);

    int getSocailUser(String email);

    void addSocailUser(SocailDTO kakaouserinfo);
}
