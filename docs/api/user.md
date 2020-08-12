# Basic Users & Profiles

_ACCESS: PRIVATE - all users_

- `GET /user/me`

  - Retrieves the basic information for the currently logged in user
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - Checks that this user exists
  - _Example Request:_
    ```http
    GET /user/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_
    ```json
    {
      "user": {
        "type": 0,
        "_id": "<user_id>",
        "email": "hello@gmail.com",
        "createdAt": "2020-06-02T15:27:37.451Z",
        "updatedAt": "2020-06-02T15:27:37.451Z",
        "__v": 0
      }
    }
    ```
  - _Possible Errors:_
    - user does not exist
    - database connection errors

- `GET /user/profile/me`

  - Retrieves the user profile for the currently logged in user
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token-
  - _Example Request:_
    ```http
    GET /user/profile/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_
    ```json
    {
      "populated": {
        "isManager": false,
        "isAdmin": false,
        "_id": "<profile_id>",
        "user": "<user_id>",
        "__v": 0,
        "address": {
          "street": "123 Main St",
          "city": "Manhattan",
          "state": "NY",
          "zip": "12345"
        },
        "birthday": "2000-01-01T05:00:00.000Z",
        "createdAt": "2020-06-02T15:34:14.609Z",
        "gender": 0,
        "name": "hello",
        "organization": null,
        "phone": "1234567890",
        "ssn": "123456789",
        "updatedAt": "2020-06-02T15:34:14.609Z"
      }
    }
    ```
  - _Possible Errors:_
    - profile does not exist
    - database connection errors

- `POST /user/profile`

  - Creates or updates a new profile for the currently logged in user
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - name is required
    - address
      - street is required
      - city is required
      - state is required
      - zip (code) is required
    - phone is required
    - birthday is required
    - gender is required and must be either 'male' or 'female'
  - _Example Request:_

    ```http
    POST /user/profile HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    {
      "name": "hello",
      "address": {
        "street": "123 Main St",
        "city": "Manhattan",
        "state": "NY",
        "zip": "12345"
      },
      "birthday": "01-01-2000",
      "phone": "1234567890",
      "gender": 0,
      "ssn": "123456789"
    }
    ```

  - _Example Response:_

    ```json
    {
      "profile": {
        "isManager": false,
        "isAdmin": false,
        "_id": "<profile_id>",
        "user": "<user_id>",
        "__v": 0,
        "address": {
          "street": "123 Main St",
          "city": "Manhattan",
          "state": "NY",
          "zip": "12345"
        },
        "birthday": "2000-01-01T05:00:00.000Z",
        "createdAt": "2020-06-02T15:34:14.609Z",
        "gender": 0,
        "name": "hello",
        "organization": null,
        "phone": "1234567890",
        "ssn": "123456789",
        "updatedAt": "2020-06-02T15:34:14.609Z"
      }
    }
    ```

  - _Possible Errors:_
    - database connection errors

- `DELETE /user/profile/me`
  - Deletes a user and their corresponding profile
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_
    ```http
    DELETE /user/profile/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_
    ```json
    { "success": true }
    ```
  - _Possible Errors:_
    - database connection errors
