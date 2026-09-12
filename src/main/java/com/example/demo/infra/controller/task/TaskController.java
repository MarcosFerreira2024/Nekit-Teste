package com.example.demo.infra.controller.task;

import com.example.demo.application.dto.project.FindProjectDTO;
import com.example.demo.application.dto.task.CreateTaskDTO;
import com.example.demo.application.dto.task.FindTaskDTO;
import com.example.demo.application.dto.task.UpdateTaskDTO;
import com.example.demo.application.useCase.task.*;
import com.example.demo.domain.entity.Project;
import com.example.demo.domain.entity.Task;
import com.example.demo.shared.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final CreateTask createTask;
    private final DeleteTask deleteTask;
    private final UpdateTask updateTask;
    private final FindTaskById findTaskById;
    private final FindTask findTask;


    public TaskController(
            CreateTask createTask,
            DeleteTask deleteTask,
            UpdateTask updateTask,
            FindTaskById findTaskById,
            FindTask findTask

    ) {
        this.createTask = createTask;
        this.deleteTask = deleteTask;
        this.updateTask = updateTask;
        this.findTaskById = findTaskById;
        this.findTask = findTask;

    }

    @PostMapping
    @Operation(summary = "Create a task", description = "Returns a created task.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created a task"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ApiResponse<Task> create(@RequestBody @Valid CreateTaskDTO dto) {
        return new ApiResponse<>(true,
                createTask.execute(dto),
                "Created task with success");
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a Task", description = "Deletes a specific task.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully deleted a task"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request and the resource doesn't exists"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ApiResponse<Object> delete(@PathVariable UUID id) {
        deleteTask.execute(id);
        return ApiResponse.success("Deleted task with success");

    }

    @GetMapping
    @Operation(summary = "Find tasks by query", description = "Returns one or more tasks .")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully found one or more tasks"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ApiResponse<List<Task>> findByQuery(
            @ModelAttribute FindTaskDTO query
    ) {
        return new ApiResponse<>(
                true,
                findTask.execute(query),
                "Task queried with success"
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Find a Task By id", description = "Returns a task by ID.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully found a task"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ApiResponse<Task> findById(@PathVariable UUID id) {
        return new ApiResponse<>(true,
                findTaskById.execute(id),
                "Found task with success");

    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a task", description = "Returns a updated task.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated a task"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "If had a bad request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ApiResponse<Task> update(
            @PathVariable UUID id,
            @RequestBody @Valid UpdateTaskDTO dto
    ) {


        return new ApiResponse<>(true,
                updateTask.execute(id,dto),
                "Updated task with success");

    }
}