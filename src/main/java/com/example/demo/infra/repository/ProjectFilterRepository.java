package com.example.demo.infra.repository;

import com.example.demo.application.dto.project.FindProjectDTO;
import com.example.demo.domain.entity.Project;
import com.example.demo.domain.entity.Task;
import com.example.demo.domain.enums.TaskPriority;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
public class ProjectFilterRepository {


    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ProjectFilterRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    public List<Project> findByQuery(FindProjectDTO query){
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        List<String > statement = new ArrayList<String>();
        statement.add("SELECT\n" +
                "    p.*,\n" +
                "    t.id AS task_id,\n" +
                "    t.project_id AS task_project_id,\n" +
                "    t.title AS task_title,\n" +
                "    t.priority AS task_priority,\n" +
                "    t.completed AS task_completed,\n" +
                "    t.due_date AS task_due_date,\n" +
                "    t.created_at AS task_created_at\n" +
                "FROM test_nekit.projects p\n" +
                "LEFT JOIN test_nekit.tasks t\n" +
                "    ON t.project_id = p.id\n" +
                "WHERE 1 = 1");

        if (query.description() != null && !query.description().isBlank()) {
            statement.add(" AND p.description ILIKE :description");
            parameters.addValue("description", query.description());
        }

        if (query.projectId() != null && !query.projectId().toString().isBlank()) {
            statement.add(" AND p.id = :id");
            parameters.addValue("id", query.projectId());
        }

        if (query.title() != null && !query.title().isBlank()) {
            statement.add(" AND p.title ILIKE :title");
            parameters.addValue("title", query.title());
        }

        statement.add(" LIMIT :size OFFSET :offset");

        parameters.addValue("size", (query.size() == null ? 10 : query.size() ));


        parameters.addValue(
                "offset",
                ((query.page() == null || query.page() <= 0  ) ? 0 : query.page() - 1 )
                        * (query.size() == null || query.size() <= 0 ? 10 : query.size()));


        String sql = String.join(" ", statement);

        return jdbcTemplate.query(
                sql,
                parameters,
                resultSet -> {

                    Map<UUID, Project> projects = new LinkedHashMap<>();

                    while (resultSet.next()) {

                        UUID projectId = resultSet.getObject(
                                "id",
                                UUID.class
                        );

                        Project project = projects.get(projectId);

                        if (project == null) {
                            project = new Project();

                            project.setId(projectId);
                            project.setTitle(resultSet.getString("title"));
                            project.setDescription(resultSet.getString("description"));
                            project.setCreatedAt(resultSet.getTimestamp("created_at"));
                            project.setTasks(new LinkedHashSet<>());

                            projects.put(projectId, project);
                        }

                        UUID taskId = resultSet.getObject(
                                "task_id",
                                UUID.class
                        );

                        if (taskId != null) {
                            Task task = new Task();

                            task.setId(taskId);
                            task.setProjectId(
                                    resultSet.getObject(
                                            "task_project_id",
                                            UUID.class
                                    )
                            );
                            task.setTitle(resultSet.getString("task_title"));

                            String priority = resultSet.getString("task_priority");

                            if (priority != null) {
                                task.setPriority(TaskPriority.valueOf(priority));
                            }

                            task.setCompleted(
                                    resultSet.getObject(
                                            "task_completed",
                                            Boolean.class
                                    )
                            );

                            if (resultSet.getDate("task_due_date") != null) {
                                task.setDueDate(
                                        resultSet.getDate("task_due_date").toLocalDate()
                                );
                            }

                            task.setCreatedAt(
                                    resultSet.getTimestamp("task_created_at")
                            );

                            project.getTasks().add(task);
                        }
                    }

                    return new ArrayList<>(projects.values());
                }
        );
    }
}