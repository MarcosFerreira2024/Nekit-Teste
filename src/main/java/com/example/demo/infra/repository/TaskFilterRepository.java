package com.example.demo.infra.repository;

import com.example.demo.application.dto.task.FindTaskDTO;
import com.example.demo.domain.entity.Task;
import com.example.demo.domain.enums.TaskPriority;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TaskFilterRepository {


    private final NamedParameterJdbcTemplate jdbcTemplate;

    public TaskFilterRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    public List<Task> findByQuery(FindTaskDTO query){
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        List<String > statement = new ArrayList<String>();
        statement.add("SELECT * \n " +
                "FROM test_nekit.tasks \n" +
                "WHERE 1 = 1");

        if (query.projectId() != null && !query.projectId().toString().isBlank()) {
            statement.add(" AND project_id = :project_id");
            parameters.addValue("project_id", query.projectId());
        }

        if (query.title() != null && !query.title().isBlank()) {
            statement.add(" AND title ILIKE :title");
            parameters.addValue("title", query.title());
        }

        if (query.completed() != null ) {
            statement.add(" AND completed = :completed");
            parameters.addValue("completed", query.completed());
        }

        if (query.priority() != null && !query.priority().isBlank()) {
            statement.add(" AND priority ILike :priority");
            parameters.addValue("priority", query.priority());
        }

        if (query.overdue() != null) {
            if (query.overdue()) {
                statement.add(" AND due_date < CURRENT_DATE AND due_date IS NOT null AND completed = true  ");
            } else {
                statement.add(" AND due_date >= CURRENT_DATE ");
            }
        }

        if(query.dueDate() != null && !query.dueDate().toString().isBlank()) {
            statement.add(" AND due_date = :due_date");
            parameters.addValue("due_date", query.dueDate());
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
                new BeanPropertyRowMapper<>(Task.class)
        );
    }
}