package com.ragtag.boardhub.security;

import com.ragtag.boardhub.domain.Users;
import com.ragtag.boardhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiece implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users findUser = userRepository.findByUsername(username);
        if(findUser == null){
            throw new UsernameNotFoundException("해당 사용자가 존재하지 않습니다... : " + username);
        }
        return new CustomUser(findUser);
    }
}
