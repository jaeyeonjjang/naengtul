package com.example.naengtulmaster;

import com.example.naengtulmaster.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.Arrays;

@SpringBootApplication
public class NaengtulMasterApplication  implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(NaengtulMasterApplication.class);

    @Autowired
    private IngredientRepository repository;

    @Autowired
    private RefrigeRepository refRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(NaengtulMasterApplication.class, args);
    }

    //어플리케이션이 완전히 시작되기 전 추카 코드 실행
    @Override
    public void run(String... args) throws Exception {
        Ingredient ingre1 = new Ingredient("무","채소");
        Ingredient ingre2 = new Ingredient("당근","채소");
        Ingredient ingre3 = new Ingredient("소고기","육류");

        repository.saveAll(Arrays.asList(ingre1,ingre2,ingre3));



        User user1 = new User("jyk" ,"김재연" ,"1111");

        userRepository.save(user1);


        Refrige ref1 = new Refrige(user1, ingre1 , "1개" , LocalDate.of(2025, 12, 12));
        Refrige ref2 = new Refrige(user1, ingre3 , "600g" , LocalDate.of(2025, 11, 1));

        refRepository.saveAll(Arrays.asList(ref1,ref2));

         for (Refrige ref : refRepository.findAll()) {
            logger.info(ref.toString());
        }

    }

    //깃테스트
}
