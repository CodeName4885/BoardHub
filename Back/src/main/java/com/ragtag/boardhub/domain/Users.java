package com.ragtag.boardhub.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Users {
    private Long user_id;
    private String username;
    private String password;
    private String profile;
    private String name;
    private String nickname;
    private Integer user_status;
    private String phone;
    private String user_email;
    private LocalDateTime regdate;
    private LocalDateTime log_date;
}
