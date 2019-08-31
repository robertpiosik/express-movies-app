# MOVIE APP

This is a basic movie REST API application written in TypeScript. Backend utilizes MongoDB for storing movie collection, users and comments data.

Features:

- user authentication via JSON Web Tokens,
- submiting movies with rich details autocompletion thanks to external movie API,
- posting comments,
- getting all movies,
- getting movie by title with associated comments.

## REST API Reference

**POST** `/api/v1/auth/signup`

> Example request:
```json
{
	"email": "piosik@netguru.com",
	"password": "q{UHh^)9@<qBJJ3!"
}
```

> Example success response:
```json
{
    "name": "Success",
    "message": "User registered successfully.",
    "data": {
        "id": "5d6aa7eb769f07c74135f9ed"
    }
}
```

**POST** `/api/v1/auth/login`

Example request:
```json
{
	"email": "piosik@netguru.com",
	"password": "q{UHh^)9@<qBJJ3!"
}
```

Example success response:
```json
{
    "name": "Success",
    "message": "User authenticated successfully.",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjliOGU5NWE1YmY1NzgyYmJkNjFkYiIsImlhdCI6MTU2NzI3MDk1OCwiZXhwIjoxNTY3NDQzNzU4fQ.EtkVcg1uFgH0lqj4Ng5QTsQ6K0ALVAIWkclitSR9X0c",
        "expiresAt": 1567443758
    }
}
```