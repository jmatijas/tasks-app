package com.josipmatijas.tasks_app.ejb;

import com.josipmatijas.tasks_app.entity.Task;
import com.josipmatijas.tasks_app.entity.User;
import com.josipmatijas.tasks_app.repo.TaskRepo;
import com.josipmatijas.tasks_app.repo.UserRepo;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Logger;

@Stateless
public class TaskManagementEjb {

    private static final Logger log = Logger.getLogger(TaskManagementEjb.class.getName());

    @PersistenceContext
    private EntityManager entityManager;
    private TaskRepo taskRepo;

    @PostConstruct
    private void init() {
        // Instantiate Spring Data factory
        RepositoryFactorySupport factory = new JpaRepositoryFactory(entityManager);
        this.taskRepo = factory.getRepository(TaskRepo.class);
    }

    public Collection<Task> getTasks() {
        log.info("ejb getTasks()");
        return taskRepo.findAll();
    }

    public Optional<Task> getTask(long id) {
        log.info("ejb getTask()");
        return taskRepo.findById(id);
    }

    public long addTask(Task task) {
        log.info("ejb addTask()");
        taskRepo.save(task);
        return task.getId();
    }

    public Optional<Task> updateTask(long id, Task task) {
        log.info("ejb updateTask()");
        Optional<Task> taskCurrentOpt = taskRepo.findById(id);
        if(!taskCurrentOpt.isPresent()) {
            return taskCurrentOpt;
        }
        task.setId(id);
        // TODO: task.setDateModified(LocalDateTime.now())
        taskRepo.save(task);
        return Optional.of(task);
    }

    public Optional<Long> removeTask(long id) {
        log.info("ejb removeTask()");
        Optional<Task> taskCurrentOpt = taskRepo.findById(id);
        if(!taskCurrentOpt.isPresent()) {
            return Optional.empty();
        }
        taskRepo.deleteById(id);
        return Optional.of(id);
    }

}
