---
title: "API REST con FastAPI"
description: "Una API REST completa construida con FastAPI, PostgreSQL y Docker. Incluye autenticación JWT, documentación automática con Swagger, testing comprehensivo y despliegue en contenedores."
shortDescription: "API REST moderna con FastAPI y PostgreSQL"
pubDate: "2024-11-20"
heroImage: ""
imageUrl: "https://raw.githubusercontent.com/xinzayr/fastapi-rest-api/main/docs/screenshots/swagger.png"
tags: ["FastAPI", "Python", "PostgreSQL", "Docker"]
stack: ["FastAPI", "Python", "PostgreSQL", "Docker", "JWT", "Pytest"]
category: "Backend Development"
year: 2024
repositoryUrl: "https://github.com/xinzayr/fastapi-rest-api"
demoUrl: "https://api.xinzayr.dev"
featured: true
---

Una API REST completa y moderna desarrollada con FastAPI que demuestra las mejores prácticas en desarrollo backend.

## Características Principales

- **FastAPI Framework**: Desarrollo rápido con tipado automático
- **Autenticación JWT**: Sistema seguro de autenticación y autorización
- **Base de Datos PostgreSQL**: Gestión robusta de datos relacionales
- **Documentación Automática**: Swagger UI y ReDoc generados automáticamente
- **Testing Completo**: Suite de tests con pytest y coverage
- **Containerización**: Despliegue con Docker y Docker Compose

## Funcionalidades

- CRUD completo para múltiples entidades
- Sistema de usuarios con roles y permisos
- Validación de datos con Pydantic
- Manejo de errores personalizado
- Logging estructurado
- Rate limiting y middleware de seguridad

## Arquitectura

La API sigue principios de arquitectura limpia:

- **Modelos**: Definición de entidades de base de datos
- **Esquemas**: Validación y serialización con Pydantic
- **Servicios**: Lógica de negocio separada
- **Routers**: Endpoints organizados por dominio
- **Dependencias**: Inyección de dependencias para testing

## Tecnologías Utilizadas

- **FastAPI**: Framework web moderno para Python
- **SQLAlchemy**: ORM para manejo de base de datos
- **Alembic**: Migraciones de base de datos
- **PostgreSQL**: Base de datos relacional
- **Docker**: Containerización y despliegue
- **Pytest**: Framework de testing
- **JWT**: Tokens de autenticación seguros

## Despliegue

La aplicación está containerizada y lista para producción con:

- Configuración por variables de entorno
- Health checks y monitoreo
- Logs estructurados para observabilidad
- Proxy reverso con Nginx
- SSL/TLS configurado

Este proyecto muestra mi experiencia en desarrollo backend moderno con Python y las mejores prácticas de la industria.
