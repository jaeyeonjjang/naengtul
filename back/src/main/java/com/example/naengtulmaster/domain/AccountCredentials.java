package com.example.naengtulmaster.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

// 인증을 위한 자격 증명을 포함할 클래스
// 자격 증명을 db에 저장하지는 않으므로 @Entity 어노테이션 사용하지 않음
public class AccountCredentials {
    private String username;
    private String password;
}
