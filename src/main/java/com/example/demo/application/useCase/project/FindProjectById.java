package com.example.demo.application.useCase.project;


import com.example.demo.domain.entity.Project;
import com.example.demo.domain.exceptions.ResourceNotFoundException;
import com.example.demo.infra.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FindProjectById {

    private final ProjectRepository projectRepository;

    public FindProjectById(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project execute(UUID id){

        return projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project",id));
    }

}
