package com.example.demo.infra.controller.project;

import com.example.demo.application.dto.project.*;
import com.example.demo.application.useCase.project.*;
import com.example.demo.domain.entity.Project;
import com.example.demo.shared.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    /* bom, eu criei um metodo apiResponse sem saber que o swagger usa tambem o mesmo nome ai agora preciso importar tudo kkkkkkkkkkkkkkkkkkk */

    @Operation(summary = "Create a project", description = "Returns a created project.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created a project"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Bad request"
                            }
                            """
                    )
            )),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Internal Server Error"
                            }
                            """
                    )
            ))
    })

    public ApiResponse<Project> create(
            @RequestBody @Valid CreateProjectDTO dto
    ) {
        return new ApiResponse<>(
                true,
                createProject.execute(dto),
                "Created project with success"
        );
    }



    @Operation(summary = "Find projects by query", description = "Returns one or more projects .")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully found one or more projects"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Bad request"
                            }
                            """
                    )
            )),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Internal Server Error"
                            }
                            """
                    )
            ))
    })
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

    @Operation(summary = "Delete a Project", description = "Deletes a specific project and associated tasks.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully deleted a project and associated tasks"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request and the resource doesn't exists",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Resource doesn't exists"
                            }
                            """
                    )
            )),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Internal Server Error"
                            }
                            """
                    )
            ))
    })
    @DeleteMapping("/{projectId}")
    public ApiResponse<Object> delete(
            @PathVariable UUID projectId
    ) {
        deleteProject.execute(projectId);

        return ApiResponse.success("Project and associated tasks deleted");
    }


    @Operation(summary = "Find a Project By id", description = "Returns a project by ID.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created a project"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Project not found"
                            }
                            """
                    )
            )),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Internal Server Error"
                            }
                            """
                    )
            ))
    })
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


    @Operation(summary = "Update a project", description = "Returns a updated project.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated a project"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Project not found"
                            }
                            """
                    )
            )),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error",content =
            @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ApiResponse.class),
                    examples = @ExampleObject(
                            value = """
                            {
                              "success": false,
                              "data": null,
                              "message": "Internal Server Error"
                            }
                            """
                    )
            ))
    })
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