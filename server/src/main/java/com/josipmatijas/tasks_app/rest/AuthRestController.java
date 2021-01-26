package com.josipmatijas.tasks_app.rest;

import com.josipmatijas.tasks_app.ejb.UserManagementEjb;
import com.josipmatijas.tasks_app.entity.User;
import com.josipmatijas.tasks_app.rest.dto.AuthDto;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Collection;
import java.util.logging.Logger;

@Path("/auth")
@Consumes({ "application/json" })
@Produces({ "application/json" })
public class AuthRestController {

    private static Logger log = Logger.getLogger(AuthRestController.class.getName());

    public AuthRestController() {
        log.info("_JM_ UserRestController()");
    }

    @EJB
    UserManagementEjb userManagementEjb;



    @POST
    public Response authenticate(AuthDto authDto) {
        log.info("_JM_ rest post to authenticate");
        User user = userManagementEjb.getUserByName(authDto.getUsername()).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        if(user.getSecret().equals(authDto.getPassword())) {
            user.setLoggedIn(true);
            userManagementEjb.updateUser(user.getId(), user).orElseThrow(() -> new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR));
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

    }

    @DELETE
    public Response removeAuthentication(AuthDto authDto) {
        log.info("_JM_ rest delete to removeAuthentication");
        User user = userManagementEjb.getUserByName(authDto.getUsername()).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        if(user.getSecret().equals(authDto.getPassword())) {
            user.setLoggedIn(false);
            userManagementEjb.updateUser(user.getId(), user).orElseThrow(() -> new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR));
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

}
