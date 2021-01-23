package com.josipmatijas.tasks_app.rest;

import com.josipmatijas.tasks_app.ejb.TaskManagementEjb;
import com.josipmatijas.tasks_app.ejb.UserManagementEjb;
import com.josipmatijas.tasks_app.entity.Task;
import com.josipmatijas.tasks_app.entity.User;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Collection;
import java.util.Optional;
import java.util.logging.Logger;

@Path("/tasks")
@Consumes({ "application/json" })
@Produces({ "application/json" })
public class TaskRestController {

    private static Logger log = Logger.getLogger(TaskRestController.class.getName());

    public TaskRestController() {
        log.info("_JM_ TaskRestController()");
    }

    @EJB
    TaskManagementEjb taskManagementEjb;

    @GET
    public Collection<Task> getTasks() {
        log.info("_JM_ getTasks");
        return taskManagementEjb.getTasks();
    }

    @GET
    @Path("{id: \\d+}")
    public Response getTask(@PathParam("id") long id) {
        log.info("_JM_ getTask, id: " + id);
        Task task = taskManagementEjb.getTask(id).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.ok(task).build();
    }

    @POST
    public Response addTask(Task task) {
        log.info("_JM_ rest post to add task");
        long taskId = taskManagementEjb.addTask(task);
        return Response.created(URI.create("/tasks/" + task.getId())).build();
    }

    @PUT
    @Path("{id: \\d+}")
    public Response updateTask(@PathParam("id") long id, Task task) {
        log.info("_JM_ rest put to update task");
        taskManagementEjb.updateTask(id, task).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.noContent().build();
    }

    @DELETE
    @Path("{id: \\d+}")
    public Response removeTask(@PathParam("id") long id) {
        log.info("_JM_ rest delete to remove task");
        taskManagementEjb.removeTask(id).orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
        return Response.noContent().build();
    }
}
