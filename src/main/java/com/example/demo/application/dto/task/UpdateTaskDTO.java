package com.example.demo.application.dto.task;

import com.example.demo.domain.enums.TaskPriority;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateTaskDTO(
  UUID projectId,
  TaskPriority priority,
  LocalDate dueDate,
  Boolean completed,


  @Size(min=1,max=60)
  String title
){}
