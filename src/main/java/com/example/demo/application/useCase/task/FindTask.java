package com.example.demo.application.useCase.task;

import com.example.demo.application.dto.task.FindTaskDTO;
import com.example.demo.domain.entity.Task;
import com.example.demo.domain.enums.TaskPriority;
import com.example.demo.domain.exceptions.DomainException;
import com.example.demo.infra.repository.TaskFilterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;


@Service
public class FindTask {

    private final TaskFilterRepository taskRepository;

    public FindTask(TaskFilterRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> execute(FindTaskDTO query){

        try{
            if(query.priority() != null && !query.priority().isBlank()) TaskPriority.valueOf(query.priority().toUpperCase(Locale.ROOT));

        } catch (IllegalArgumentException e) {
            throw new DomainException("Wrong priority usage");
        }
        return taskRepository.findByQuery(query);

    }

}
