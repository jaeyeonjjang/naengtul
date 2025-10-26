package com.example.naengtulmaster.controller;

import com.example.naengtulmaster.domain.Refrige;
import com.example.naengtulmaster.domain.RefrigeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RefrigeController {
    @Autowired
    private RefrigeRepository repository;

    @RequestMapping("refriges")
    public Iterable<Refrige> getMyRefrige(){
        return repository.findAll();
    }

}
