package com.example.demo.infra.controller.task;

import com.example.demo.application.dto.project.FindProjectDTO;
import com.example.demo.application.dto.task.CreateTaskDTO;
import com.example.demo.application.dto.task.FindTaskDTO;
import com.example.demo.application.dto.task.UpdateTaskDTO;
import com.example.demo.application.useCase.task.*;
import com.example.demo.domain.entity.Project;
import com.example.demo.domain.entity.Task;
import com.example.demo.shared.ApiResponse;
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
    public ApiResponse<Task> create(@RequestBody @Valid CreateTaskDTO dto) {
        return new ApiResponse<>(true,
                createTask.execute(dto),
                "Created task with success");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Object> delete(@PathVariable UUID id) {
        deleteTask.execute(id);
        return ApiResponse.success("Deleted task with success");

    }

    @GetMapping
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
    public ApiResponse<Task> findById(@PathVariable UUID id) {
        return new ApiResponse<>(true,
                findTaskById.execute(id),
                "Found task with success");

    }

    @PutMapping("/{id}")
    public ApiResponse<Task> update(
            @PathVariable UUID id,
            @RequestBody @Valid UpdateTaskDTO dto
    ) {


        return new ApiResponse<>(true,
                updateTask.execute(id,dto),
                "Updated task with success");

    }
}