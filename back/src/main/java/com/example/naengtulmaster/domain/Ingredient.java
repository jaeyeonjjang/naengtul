package com.example.naengtulmaster.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
