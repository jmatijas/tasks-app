package com.josipmatijas.tasks_app.ejb;

import com.josipmatijas.tasks_app.entity.Task;
import com.josipmatijas.tasks_app.entity.User;
import com.josipmatijas.tasks_app.repo.UserRepo;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.annotation.PostConstruct;
import javax.ejb.Startup;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Startup
@Stateless
public class UserManagementEjb {

    private static final Logger log = Logger.getLogger(UserManagementEjb.class.getName());

    @PersistenceContext
    private EntityManager entityManager;
    private UserRepo userRepo;

    @PostConstruct
    private void init() {
        log.info("ejb init()");
        // Instantiate Spring Data factory
        RepositoryFactorySupport factory = new JpaRepositoryFactory(entityManager);
        // Get an implemetation of UserRepo from factory
        this.userRepo = factory.getRepository(UserRepo.class);
    }

    public Collection<User> getUsers() {
        log.info("ejb getUsers()");
        List<User> users = userRepo.findAll();
        return users;
    }

    public Optional<User> getUser(long id) {
        log.info("ejb getUser()");
        return userRepo.findById(id);
    }

    public Optional<User> getUserByName(String name) {
        log.info("ejb getUserByName() - name: " + name);
        User user = userRepo.findByName(name);
        return user != null ? Optional.of(user) : Optional.empty();
    }

    public long addUser(User user) {
        log.info("ejb addUser()");
        userRepo.save(user);
        //userRepo.flush();
        return user.getId();
    }

    public Optional<User> updateUser(long id, User user) {
        log.info("ejb updateUser()");
        Optional<User> userCurrentOpt = userRepo.findById(id);
        if(!userCurrentOpt.isPresent()) {
            return Optional.empty();
        }
        user.setId(id);
        userRepo.save(user);
        return Optional.of(user);
    }

    public Optional<Long> removeUser(long id) {
        log.info("ejb removeUser()");
        Optional<User> userCurrentOpt = userRepo.findById(id);
        if(!userCurrentOpt.isPresent()) {
            return Optional.empty();
        }
        userRepo.deleteById(id);
        return Optional.of(id);
    }

    public Optional<Collection<Long>> removeUsers(Collection<Long> userIds) {
        log.info("ejb removeUsers()");
        List<Long> removedUserIds = new ArrayList<>(userIds.size());

        for (Long userId : userIds) {
            Optional<User> userCurrentOpt = userRepo.findById(userId);
            if(!userCurrentOpt.isPresent()) {
                return Optional.empty();
            }
            userRepo.deleteById(userId);
        }

        return Optional.of(removedUserIds);
    }

//    public Optional<Task> asignTaskToUser(long taskId, long userId) {
//        log.info("ejb asignTaskToUser()");
//        user.getTasks().add(task);
//
//        Optional<User> userCurrentOpt = userRepo.findById(userId);
//        if(!userCurrentOpt.isPresent()) {
//            return Optional.empty();
//        }
//        user.setId(id);
//        userRepo.save(user);
//        return Optional.of(user);
//    }

}
