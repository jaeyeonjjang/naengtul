package com.example.naengtulmaster.controller;

import com.example.naengtulmaster.domain.Refrige;
import com.example.naengtulmaster.domain.RefrigeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequiredArgsConstructor //final 필드 전용 생성자를 자동으로 만들어주고 Autowired도 생략 가능. 필드나 세터에 주입하는 것 보다 안정적이며 테스트용이함
public class RefrigeController {

    private final RefrigeRepository repository;

    // 생성자를 사용하는 이유 : 객체의 의존성을 명확히 주입하기 위해. 코드 읽는 사람 입장에서 이 클래스가 뭘 필요로 하는지 즉시 이해 가능. 테스트가 쉬워짐. IoC/DI원칙과 맞음
    @Autowired
    public RefrigeController(RefrigeRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("refriges")
    public Iterable<Refrige> getMyRefrige(){
        return repository.findAll();
    }

}
