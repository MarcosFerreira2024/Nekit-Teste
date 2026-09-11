package com.example.demo.application.infra.repository;

import com.example.demo.application.domain.entity.Project;
import org.springframework.data.repository.ListCrudRepository;

import java.util.UUID;

interface ProjectRepository extends ListCrudRepository<Project, UUID>{}