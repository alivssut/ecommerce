# Ecommerce API Project

This project is an API for an online store built using Django and managed with Docker. The project includes a backend service using Django, a PostgreSQL database, and an Nginx server for serving the application. These configurations help you efficiently and securely deploy the application using Docker containers.

## Prerequisites

To run this project, you need the following tools:
- Docker
- Docker Compose

## Installation and Setup

To set up the project, follow these steps:

1. **Clone the repository:**

   First, clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Build and run the containers:**

   Use Docker Compose to build and run the services:

   ```bash
   docker-compose up --build
   ```

   This command:
   - Builds the `backend` image from the `./backend` directory.
   - Runs the Django application using Gunicorn on port `0.0.0.0:8000`.
   - Sets up a PostgreSQL database.
   - Launches an Nginx server to serve the application.

3. **Access the application:**

   Once the containers are running, you can access the API via your browser at `http://localhost`.

## Docker Compose Details

- **Backend:**
  - Built from the `./backend` directory.
  - Serves the Django application using Gunicorn.
  - Mounts the `./backend` directory to the container for easier development.
  - Depends on the `db` service for database connectivity.
  - Environment variables:
    - `DJANGO_SECRET_KEY`: Django secret key.
    - `DJANGO_DEBUG`: Debug mode (should be set to `False` in production).
    - SSL and cookie settings for development (not secure).

- **Database (`db`):**
  - Uses the `postgres:13` image.
  - Data is stored in a volume named `postgres_data`.
  - The environment variable `POSTGRES_HOST_AUTH_METHOD=trust` is set for easier local development (not recommended for production).

- **Nginx:**
  - Uses the latest Nginx image.
  - Serves the application on port `80`.
  - Depends on the `backend` service.
  - The Nginx configuration file from `./nginx/dev.conf` is mounted to the container.

## Environment Variables

Ensure the following environment variables are properly configured for the production environment:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=False`
- `DJANGO_SECURE_SSL_REDIRECT=True`
- `DJANGO_SESSION_COOKIE_SECURE=True`
- `DJANGO_CSRF_COOKIE_SECURE=True`

## Volumes

- **postgres_data:** Stores PostgreSQL data.
