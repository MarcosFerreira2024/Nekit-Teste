package com.example.demo.infra.repository;

import com.example.demo.application.dto.project.FindProjectDTO;
import com.example.demo.domain.entity.Project;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProjectFilterRepository {


    private final NamedParameterJdbcTemplate jdbcTemplate;

    public ProjectFilterRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    public List<Project> findByQuery(FindProjectDTO query){
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        List<String > statement = new ArrayList<String>();
        statement.add(" SELECT * FROM test_nekit.projects  WHERE 1=1 ");

        if (query.completed() != null && !query.completed().toString().isBlank()) {
            statement.add(" AND completed = :completed");
            parameters.addValue("completed", query.completed());
        }

        if (query.description() != null && !query.description().isBlank()) {
            statement.add(" AND description = :description");
            parameters.addValue("description", query.description());
        }

        if (query.projectId() != null && !query.projectId().toString().isBlank()) {
            statement.add(" AND project_id = :projectId");
            parameters.addValue("projectId", query.projectId());
        }

        if (query.title() != null && !query.title().isBlank()) {
            statement.add(" AND title = :title");
            parameters.addValue("title", query.title());
        }

            statement.add(" LIMIT :size OFFSET :offset");

            parameters.addValue("size", (query.size() == null ? 10 : query.size() ));


            parameters.addValue(
                    "offset",
                    ((query.page() == null ) ? 0 : query.page() - 1)
                            * (query.size() == null || query.size() == 0 ? 10 : query.size()));





        return jdbcTemplate.query(
                sql,
                parameters,
                new BeanPropertyRowMapper<>(Project.class)
        );




    }




}
