package com.ragtag.boardhub.DTO.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccessTokenResponse {
    private String token;
    private Date expiratedTime;
    private Long user_id;
    private int user_status;
    public AccessTokenResponse(String token, Date expiratedTime, int user_status){
        this.token = token;
        this.expiratedTime = expiratedTime;
        this.user_status = user_status;
    }


}
