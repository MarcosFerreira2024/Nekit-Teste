package com.example.demo.domain.entity;

import com.example.demo.application.dto.project.CreateProjectDTO;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Table(name = "projects", schema = "test_nekit")
public class Project {

    @Id
    @Column("id")
    private UUID id;

    @Column("title")
    private String title;

    @Column("description")
    private String description;

    @Column("created_at")
    private Timestamp createdAt;

    @MappedCollection(idColumn = "project_id")
    private List<Task> tasks;

    public Project(CreateProjectDTO dto) {

        this.title = dto.title();
        this.description = dto.description();
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public Project(List<Task> tasks, Timestamp createdAt, String description, String title, UUID id) {
        this.tasks = tasks;
        this.createdAt = createdAt;
        this.description = description;
        this.title = title;
        this.id = id;
    }

    public Project(){}
}