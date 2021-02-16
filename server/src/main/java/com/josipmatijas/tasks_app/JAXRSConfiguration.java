package com.josipmatijas.tasks_app;

import com.josipmatijas.tasks_app.ejb.UserManagementEjb;
import com.josipmatijas.tasks_app.entity.User;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.logging.Logger;

@ApplicationPath("rest")
public class JAXRSConfiguration extends Application {
}
