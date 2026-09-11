package com.example.demo.application.dto.task;

import com.example.demo.application.domain.enums.TaskPriority;

import java.util.UUID;

public record FindTaskDTO(

   UUID projectId,
   Boolean completed,
   TaskPriority priority,
   Boolean overdue
) {}