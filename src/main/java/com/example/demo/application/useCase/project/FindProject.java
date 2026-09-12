package com.example.demo.application.useCase.project;

import com.example.demo.application.dto.project.FindProjectDTO;
import com.example.demo.domain.entity.Project;
import com.example.demo.infra.repository.ProjectFilterRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FindProject {

    private final ProjectFilterRepository projectRepository;

    public FindProject(ProjectFilterRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> execute(FindProjectDTO query){

        return projectRepository.findByQuery(query);

    }

}
