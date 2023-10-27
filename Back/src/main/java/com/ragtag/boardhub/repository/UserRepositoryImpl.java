package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository{
    private final UserMapper userMapper;
    @Override
    public Users findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    @Override
    public int join(Users users) {
        return userMapper.join(users);
    }

    @Override
    public int usernameChk(String username) {
        return userMapper.usernameChk(username);
    }

    @Override
    public Users getByCredentials(String username, String password) {
        return userMapper.getByCredentials(username, password);
    }

    @Override
    public int modifynickname(String username, String nickname) {
        return userMapper.modifynickname(username, nickname);
    }

    @Override
    public int modifyphone(String username, String phone) {
        return userMapper.modifyphone(username, phone);
    }

    @Override
    public int drawUser(String username) {
        return userMapper.drawUser(username);
    }

    @Override
    public int activateUser(String username) {
        return userMapper.activateUser(username);
    }

    @Override
    public String emailCheck(String username) {
        return userMapper.emailCheck(username);
    }

    @Override
    public int modifypassword(String username, String password) {
        return userMapper.modifypassword(username, password);
    }

    @Override
    public String passwordChk(String username) {
        return userMapper.passwordChk(username);
    }

    @Override
    public int getSocailUser(String email) {
        return userMapper.getSocailUser(email);
    }

    @Override
    public void addSocailUser(SocailDTO kakaouserinfo) {
        userMapper.addSocailUser(kakaouserinfo);
    }

}
