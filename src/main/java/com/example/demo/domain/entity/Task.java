package com.example.demo.domain.entity;

import com.example.demo.application.dto.task.CreateTaskDTO;
import com.example.demo.domain.enums.TaskPriority;
import com.example.demo.domain.exceptions.DomainException;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Table(name = "tasks", schema = "test_nekit")
public class Task {

    @Id
    @Column("id")
    private UUID id;
    @Column("project_id")
    private UUID projectId;
    @Column("title")
    private String title;

    @Column("priority")
    private TaskPriority priority;

    @Column("completed")
    private Boolean completed;

    @Column("due_date")
    private LocalDate dueDate;

    @Column("created_at")
    private Timestamp createdAt;

    public Task(CreateTaskDTO dto) {
        this.title = dto.title();
        this.validateDueDate(dto.dueDate());
        this.dueDate = dto.dueDate();
        this.projectId = dto.projectId();
        this.completed = false;
        this.createdAt = new Timestamp(System.currentTimeMillis());


    }


    public void validateDueDate() {
        if (dueDate != null && dueDate.isBefore(LocalDate.now())) {
            throw new DomainException("due date can't be expired");
        }
    }



    public void validateDueDate(LocalDate dueDate){
        if (dueDate != null && dueDate.isBefore(LocalDate.now())) {
            throw new DomainException("due date can't be expired");
        }
    }
}