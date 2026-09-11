package com.example.demo.application.domain.entity;

import com.example.demo.application.domain.enums.TaskPriority;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Table("test_nekit.tasks")
public class Task {
    @Id
    @Column("id")
    private UUID id;

    @Column("project_id")
    private UUID project_id;

    @Column("title")
    private String title;

    @Column("priority")
    private TaskPriority priority;

    @Column("completed")
    private Boolean completed;

    @Column("created_at")
    private Timestamp createdAt;


}