package com.example.naengtulmaster.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

@Component
public class JwtService {
    static final long EXPIRATION_TIME = 86400000; // 1일을 밀리초로 계산한 값
    static final String PREFIX = "Bearer ";

    // 비밀키 생성. 이렇게 하는건 시연용도지만 실제 운영에서는 어플리케이션의 구성에서 비밀 키를 읽어야 함
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // 서명된 JWT 토큰 생성
    public String getToken(String username) {
        String token = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();

        return token;
    }

    // 요청 권한 부여 헤더에서 토큰을 가져와 토큰을 사용하고 사용자 이름을 얻음
    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null) {
            String user = Jwts.parserBuilder()
                    .setSigningKey(key) // 토큰검증을 위한 비밀 키 지정
                    .build()
                    .parseClaimsJws(token.replace(PREFIX,""))
                    .getBody()
                    .getSubject();

            if(user != null) {
                return user;
            }
        }
        return null;
    }
}
