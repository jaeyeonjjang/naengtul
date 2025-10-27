package com.example.naengtulmaster.controller;

import com.example.naengtulmaster.domain.AccountCredentials;
import com.example.naengtulmaster.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class LoginController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(),
                        credentials.getPassword());

        Authentication auth = authenticationManager.authenticate(creds);

        // 토큰 생성
        String jwts = jwtService.getToken(auth.getName());

        // 생성된 토큰으로 응답을 생성. 성공하면 Authorization 헤더가 포함됨
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();

    }
}