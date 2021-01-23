package com.josipmatijas.tasks_app.repo;

import com.josipmatijas.tasks_app.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long> {
}
