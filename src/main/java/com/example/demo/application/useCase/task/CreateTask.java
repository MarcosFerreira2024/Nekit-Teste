package com.example.demo.application.useCase.task;

import com.example.demo.application.dto.task.CreateTaskDTO;
import com.example.demo.domain.entity.Task;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.ProjectRepository;
import com.example.demo.infra.repository.TaskRepository;
import org.springframework.stereotype.Service;


@Service
public class CreateTask {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public CreateTask(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task execute(CreateTaskDTO dto) {


        projectRepository.findById(dto.projectId()).orElseThrow(() -> new ResourceNotFoundException("ProjectId",dto.projectId()));

        Task task = new Task(dto);
        return taskRepository.save(task);
    }
}