package com.example.demo.application.domain.entity;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Table("test_nekit.projects")
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

    @Column("updated_at")
    private Timestamp updatedAt;
}