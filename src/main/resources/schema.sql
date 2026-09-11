CREATE SCHEMA IF NOT EXISTS test_nekit;

CREATE TABLE test_nekit.projects (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    title VARCHAR(250) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_nekit.tasks (
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    project_id UUID NOT NULL,
    title VARCHAR(250) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    priority VARCHAR(10) NOT NULL,
    due_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES test_nekit.projects(id)
);