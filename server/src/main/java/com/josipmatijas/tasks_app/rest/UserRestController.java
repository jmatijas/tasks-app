package com.josipmatijas.tasks_app.rest;

import com.josipmatijas.tasks_app.ejb.UserManagementEjb;
import com.josipmatijas.tasks_app.entity.Task;
import com.josipmatijas.tasks_app.entity.User;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Collection;
import java.util.logging.Logger;

@Path("/users")
@Consumes({ "application/json" })
@Produces({ "application/json" })
public class UserRestController {

    private static Logger log = Logger.getLogger(UserRestController.class.getName());

    public UserRestController() {
        log.info("_JM_ UserRestController()");
    }

    @EJB
    UserManagementEjb userManagementEjb;

    @GET
    public Collection<User> getUsers() {
        log.info("_JM_ getUsers");
        return userManagementEjb.getUsers();
    }

    @GET
    @Path("{id: \\d+}")
    public Response getUser(@PathParam("id") long id) {
        log.info("_JM_ getUser, id: " + id);
        User user = userManagementEjb.getUser(id).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.ok(user).build();
    }

    @POST
    public Response addUser(User user) {
        log.info("_JM_ rest post to add user");
        long userId = userManagementEjb.addUser(user);
        return Response.created(URI.create("/users/" + user.getId())).build();
    }

    @PUT
    @Path("{id: \\d+}")
    public Response updateUser(@PathParam("id") long id, User user) {
        log.info("_JM_ rest put to update user");
        userManagementEjb.updateUser(id, user).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.noContent().build();
    }

    @DELETE
    @Path("{id: \\d+}")
    public Response removeUser(@PathParam("id") long id) {
        log.info("_JM_ rest delete to remove user");
        userManagementEjb.removeUser(id).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.noContent().build();
    }

}
