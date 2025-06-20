CREATE DATABASE proyecto;

\c proyecto

CREATE TABLE dispositivos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    coordenadas VARCHAR(255),
    potencia JSONB,
    voltaje JSONB,
    corriente JSONB,
    caudal JSONB,
    estado INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    userName VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);