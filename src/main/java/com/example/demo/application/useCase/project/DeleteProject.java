package com.example.demo.application.useCase.project;

import com.example.demo.domain.entity.Project;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class DeleteProject {

    private final ProjectRepository projectRepository;


    public DeleteProject(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void execute(UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("projectId", projectId)
                );

        project.getTasks().clear();

        projectRepository.save(project);

        projectRepository.deleteById(projectId);
    }
    
}
