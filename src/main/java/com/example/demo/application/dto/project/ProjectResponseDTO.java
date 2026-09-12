package com.example.demo.application.dto.project;

import com.example.demo.domain.entity.Project;

import java.sql.Timestamp;
import java.util.UUID;

public record ProjectResponseDTO(
        UUID id,
        String title,
        String description,
        Timestamp createdAt


) {
    public ProjectResponseDTO(Project project) {
        this(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCreatedAt()
        );
    }



}