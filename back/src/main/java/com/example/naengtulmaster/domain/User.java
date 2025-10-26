package com.example.naengtulmaster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "`user`")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true, length = 50)
    private String userId;

    @Column(name = "user_name", nullable = false, length = 100)
    private String userName;

    @Column(nullable = false, length = 255)
    private String password;

    @CreationTimestamp
    @Column(name = "input_date", nullable = false, updatable = false)
    private LocalDateTime inputDate;


    @JsonIgnore
    @OneToMany(cascade=CascadeType.ALL, mappedBy="user")
    private List<Refrige> ingredients;

    // 기본 생성자
    public User() {
    }

    // 생성자 (inputDate는 자동 생성)
    public User(String userId, String userName, String password) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
    }

    public String toString() {
        return "User{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", inputDate=" + inputDate +
                '}';
    }


}