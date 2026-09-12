package com.example.demo.infra.repository;

import com.example.demo.domain.entity.Task;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface TaskRepository extends ListCrudRepository<Task, UUID> {
    List<Task> findByProjectId(UUID projectId);
}