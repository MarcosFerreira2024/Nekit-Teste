package com.example.demo.application.useCase.task;


import com.example.demo.domain.entity.Task;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FindTaskById {

    private final TaskRepository taskRepository;

    public FindTaskById(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(UUID id){

        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task",id));
    }

}
