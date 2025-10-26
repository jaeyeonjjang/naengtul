package com.example.naengtulmaster.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IngredientRepository extends CrudRepository<Ingredient, Long> {

    //카테고리로 재료를 검색
    List<Ingredient> findByCategory(String category);

    //재료 아이디로 재료를 검색
    List<Ingredient> findByIngredientId(Long id);
}
