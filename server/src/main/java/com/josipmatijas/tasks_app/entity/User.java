package com.josipmatijas.tasks_app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ta_user")
public class User {

    public User(String name, String lastName, boolean admin, boolean loggedIn, String secret) {
        this.name = name;
        this.lastName = lastName;
        this.admin = admin;
        this.loggedIn = loggedIn;
        this.secret = secret;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
    @SequenceGenerator(name = "user_generator", sequenceName = "user_sequence")
    private long id;

    @Column(name = "ta_name")
    private String name;

    @Column(name = "ta_last_name")
    private String lastName;

    @Column(name = "ta_admin")
    private boolean admin;

    @Column(name = "ta_logged_in")
    private boolean loggedIn;

    @Column(name = "ta_secret")
    private String secret;

//    @ManyToMany
//    @JoinTable(
//            name = "ta_user_has_task",
//            joinColumns = {@JoinColumn(name = "ta_user_id")},
//            inverseJoinColumns = {@JoinColumn(name = "ta_task_id")}
//    )
//    private Set<Task> tasks = new HashSet<>();

}
