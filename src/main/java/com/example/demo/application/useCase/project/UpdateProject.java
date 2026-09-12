package com.example.demo.application.useCase.project;

import com.example.demo.application.dto.project.ProjectResponseDTO;
import com.example.demo.application.dto.project.UpdateProjectDTO;
import com.example.demo.domain.entity.Project;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UpdateProject {

    private final ProjectRepository projectRepository;

    public UpdateProject(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ProjectResponseDTO execute(UUID projectId, UpdateProjectDTO dto) {


        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("projectId", projectId));

        if(dto.title() != null) project.setTitle(dto.title());


        if(dto.description() != null) project.setDescription(dto.description());

        Project projectObj = projectRepository.save(project);

        return new ProjectResponseDTO(projectObj);
    }


    
}
