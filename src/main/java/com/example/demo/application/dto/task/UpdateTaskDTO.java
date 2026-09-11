package com.example.demo.application.dto.task;

import com.example.demo.application.domain.enums.TaskPriority;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateTaskDTO(
  UUID project_id,
  TaskPriority priority,
  LocalDate due_date,
  Boolean completed,


  @Size(min=1,max=60)
  String title
){}
