package com.example.naengtulmaster.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)  // 리포지터리가 REST 리소스로 노출되지 않게 함
public interface UserRepository extends CrudRepository<User, Long> {

    // null 예외 방지를 위해 Optional을 반환함
    Optional<User> findByUserName(String username);
}
