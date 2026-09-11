package com.example.demo.application.dto.project;

import com.example.demo.application.domain.enums.TaskPriority;

import java.util.UUID;

public record FindProjectDTO(

    UUID projectId,
    Boolean completed,
    String title,
    String description
) {}