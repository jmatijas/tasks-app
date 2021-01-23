package com.josipmatijas.tasks_app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ta_task")
public class Task {

    public Task(String title, String description, boolean done) {
        this.title = title;
        this.description = description;
        this.done = done;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_generator")
    @SequenceGenerator(name = "task_generator", sequenceName = "task_sequence")
    private long id;

    @Column(name = "ta_title")
    private String title;

    @Column(name = "ta_description")
    private String description;

    @Column(name = "ta_done")
    private boolean done;

}
