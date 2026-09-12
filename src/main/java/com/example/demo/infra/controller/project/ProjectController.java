package com.example.demo.infra.controller.project;

import com.example.demo.application.dto.project.*;
import com.example.demo.application.useCase.project.*;
import com.example.demo.domain.entity.Project;
import com.example.demo.shared.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final CreateProject createProject;
    private final DeleteProject deleteProject;
    private final UpdateProject updateProject;
    private final FindProjectById findProjectById;
    private final FindProject findProject;

    public ProjectController(
            CreateProject createProject,
            DeleteProject deleteProject,
            UpdateProject updateProject,
            FindProjectById findProjectById,
            FindProject findProject
    ) {
        this.createProject = createProject;
        this.deleteProject = deleteProject;
        this.updateProject = updateProject;
        this.findProjectById = findProjectById;
        this.findProject = findProject;
    }

    @PostMapping
    public ApiResponse<Project> create(
            @RequestBody @Valid CreateProjectDTO dto
    ) {
        return new ApiResponse<>(
                true,
                createProject.execute(dto),
                "Created project with success"
        );
    }


    @GetMapping
    public ApiResponse<List<Project>> findByQuery(
            @ModelAttribute FindProjectDTO query
    ) {
        return new ApiResponse<>(
                true,
                findProject.execute(query),
                "Project queried with success"
        );
    }

    @DeleteMapping("/{projectId}")
    public ApiResponse<Object> delete(
            @PathVariable UUID projectId
    ) {
        deleteProject.execute(projectId);

        return ApiResponse.success("Project and associated tasks deleted");
    }

    @GetMapping("/{projectId}")
    public ApiResponse<Project> findById(
            @PathVariable UUID projectId
    ) {
        return new ApiResponse<>(
                true,
                findProjectById.execute(projectId),
                "Found project with success"
        );
    }

    @PatchMapping("/{projectId}")
    public ApiResponse<ProjectResponseDTO> update(
            @PathVariable UUID projectId,
            @RequestBody @Valid UpdateProjectDTO dto
    ) {
        return new ApiResponse<>(
                true,
                updateProject.execute(projectId, dto),
                "Updated project with success"
        );
    }
}