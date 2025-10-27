package com.example.naengtulmaster;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class AuthEntryPoint  implements AuthenticationEntryPoint {

    //예외를 매개변수로 받음
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        // 예외가 발생하면 응답 상태를 401 Unauthorized로 설정함
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // 본문에 예외 메시지 기록
        PrintWriter writer = response.getWriter();
        writer.println("Error: " + authException.getMessage());
    }
}
