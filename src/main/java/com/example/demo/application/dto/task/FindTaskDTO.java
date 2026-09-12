package com.example.demo.application.dto.task;

import com.example.demo.domain.enums.TaskPriority;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record FindTaskDTO(

   UUID projectId,
   Boolean completed,
   String priority,
   String title,
   Boolean overdue,
   LocalDate dueDate,
  @Size(max=999)
  Integer page,
   @Size(max=50)
   Integer size
) {}