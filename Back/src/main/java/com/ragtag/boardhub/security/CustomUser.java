package com.ragtag.boardhub.security;

import com.ragtag.boardhub.domain.Users;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;
import java.util.Collection;

@Getter
public class CustomUser extends User {

    private Users users;
    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    //우리 버전의 생성자 -> 부모 생성자 호출하는 패턴은 유지
    public CustomUser(Users users) {
        super(users.getUsername(), users.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority(users.getRole().getValue())));
        this.users = users;
    }
}
