#!/bin/bash

echo "========================================="
echo "      Liquibase Changelog Generator"
echo "========================================="
echo ""

# Default Postgres host and port
DB_HOST="localhost"
DB_PORT="5432"

# Prompt for database name
read -p "Enter Database Name: " DB_NAME
read -p "Enter Database Username: " DB_USER
read -s -p "Enter Database Password: " DB_PASS
echo ""
read -p "Enter Output Changelog File (default: src/main/resources/db/changelog/001-initial-schema.xml): " OUTPUT_FILE

# Default output file if empty
if [ -z "$OUTPUT_FILE" ]; then
  OUTPUT_FILE="src/main/resources/db/changelog/001-initial-schema.xml"
fi

# Build JDBC URL for Postgres
DB_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo ""
echo "Generating changelog from:"
echo "URL: $DB_URL"
echo "User: $DB_USER"
echo "Output File: $OUTPUT_FILE"
echo ""

# Run Liquibase via Maven wrapper
./mvnw liquibase:generateChangeLog \
  -Dliquibase.url=${DB_URL} \
  -Dliquibase.username=${DB_USER} \
  -Dliquibase.password=${DB_PASS} \
  -Dliquibase.driver=org.postgresql.Driver \
  -Dliquibase.outputChangeLogFile=${OUTPUT_FILE}

if [ $? -eq 0 ]; then
  echo ""
  echo "Changelog generated successfully!"
else
  echo ""
  echo "Liquibase failed."
  exit 1
fi