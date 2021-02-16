package com.josipmatijas.tasks_app.ejb;

import com.josipmatijas.tasks_app.JAXRSConfiguration;
import com.josipmatijas.tasks_app.entity.User;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.ejb.*;
import java.util.logging.Logger;

@Singleton
@Startup
public class StartupEjb {

    private static final Logger log = Logger.getLogger(StartupEjb.class.getName());

    @Resource
    TimerService timerService;

    @EJB
    UserManagementEjb userManagementEjb;

    private Timer timerInitDefaultUser;

    @PostConstruct
    private void startup() {
        log.info("startup init");
        TimerConfig tc = new TimerConfig();
        tc.setPersistent(false);
        timerInitDefaultUser = timerService.createSingleActionTimer(1000L, tc);
    }

    @Timeout
    public void programmaticTimeout(Timer timer) {
        if(timer == timerInitDefaultUser) {
            initDefaultUser();
        }
    }

    @PreDestroy
    private void shutdown() {

    }

    private void initDefaultUser() {
        log.info("initDefaultUser() !!!!");
        if(!userManagementEjb.getUserByName("admin").isPresent()) {
            log.info("initDefaultUser() crate admin user!!!!");
            userManagementEjb.addUser(new User("admin", "adminlast", true, false, "admin"));
        }
    }

}
