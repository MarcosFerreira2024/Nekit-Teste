package com.example.demo.application.dto.project;

import jakarta.validation.constraints.Size;

import java.util.UUID;

public record FindProjectDTO(

    UUID projectId,
    Boolean completed,

    @Size(max=60)
    String title,
    @Size(max=60)
    String description,
    @Size(max=999)
    Integer page,
    @Size(max=50)
    Integer size
) {}