package com.example.naengtulmaster.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDate;

@Entity
@Table(name = "user_refrige")
@Getter
@Setter
public class Refrige {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_refrige_pk")
    private Long userRefrigePk;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ingredient_id", nullable = false)
    @RestResource(exported = false) // 붙여야 json에 link가 아니라 컬럼으로 출력됨
    private Ingredient ingredient;

    @Column(name = "quantity", length = 50)
    private String quantity;

    @Column(name = "expire_date")
    private String expireDate;


    public Refrige() {
    }

    public Refrige(User user, Ingredient ingredient, String quantity, String expireDate) {
        super();
        this.user = user;
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.expireDate = expireDate;
    }


    @Override
    public String toString() {
        return "Refrige{" +
                "userRefrigePk=" + userRefrigePk +
                ", user=" + user +
                ", ingredient=" + ingredient +
                ", quantity='" + quantity + '\'' +
                ", expireDate=" + expireDate +
                '}';
    }
}