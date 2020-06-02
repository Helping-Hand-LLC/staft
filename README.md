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

    {
      "email": "hello@gmail.com",
      "password": "123456"
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
        "zip": "54321"
      },
      "birthday": "01-01-2000",
      "phone": "1234567890",
      "gender": "male",
      "ssn": "123456789"
    }
    ```

  - _Example Response:_
    ```json

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

    {
      "uid": "neworg",
      "isPrivate": false
    }
    ```

  - _Example Response:_
    ```json

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

    {
      "uid": "public1",
      "isPrivate": false
    }
    ```

  - _Example Response:_
    ```json

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

    {
      "workerEmail": "random@email.com",
      "access": "worker"
    }
    ```

  - _Example Response:_
    ```json

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
      "links": [
        "www.google.com",
        "www.facebook.com"
      ]
    }
    ```

  - _Example Response:_
    ```json

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
      "checkedIn": {
        "status": true,
        "dateTime": "2020-05-15T06:30:00"
      },
      "checkedOut": {
        "status": false
      }
    }
    ```

  - _Example Response:_
    ```json
    { "success": true }
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
        "location": {
            "lat": 38.039084,
            "lng": -84.51431800000002
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
        "name": "Starbucks",
        "place_id": "ChIJOTQb-KJEQogRrOPapO4JqzQ"
    }
    ```

  - _Example Response:_
    ```json

    ```
  - _Possible Errors:_
    - org_id is not valid mongoose ObjectId
    - organization does not exist
    - worker does not have manager level access
    - database connection errors
    - location already exists
