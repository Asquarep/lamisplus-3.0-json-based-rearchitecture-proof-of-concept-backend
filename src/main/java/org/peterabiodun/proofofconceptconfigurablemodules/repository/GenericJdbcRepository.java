package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class GenericJdbcRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insert(String tableName, Map<String, String> data) {
        String columns = String.join(", ", data.keySet());
        String placeholders = data.keySet().stream().map(k -> "?").collect(Collectors.joining(", "));
        String sql = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + placeholders + ")";
        jdbcTemplate.update(sql, data.values().toArray());
    }

    public List<Map<String, Object>> findAll(String tableName) {
        String sql = "SELECT * FROM " + tableName;
        return jdbcTemplate.queryForList(sql);
    }
}