package com.example.naengtulmaster.domain;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface RefrigeRepository extends CrudRepository<Refrige, Long> {

    //http://localhost:9090/api/refriges/search/findByUserId?id=1
    List<Refrige> findByUserId(@Param("id") Long id);


    @Modifying //이 쿼리가 SELECT가 아닌 DELETE/UPDATE라는 걸 Spring Data JPA에 알려줌.
   // @Transactional // 삭제 쿼리는 반드시 트랜잭션 안에서 실행되어야 함.
    @Query("DELETE FROM Refrige r WHERE r.ingredient.category = :category")
    void deleteByIngredientCategory(@Param("category") String category);

}
