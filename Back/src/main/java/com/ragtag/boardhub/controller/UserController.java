package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.domain.Users;
import com.ragtag.boardhub.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody Users users){
        log.info("회원정보 = {}", users);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}
