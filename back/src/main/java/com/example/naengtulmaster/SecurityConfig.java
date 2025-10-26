package com.example.naengtulmaster;

import com.example.naengtulmaster.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    /*
    protected void configure(HttpSecurity http) throws Exception {

    }

    @Bean
    public UserDetailsService userDetailsService() {

        // 인메모리 사용자 생성
        UserDetails user =
                User.withDefaultPasswordEncoder() // 운영 단계에서는 안전 문제로 적합하지 않음
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
        // 개발 과정 중에는 인메모리 사용자를 이용해도 되지만 실제 어플리케이션에는 사용자를 데이터베이스에 저장해야함

        // 암호는 일반 텍스트형식으로 저장하면 안됨
        // 스프링 시큐리티는 여러 해싱 알고리즘 (ex:bcrypt)를 제공함
    }*/


    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    // 운영은 인메모리가 아니라 db에서 사용자를 활성화하기 때문에 메서드 추가
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        // 암호를 db에 저장하기 전에 bcrypt로 암호화함
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }


}
