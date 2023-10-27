package com.ragtag.boardhub.repository;

import com.ragtag.boardhub.DTO.userDTO.SocailDTO;
import com.ragtag.boardhub.domain.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    Users findByUsername(String username);

    int join(Users users);

    int usernameChk(String username);

    Users getByCredentials(@Param("username") String username, @Param("password") String password);

    int modifynickname(@Param("username")String username, @Param("nickname")String nickname);

    int modifyphone(@Param("username") String username, @Param("phone") String phone);

    int drawUser(String username);

    int activateUser(String username);

    String emailCheck(String username);

    int modifypassword(@Param("username") String username, @Param("password") String password);

    String passwordChk(String username);

    int getSocailUser(String email);

    void addSocailUser(SocailDTO kakaouserinfo);
}
