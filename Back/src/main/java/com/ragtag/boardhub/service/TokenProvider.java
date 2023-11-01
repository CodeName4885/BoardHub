package com.ragtag.boardhub.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class TokenProvider {
    private static final String SECRET_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiJ1c2VybmFtZSIsIm5hbWUiOiJCb2FyZEh1YiIsImlhdCI6MjAyMzEwMTh9Gh9HCQdTF4yEbnPNeW9Nsy3awDt3rHISguVihuR5A";
    public String create(String username){
        Date expriDate = Date.from(
                Instant.now()
                        .plus(30, ChronoUnit.MINUTES)
        );
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .setSubject(username)
                .setIssuer("BoardHub")
                .setIssuedAt(new Date())
                .setExpiration(expriDate)
                .compact();
    }


    public String validateAndGetUserId(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    public Date getExpirationDate(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration();
    }
    public String getUsernameFromRefreshToken(String refreshToken) {
        try {
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(refreshToken).getBody();
            return createNewAccessToken(claims.getSubject()); // 사용자명을 반환
        } catch (Exception e) {
            // 처리 로직 추가
            return null;
        }
    }
    public String createNewAccessToken(String username){
        Date expriDate = Date.from(
                Instant.now()
                        .plus(30, ChronoUnit.MINUTES)
        );
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .setSubject(username)
                .setIssuer("BoardHub")
                .setIssuedAt(new Date())
                .setExpiration(expriDate)
                .compact();
    }


}

