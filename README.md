# Staft

Automating your organization's staffing operations

## API Reference

#### Authentication & Authorization

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

#### Basic Users & Profiles

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

- `DELETE /user/profile`
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

### Organizations

_Note: Access levels vary within organizations. Each route will have its own access level._

_Also: All admins and managers are verified that their organization matches the `org_id` of the request. So managers and admins of organizations not matching `org_id` do not have access._

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

#### Organization Workers

- `GET /organizations/:org_id/workers`

  - **_ACCESS: PRIVATE - all users in this organization_**
  - Retrives all workers of this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/workers HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json
    {
      "orgUsers": [
        {
          "isManager": true,
          "isAdmin": true,
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
          "name": "hello",
          "organization": "<org_id>",
          "phone": "1234567890",
          "ssn": "123456789"
        },
        {
          "isManager": true,
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
          "name": "hello2",
          "organization": "<org_id>",
          "phone": "1234567890",
          "ssn": "123456789"
        },
        {
          "isManager": true,
          "isAdmin": true,
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
          "name": "hello3",
          "organization": "<org_id>",
          "phone": "1234567890",
          "ssn": "123456789"
        },
        {
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
          "name": "hello4",
          "organization": "<org_id>",
          "phone": "1234567890",
          "ssn": "123456789"
        }
      ]
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker is not in this organization
    - database connection errors
    - no users found for this organization

- `GET /organizations/:org_id/workers/join/me`

  - **_ACCESS: PRIVATE - all users_**
  - Allows a previously registered worker to join a public organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/workers/join/me HTTP/1.1
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
    - database connection errors
    - organization is private
    - worker has not completed their profile
    - worker already assigned to another organization

- `PATCH /organizations/:org_id/workers/leave/me`

  - **_ACCESS: PRIVATE - all users in this organization_**
  - Allows a previously registered worker to leave an organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    PATCH /organizations/<org_id>/workers/leave/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_
    ```json
    { "success": true }
    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - worker profile does not exist
    - organization does not exist
    - worker is not in this organization
    - database connection errors
    - worker is an admin and organization does not have another existing admin
    - no users found for this organization

#### Organization Events

_NOTE: Admins are automatically given manager access. So routes with access level of 'managers only' applies to admins as well._

- `GET /organizations/:org_id/events`

  - **_ACCESS: PRIVATE - managers only_**
  - Retrieves all events associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json
    {
      "orgEvents": [
        {
          "repeatOptions": { "daysOfWeek": [], "ends": null },
          "isPublished": false,
          "isRepeatEvent": false,
          "links": [],
          "_id": "<event_id>",
          "organization": "<org_id>",
          "title": "Event 1",
          "location": "<location_id>",
          "createdBy": "<user_id>",
          "startDateTime": "2020-06-15T10:30:00.000Z",
          "endDateTime": "2020-06-15T14:45:00.000Z",
          "participants": [
            {
              "checkedIn": {
                "status": true,
                "datetime": "2020-10-31T04:00:00.000Z"
              },
              "checkedOut": { "status": false },
              "confirmedStatus": "rejected",
              "_id": "<participant_id>",
              "worker": "<user_id>"
            },
            {
              "checkedIn": { "status": false },
              "checkedOut": { "status": false },
              "confirmedStatus": "unconfirmed",
              "_id": "<participant_id>",
              "worker": "<user_id>"
            }
          ],
          "createdAt": "2020-05-16T22:40:50.815Z",
          "updatedAt": "2020-05-19T21:46:43.893Z",
          "__v": 9
        },
        {
          "repeatOptions": { "daysOfWeek": [], "ends": null },
          "isPublished": false,
          "isRepeatEvent": false,
          "links": [],
          "_id": "<event_id>",
          "organization": "<org_id>",
          "title": "Event 2",
          "location": "<location_id>",
          "createdBy": "<user_id>",
          "startDateTime": "2020-07-15T09:30:00.000Z",
          "endDateTime": "2020-07-15T11:45:00.000Z",
          "participants": [
            {
              "checkedIn": { "status": false },
              "checkedOut": { "status": false },
              "confirmedStatus": "unconfirmed",
              "_id": "<participant_id>",
              "worker": "<user_id>"
            }
          ],
          "createdAt": "2020-05-19T21:44:20.600Z",
          "updatedAt": "2020-05-19T21:46:56.552Z",
          "__v": 1
        },
        {
          "repeatOptions": { "daysOfWeek": [], "ends": null },
          "isPublished": false,
          "isRepeatEvent": false,
          "links": [],
          "_id": "<event_id>",
          "organization": "<org_id>",
          "title": "Event 3",
          "location": "<location_id>",
          "createdBy": "<user_id>",
          "startDateTime": "2020-07-15T09:30:00.000Z",
          "endDateTime": "2020-07-15T11:45:00.000Z",
          "participants": [
            {
              "checkedIn": { "status": false },
              "checkedOut": { "status": false },
              "confirmedStatus": "unconfirmed",
              "_id": "<participant_id>",
              "worker": "<user_id>"
            }
          ],
          "createdAt": "2020-05-19T21:44:32.099Z",
          "updatedAt": "2020-05-19T21:47:05.697Z",
          "__v": 1
        },
        {
          "repeatOptions": { "daysOfWeek": [], "ends": null },
          "isPublished": false,
          "isRepeatEvent": false,
          "links": [],
          "_id": "<event_id>",
          "organization": "<org_id>",
          "title": "Event 4",
          "location": "<location_id>",
          "createdBy": "<user_id>",
          "startDateTime": "2020-07-15T09:30:00.000Z",
          "endDateTime": "2020-07-15T11:45:00.000Z",
          "participants": [],
          "createdAt": "2020-05-19T21:44:38.473Z",
          "updatedAt": "2020-05-19T21:44:38.473Z",
          "__v": 0
        }
      ]
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - database connection errors

- `GET /organizations/:org_id/events/me`

  - **_ACCESS: PRIVATE - all users in this organization_**
  - Retrieves all events associated with this organization in which the logged in user is a participant
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events/<event_id>/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json

    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker is not in this organization
    - database connection errors

- `GET /organizations/:org_id/events/:event_id`

  - **_ACCESS: PRIVATE - managers only_**
  - Retrieves a single event associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events/<event_id> HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json
    {
      "event": {
        "repeatOptions": { "daysOfWeek": [], "ends": null },
        "isPublished": false,
        "isRepeatEvent": false,
        "links": [],
        "_id": "<event_id>",
        "organization": "<org_id>",
        "title": "Event Title",
        "location": "<location_id>",
        "createdBy": "<user_id>",
        "startDateTime": "2020-06-15T10:30:00.000Z",
        "endDateTime": "2020-06-15T14:45:00.000Z",
        "participants": [
          {
            "checkedIn": {
              "status": true,
              "datetime": "2020-10-31T04:00:00.000Z"
            },
            "checkedOut": { "status": false },
            "confirmedStatus": "rejected",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          },
          {
            "checkedIn": { "status": false },
            "checkedOut": { "status": false },
            "confirmedStatus": "unconfirmed",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          }
        ],
        "createdAt": "2020-05-16T22:40:50.815Z",
        "updatedAt": "2020-05-19T21:46:43.893Z",
        "__v": 9
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - event does not exist
    - database connection errors

- `GET /organizations/:org_id/events/:event_id/me`

  - **_ACCESS: PRIVATE - all users of this organization who is participant of this event_**
  - Retrieves a single event associated with this organization in which the logged in user is a participant
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events/<event_id>/me HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json
    {
      "event": {
        "repeatOptions": { "daysOfWeek": [], "ends": null },
        "isPublished": false,
        "isRepeatEvent": false,
        "links": [],
        "_id": "<event_id>",
        "organization": "<org_id>",
        "title": "Event Title",
        "location": "<location_id>",
        "createdBy": "<user_id>",
        "startDateTime": "2020-06-15T10:30:00.000Z",
        "endDateTime": "2020-06-15T14:45:00.000Z",
        "participants": [
          {
            "checkedIn": {
              "status": true,
              "datetime": "2020-10-31T04:00:00.000Z"
            },
            "checkedOut": { "status": false },
            "confirmedStatus": "rejected",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          },
          {
            "checkedIn": { "status": false },
            "checkedOut": { "status": false },
            "confirmedStatus": "unconfirmed",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          }
        ],
        "createdAt": "2020-05-16T22:40:50.815Z",
        "updatedAt": "2020-05-19T21:46:43.893Z",
        "__v": 9
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - worker is not in this organization
    - event does not exist
    - worker is not a participant of this event
    - database connection errors
    - no events found for this organization

- `POST /organizations/:org_id/events`

  - **_ACCESS: PRIVATE - managers only_**
  - Creates a new event associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - isPublished must be a boolean (true or false), if provided
    - location is required
    - startDateTime is required and must be a valid date and equal to or after endDateTime
    - endDateTime is required and must be a valid date and equal to or before startDateTime
    - isRepeatEvent must be boolean (true or false), if provided
    - repeatOptions
      - daysOfWeek must be array of 3-letter string abbreviations representing days of the week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      - frequency
        - multiplier must be either 'weeks', 'months', or 'years'
      - ends must be a valid date and equal to or after startDateTime
    - links must be an array of strings that are website URLs
  - _Example Request:_

    ```http
    POST /organizations/<org_id>/events HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    {
      "isPublished": true,
      "title": "Some event title",
      "location": "<location_id>",
      "startDateTime": "2020-07-15T05:30:00",
      "endDateTime": "2020-07-15T07:45:00",
      "isRepeatEvent": false,
      "repeatOptions": {},
      "links": [ "www.google.com", "www.facebook.com" ]
    }
    ```

  - _Example Response:_

    ```json
    {
      "event": {
        "repeatOptions": { "daysOfWeek": [], "ends": null },
        "isPublished": true,
        "isRepeatEvent": false,
        "links": ["www.google.com", "www.facebook.com"],
        "_id": "<event_id>",
        "organization": "<org_id>",
        "title": "Some event title",
        "location": "<location_id>",
        "createdBy": "<user_id>",
        "startDateTime": "2020-07-15T05:30:00.000Z",
        "endDateTime": "2020-07-15T07:45:00.000Z",
        "participants": [],
        "createdAt": "2020-06-02T16:23:26.162Z",
        "updatedAt": "2020-06-02T16:23:26.162Z",
        "__v": 0
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - database connection errors
    - location is not valid mongoose ObjectId

- `PUT /organizations/:org_id/events:event_id`

  - **_ACCESS: PRIVATE - managers only_**
  - Updates an event associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    PUT /organizations/<org_id>/events/<event_id> HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Override-isPublished: false
    Override-createdBy: true
    Override-Confirmed-Participants: false
    Authorization: Bearer <token>

    {
        "location": "<location_id>",
        "startDateTime": "2020-05-15T06:30:00",
        "endDateTime": "2020-05-15T10:45:00",
        "participants": [
            { "worker": "<worker_id>" },
            { "worker": "<worker_id>" }
        ]
    }
    ```

  - _Example Response:_

    ```json

    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - event does not exist
    - worker does not have manager level access
    - manager is not creator of this event and has not set override header
    - database connection errors
    - location is not valid mongoose ObjectId
    - attempting to modify an event that has already started
    - attempting to modify an event that has already ended
    - attempting to modify a published event

- `PATCH /organizations/:org_id/events/:event_id`

  - **_ACCESS: PRIVATE - managers only_**
  - Adds a worker as a participant of this organization event
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    PATCH /organizations/<org_id>/events/<event_id> HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    { "worker": "<worker_id>" }
    ```

  - _Example Response:_

    ```json

    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - event does not exist
    - worker does not have manager level access
    - manager is not creator of this event and has not set override header
    - worker is not participant of this event
    - database connection errors
    - worker already assigned to this event

- `DELETE /organizations/:org_id/events/:event_id`

  - **_ACCESS: PRIVATE - managers only_**
  - Removes a worker as a participant of this organization event
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    DELETE /organizations/<org_id>/events/<event_id> HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    { "worker": "<worker_id>" }
    ```

  - _Example Response:_
    ```json
    { "success": true }
    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - event does not exist
    - worker does not have manager level access
    - manager is not creator of this event and has not set override header
    - worker is not participant of this event
    - database connection errors
    - worker not assigned to this event
    - attempting to remove worker that has accepted confirmation for this event

- `PATCH /organizations/:org_id/events/:event_id/me`

  - **_ACCESS: PRIVATE - all users of this organization who is participant of this event_**
  - Allows an event participant to confirm status, check in, or check out
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - confirmedStatus must be either 'unconfirmed', 'accepted', or 'rejected'
    - checkedIn
      - status must be boolean (true or false), if provided
      - dateTime must be a valid date
    - checkedOut
      - status must be boolean (true or false), if provided
      - dateTime must be a valid date
  - _Example Request:_

    ```http
    PATCH /organizations/<org_id>/events/<event_id>/me HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    {
      "confirmedStatus": "accepted",
      "checkedIn": { "status": true, "dateTime": "2020-05-15T06:30:00" },
      "checkedOut": { "status": false }
    }
    ```

  - _Example Response:_
    ```json
    {
      "participant": {
        "confirmedStatus": "accepted",
        "checkedIn": { "status": true, "dateTime": "2020-05-15T06:30:00" },
        "checkedOut": { "status": false },
        "_id": "<participant_id>",
        "worker": "<user_id>"
      }
    }
    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - worker profile does not exist
    - organization does not exist
    - worker is not in this organization
    - event does not exist
    - worker is not participant of this event

- `DELETE /organizations/:org_id/events/:event_id`

  - **_ACCESS: PRIVATE - managers only_**
  - Deletes an organization event
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    DELETE /organizations/<org_id>/events/<event_id> HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_
    ```json
    { "success": true }
    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - event_id is not valid mongoose ObjectId
    - organization does not exist
    - event does not exist
    - worker does not have manager level access
    - manager is not creator of this event and has not set override header

##### Organization Event Locations

- `GET /organizations/:org_id/events/locations/stored`

  - **_ACCESS: PRIVATE - managers only_**
  - Retrieves all stored event locations associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events/locations/stored HTTP/1.1
    Host: http://localhost:5000
    Authorization: Bearer <token>
    ```

  - _Example Response:_

    ```json
    {
      "locations": [
        {
          "_id": "<location_id>",
          "organization": "<org_id>",
          "formatted_address": "870 S Broadway, Lexington, KY 40504, United States",
          "icon": "https:&#x2F;&#x2F;maps.gstatic.com&#x2F;mapfiles&#x2F;place_api&#x2F;icons&#x2F;cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJOTQb-KJEQogRrOPapO4JqzQ",
          "__v": 0
        },
        {
          "_id": "<location_id>",
          "organization": "<org_id>",
          "formatted_address": "855 S Broadway, Lexington, KY 40504, United States",
          "icon": "https:&#x2F;&#x2F;maps.gstatic.com&#x2F;mapfiles&#x2F;place_api&#x2F;icons&#x2F;restaurant-71.png",
          "name": "Cook Out",
          "place_id": "ChIJlYZ3haJEQogRKfaTNfaec-8",
          "__v": 0
        },
        {
          "_id": "<location_id>",
          "organization": "<org_id>",
          "formatted_address": "907 N Mulberry St, Elizabethtown, KY 42701, United States",
          "icon": "https:&#x2F;&#x2F;maps.gstatic.com&#x2F;mapfiles&#x2F;place_api&#x2F;icons&#x2F;restaurant-71.png",
          "name": "Pizza Hut",
          "place_id": "ChIJ07nbYjLvaIgRmyhnoGpaY1U",
          "__v": 0
        },
        {
          "_id": "<location_id>",
          "organization": "<org_id>",
          "formatted_address": "1709 N Dixie Hwy # 106, Elizabethtown, KY 42701, United States",
          "icon": "https:&#x2F;&#x2F;maps.gstatic.com&#x2F;mapfiles&#x2F;place_api&#x2F;icons&#x2F;restaurant-71.png",
          "name": "Pizza Hut",
          "place_id": "ChIJt4yZRfLpaIgRqtlJlg8dSwI",
          "__v": 0
        }
      ]
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - database connection errors
    - no locations found

- `GET /organizations/:org_id/events/locations/query`

  - **_ACCESS: PRIVATE - managers only_**
  - Makes a Google Places API query for a provided location
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
  - _Example Request:_

    ```http
    GET /organizations/<org_id>/events/locations/query HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json
    Authorization: Bearer <token>

    { "query": "Starbucks Lexington KY" }
    ```

  - _Example Response:_

    ```json
    {
      "response": [
        {
          "formatted_address": "325 W Main St #130, Lexington, KY 40507, United States",
          "location": { "lat": 38.048932, "lng": -84.49964899999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJfVWZGe1EQogRXO8CP_rXmZU"
        },
        {
          "formatted_address": "2700 Wilhite Dr, Lexington, KY 40503, United States",
          "location": { "lat": 37.997852, "lng": -84.520653 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJXVHtQWBbQogR7U5K3yozHa4"
        },
        {
          "formatted_address": "1869 Plaudit Pl, Lexington, KY 40509, United States",
          "location": { "lat": 38.017224, "lng": -84.418568 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJPcrMl99PQogRist0h4mbLgo"
        },
        {
          "formatted_address": "870 S Broadway, Lexington, KY 40504, United States",
          "location": { "lat": 38.039084, "lng": -84.51431800000002 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJOTQb-KJEQogRrOPapO4JqzQ"
        },
        {
          "formatted_address": "2320 Versailles Rd, Lexington, KY 40504, United States",
          "location": { "lat": 38.046174, "lng": -84.554683 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJDyQOzxlDQogR0RAMOUZhvK8"
        },
        {
          "formatted_address": "3401 Nicholasville Rd PK7, Lexington, KY 40503, United States",
          "location": { "lat": 37.989343, "lng": -84.52801099999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJT0fjlIRcQogRT7HGb7sfArI"
        },
        {
          "formatted_address": "2703 Richmond Rd, Lexington, KY 40509, United States",
          "location": { "lat": 38.009083, "lng": -84.45371399999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJtdSC1rBaQogR_eQqASt8vgE"
        },
        {
          "formatted_address": "2320 Elkhorn Rd, Lexington, KY 40509, United States",
          "location": { "lat": 38.040744, "lng": -84.424178 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJZT7gx5NPQogRqgXPYnXYGwQ"
        },
        {
          "formatted_address": "808 E High St, Lexington, KY 40502, United States",
          "location": { "lat": 38.030726, "lng": -84.49023600000001 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJh_w_ttpEQogRU848Yab18MQ"
        },
        {
          "formatted_address": "3939 Tates Creek Rd, Lexington, KY 40517, United States",
          "location": { "lat": 37.974708, "lng": -84.49871999999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJW1veVaBbQogR2ez9xzyVICg"
        },
        {
          "formatted_address": "4049 Finn Way #130, Lexington, KY 40517, United States",
          "location": { "lat": 37.9782668 "lng": -84.5281317 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJWbKK-H1cQogRs7-QsXcCzpw"
        },
        {
          "formatted_address": "University Drive &, Hilltop Ave, Lexington, KY 40508, United States",
          "location": { "lat": 38.0325678 "lng": -84.50135739999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJR01_XbhEQogRSQ3AWBRP5fk"
        },
        {
          "formatted_address": "3809 Dylan Pl, Lexington, KY 40514, United States",
          "location": { "lat": 37.981396, "lng": -84.551248 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJQThGyflcQogRwSmuxlCfc3c"
        },
        {
          "formatted_address": "1600 Leestown Rd, Lexington, KY 40511, United States",
          "location": { "lat": 38.065281, "lng": -84.527216 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJWSsNgYFDQogR6s55H86yzv4"
        },
        {
          "formatted_address": "3175 Beaumont Centre Cir, Lexington, KY 40513, United States",
          "location": { "lat": 38.0223306 "lng": -84.55925479999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJoctNwNRcQogRRTfE6ch6v0c"
        },
        {
          "formatted_address": "740 S Limestone Ave, Lexington, KY 40508, United States",
          "location": { "lat": 38.0335569 "lng": -84.508223 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJOWopvbtEQogR78GWgZIdUYc"
        },
        {
          "formatted_address": "1940 Pavillon Wy, Lexington, KY 40509, United States",
          "location": { "lat": 38.022062, "lng": -84.414992 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJ97wl9d1PQogRv-tZfqHF2P0"
        },
        {
          "formatted_address": "3101 Richmond Rd, Lexington, KY 40509, United States",
          "location": { "lat": 38.003354, "lng": -84.444313 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJF--AyqVaQogR-JhN8l_TwLk"
        },
        {
          "formatted_address": "101 S Limestone, Lexington, KY 40507, United States",
          "location": { "lat": 38.045537, "lng": -84.497737 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJezZFcJRFQogRv9WbMytCpv4"
        },
        {
          "formatted_address": "404 S Limestone, Lexington, KY 40508, United States",
          "location": { "lat": 38.0399197 "lng": -84.5025994 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJJfaCfZVEQogRSPpTCrebW1o"
        }
      ]
    }
    ```

  - _Possible Errors:_
    - query is required
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - Google API connection errors

- `POST /organizations/:org_id/events/locations`

  - **_ACCESS: PRIVATE - managers only_**
  - Creates a new event location associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
    - formatted_address is required
    - location
      - lat must be a decimal value
      - lng must be a decimal value
    - name is required
    - place_id is required
  - _Example Request:_

    ```http
    POST /organizations/<org_id>/events/locations HTTP/1.1
    Host: http://localhost:5000
    Content-Type: application/json

    {
        "formatted_address": "870 S Broadway, Lexington, KY 40504, United States",
        "location": { "lat": 38.039084, "lng": -84.51431800000002 },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
        "name": "Starbucks",
        "place_id": "ChIJOTQb-KJEQogRrOPapO4JqzQ"
    }
    ```

  - _Example Response:_

    ```json
    {
      "location": {
        "_id": "<location_id>",
        "organization": "<org_id>",
        "formatted_address": "3401 Nicholasville Rd PK7, Lexington, KY 40503, United States",
        "icon": "https:&#x2F;&#x2F;maps.gstatic.com&#x2F;mapfiles&#x2F;place_api&#x2F;icons&#x2F;cafe-71.png",
        "name": "Starbucks",
        "place_id": "ChIJT0fjlIRcQogRT7HGb7sfArI",
        "__v": 0
      }
    }
    ```

  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - database connection errors
    - location already exists
