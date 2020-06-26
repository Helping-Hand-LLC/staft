# Authentication & Authorization

_ACCESS: PUBLIC_

- `POST /auth/login`

  - Logs in a previously registered user
  - _Dependencies:_
    - validates user input
      - email is required and must be valid
      - password is required
  - _Example Request:_

    ```http
    POST /auth/login HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json

    { "email": "hello@gmail.com", "password": "123456" }
    ```

  - _Example Response:_
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
  - _Possible Errors:_
    - database connection errors
    - user not found
    - invalid password

- `POST /auth/register`

  - Registers a new user and automatically logs in this new user
  - _Dependencies:_
    - validates user input
      - email is required and must be valid
      - password is required and must be at least 6 characters
      - passwordConfirm is required and must match password
  - _Example Request:_

    ```http
    POST /auth/register HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json

    {
      "email": "hello@gmail.com",
      "password": "123456",
      "passwordConfirm": "123456"
    }
    ```

  - _Example Response:_
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
  - _Possible Errors:_
    - database connection errors
    - user already registered

- `GET /auth/logout`
  - Logs out the currently logged in user
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_
    ```http
    GET /auth/logout HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_
    ```json
    { "success": true }
    ```
