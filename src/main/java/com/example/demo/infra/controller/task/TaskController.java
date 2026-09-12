package com.example.demo.infra.controller.task;

import com.example.demo.application.dto.task.CreateTaskDTO;
import com.example.demo.application.dto.task.UpdateTaskDTO;
import com.example.demo.application.useCase.task.CreateTask;
import com.example.demo.application.useCase.task.DeleteTask;
import com.example.demo.application.useCase.task.FindTaskById;
import com.example.demo.application.useCase.task.UpdateTask;
import com.example.demo.domain.entity.Task;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final CreateTask createTask;
    private final DeleteTask deleteTask;
    private final UpdateTask updateTask;
    private final FindTaskById findTaskById;

    public TaskController(
            CreateTask createTask,
            DeleteTask deleteTask,
            UpdateTask updateTask,
             FindTaskById findTaskById
    ) {
        this.createTask = createTask;
        this.deleteTask = deleteTask;
        this.updateTask = updateTask;
        this.findTaskById = findTaskById;
    }

    @PostMapping
    public Task create(@RequestBody @Valid CreateTaskDTO dto) {
        return createTask.execute(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        deleteTask.execute(id);
    }

    @GetMapping("/{id}")
    public Task findById(@PathVariable UUID id) {
        return findTaskById.execute(id);
    }

    @PutMapping("/{id}")
    public Task update(
            @PathVariable UUID id,
            @RequestBody @Valid UpdateTaskDTO dto
    ) {
        return updateTask.execute(id, dto);
    }
}