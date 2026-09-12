package com.example.demo.infra.controller.project;

import com.example.demo.application.dto.project.*;
import com.example.demo.application.useCase.project.CreateProject;
import com.example.demo.application.useCase.project.DeleteProject;
import com.example.demo.application.useCase.project.FindProjectById;
import com.example.demo.application.useCase.project.UpdateProject;
import com.example.demo.domain.entity.Project;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final CreateProject createProject;
    private final DeleteProject deleteProject;
    private final UpdateProject updateProject;
    private final FindProjectById  findProjectById;

    public ProjectController(
            CreateProject createProject,
            DeleteProject deleteProject,
            UpdateProject updateProject,
            FindProjectById findProjectById
            ) {
        this.createProject = createProject;
        this.deleteProject = deleteProject;
        this.updateProject = updateProject;
        this.findProjectById = findProjectById;
    }

    @PostMapping
    public Project create(
            @RequestBody @Valid CreateProjectDTO dto
    ) {
        return createProject.execute(dto);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> delete(
            @PathVariable UUID projectId
    ) {
         deleteProject.execute(projectId);

         return ResponseEntity.status(HttpStatus.ACCEPTED).body("Project and associated tasks deleted");

    }

    @GetMapping("/{projectId}")
    public Project findById(
            @PathVariable UUID projectId
    ) {
        return findProjectById.execute(projectId);
    }

    @PatchMapping("/{projectId}")
    public ProjectResponseDTO update(
            @PathVariable UUID projectId,
            @RequestBody @Valid UpdateProjectDTO dto
    ) {
        return updateProject.execute(projectId, dto);
    }
}