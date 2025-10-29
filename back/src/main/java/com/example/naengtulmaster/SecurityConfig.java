package com.example.naengtulmaster;

import com.example.naengtulmaster.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.Filter;
import java.util.Arrays;

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

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable().cors().and()
                        .authorizeRequests().anyRequest().permitAll();

/*        http.csrf().disable().cors().and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // /login 엔드포인트에 대한 POST 요청은 보호되지 않음
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                // 다른 모든 요청은 보호됨
                .anyRequest().authenticated().and()
                // 잘못된 자격 증명 예외처리
                .exceptionHandling()
                .authenticationEntryPoint(exceptionHandler).and()
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);*/
    }

    //eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc2MTY1ODQ3MX0.WDakJtLj7WWsvXAwbOl6rsc9mnsFPO1wUqrblUnKtkc

    @Autowired
    private AuthenticationFilter authenticationFilter;

    @Autowired
    private AuthEntryPoint exceptionHandler;


    // 클래스에 교차 출처 리소스 공유를 위한 전역 CORS 필터 추가
    // CORS 필터는 요청을 가로채고 해당 요청이 교차 출처에서 확인되면 적절한 헤더를 요청에 추가함.
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        //config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 출처를 명시적으로 정의한 버전
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(false);
        config.applyPermitDefaultValues();


        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
