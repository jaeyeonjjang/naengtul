package com.example.naengtulmaster.domain;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @Column(name = "nickname", nullable = false, length = 100)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

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
    public User(String username, String nickname, String password, String role) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
    }


    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", username='" + username + '\'' +
                ", inputDate=" + inputDate + '\'' +
                ", role=" + role +
                '}';
    }


}