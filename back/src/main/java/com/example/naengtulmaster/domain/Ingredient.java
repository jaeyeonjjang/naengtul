package com.example.naengtulmaster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Long ingredientId;

    private String ingredientName;

    private String category;

/*    @JsonIgnore
    @OneToOne(mappedBy = "user_refrige")
    private Refrige refrige;*/

    public Ingredient() {
    }

    public Ingredient(String ingredientName, String category) {
        this.ingredientName = ingredientName;
        this.category = category;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "ingredient_id=" + ingredientId +
                ", ingredient_name='" + ingredientName + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
