# Organizations

- `GET /organizations`

  - **_ACCESS: PRIVATE - all users_**
  - Retrieves all public organizations
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_
    ```http
    GET /organizations HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_

    ```json
    {
      "publicOrgs": [
        { "_id": "<org_id>", "uid": "public1" },
        { "_id": "<org_id>", "uid": "public2" },
        { "_id": "<org_id>", "uid": "private1" }
      ]
    }
    ```

  - _Possible Errors:_
    - database connection errors
    - no public organizations found

- `GET /organizations/:org_id/me`

  - **_ACCESS: PRIVATE - all users in this organization_**
  - Retrieves the basic information of a logged in user's organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_
    ```http
    GET /organizations/<org_id>/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```
  - _Example Response:_

    ```json
    {
      "org": {
        "_id": "<org_id>",
        "uid": "public1",
        "isPrivate": false,
        "__v": 0
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker is not in this organization
    - database connection errors

- `POST /organizations`

  - **_ACCESS: PUBLIC_**
  - Creates a new public or private organization
  - _Dependencies:_
    - uid is required and must be unique and at least 4 characters
    - isPrivate must be a boolean (true or false)
  - _Example Request:_

    ```http
    POST /organizations HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json

    { "uid": "neworg", "isPrivate": false }
    ```

  - _Example Response:_

    ```json
    {
      "org": {
        "_id": "<org_id>",
        "uid": "neworg",
        "isPrivate": false,
        "createdAt": "2020-06-02T15:52:56.612Z",
        "updatedAt": "2020-06-02T15:52:56.612Z",
        "__v": 0
      }
    }
    ```

  - _Possible Errors:_
    - database connection errors

- `PUT /organizations/:org_id`

  - **_ACCESS: PRIVATE - admins only_**
  - Updates a previously registered organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - uid is required and must be unique and at least 4 characters
    - isPrivate must be a boolean (true or false)
  - _Example Request:_

    ```http
    PUT /organizations/<org_id> HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    { "uid": "private2", "isPrivate": true }
    ```

  - _Example Response:_

    ```json
    {
      "org": {
        "_id": "<org_id>",
        "uid": "private2",
        "isPrivate": true,
        "createdAt": "2020-06-02T15:52:56.612Z",
        "updatedAt": "2020-06-02T15:55:41.029Z",
        "__v": 0
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have admin level access
    - database connection errors

- `PATCH /organizations/:org_id/addWorker`

  - **_ACCESS: PRIVATE - admins only_**
  - Adds a previously registered worker to an organization (Note: regular workers can only be added to private organizations. Admins and managers are always invite only.)
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - workerEmail is required and must be valid
    - access is required and must be either 'admin', 'manager', or 'worker'
  - _Example Request:_

    ```http
    PATCH /organizations/<org_id>/addWorker HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    { "workerEmail": "random@email.com", "access": "worker" }
    ```

  - _Example Response:_

    ```json
    {
      "worker": {
        "email": "random@email.com",
        "isAdmin": false,
        "isManager": false,
        "organization": "<org_id>"
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have admin level access
    - database connection errors
    - workerEmail does not exist as a registered user
    - workerEmail user has not completed their profile
    - workerEmail user is already assigned to another organization
    - attempting to add worker to public organization

- `DELETE /organizations/:org_id`

  - **_ACCESS: PRIVATE - admins only_**
  - Deletes a previously registered organization and its events
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    DELETE /organizations/<org_id> HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_
    ```json
    { "success": true }
    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have admin level access
    - database connection errors
