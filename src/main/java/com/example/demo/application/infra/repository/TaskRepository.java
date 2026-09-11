package com.example.demo.application.infra.repository;

import com.example.demo.application.domain.entity.Project;
import com.example.demo.application.domain.entity.Task;
import org.springframework.data.repository.ListCrudRepository;

import java.util.UUID;

interface TaskRepository extends ListCrudRepository<Task, UUID> {}