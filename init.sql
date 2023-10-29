-- Create a database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mlops;

-- Use the mlops database
USE mlops;

-- Create a table for storing user information
CREATE TABLE IF NOT EXISTS users (
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
