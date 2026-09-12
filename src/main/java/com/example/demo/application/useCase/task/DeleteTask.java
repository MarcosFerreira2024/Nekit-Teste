package com.example.demo.application.useCase.task;

import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeleteTask {

    private final TaskRepository taskRepository;

    public DeleteTask(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public void execute(UUID taskId) {
        taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("taskId", taskId)
                );

        taskRepository.deleteById(taskId);
    }
}