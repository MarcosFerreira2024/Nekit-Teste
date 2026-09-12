package com.example.demo.application.useCase.task;

import com.example.demo.application.dto.task.UpdateTaskDTO;
import com.example.demo.domain.entity.Task;
import com.example.demo.domain.enums.TaskPriority;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UpdateTask {

    private final TaskRepository taskRepository;

    public UpdateTask(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(
        UUID taskId,
        UpdateTaskDTO dto
    ) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("taskId", taskId)
                );

        if (dto.title() != null) {
            task.setTitle(dto.title());
        }

        if (dto.priority() != null) {
            task.setPriority(dto.priority());
        }

        if (dto.completed() != null) {
            task.setCompleted(dto.completed());
        }

        if(dto.dueDate() != null ){
            task.validateDueDate(dto.dueDate());
        }

        if(dto.projectId() != null) {
            task.setProjectId(dto.projectId());
        }


        return taskRepository.save(task);
    }
}