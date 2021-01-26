package com.josipmatijas.tasks_app.repo;

import com.josipmatijas.tasks_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    public User findByName(String name);
}
