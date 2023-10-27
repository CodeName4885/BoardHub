package com.ragtag.boardhub.DTO.userDTO;

import lombok.Data;

import java.util.Date;

@Data
public class AccessTokenResponse {
    private String token;
    private Date expiratedTime;
    private int user_status;
    public AccessTokenResponse(String token, Date expiratedTime, int user_status){
        this.token = token;
        this.expiratedTime = expiratedTime;
        this.user_status = user_status;
    }

}
