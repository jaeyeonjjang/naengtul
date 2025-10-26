package com.example.naengtulmaster.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    // null 예외 방지를 위해 Optional을 반환함
    Optional<User> findByUsername(String username);
}
