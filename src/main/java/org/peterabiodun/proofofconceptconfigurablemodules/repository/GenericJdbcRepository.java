package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class GenericJdbcRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void insert(String tableName, Map<String, Object> data) {
        String columns = String.join(", ", data.keySet());
        String placeholders = data.keySet().stream()
                .map(k -> "?")
                .collect(Collectors.joining(", "));

        String sql = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + placeholders + ")";

        Object[] values = data.values().stream()
                .map(this::convertValue)
                .toArray();

        jdbcTemplate.update(sql, values);
    }

    private Object convertValue(Object value) {
        if (value == null) return null;

        // Convert date strings (YYYY-MM-DD) to java.sql.Date
        if (value instanceof String str) {
            if (str.matches("^\\d{4}-\\d{2}-\\d{2}$")) {
                try {
                    LocalDate localDate = LocalDate.parse(str);
                    return Date.valueOf(localDate);
                } catch (DateTimeParseException e) {
                    // not a valid date, leave as string
                    return str;
                }
            }
        }
        // Leave other types as-is (Integer, Boolean, etc.)
        return value;
    }


    public List<Map<String, Object>> findAll(String tableName) {
        String sql = "SELECT * FROM " + tableName;
        return jdbcTemplate.queryForList(sql);
    }
}