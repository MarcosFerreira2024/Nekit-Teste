package com.example.demo.infra.repository;

import com.example.demo.domain.entity.Project;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ProjectRepository extends ListCrudRepository<Project, UUID>{


}