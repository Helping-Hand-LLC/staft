# Staft

Automating your organization's staffing operations

## API Reference

#### Authentication & Authorization

_ACCESS: PUBLIC_

- `POST /auth/login`

  - Logs in a previously registered user
  - _Dependencies:_
    - validates user input
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
  - _Possible Errors:_
    - email is required and must be valid
    - password is required

- `POST /auth/register`

  - Registers a new user and automatically logs in this new user
  - _Dependencies:_
    - Validates user input
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
  - _Possible Errors:_
    - email is required and must be valid
    - password is required and must be at least 6 characters
    - passwordConfirm is required and must match password

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
  - _Possible Errors:_

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
  - _Possible Errors:_
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
  - _Possible Errors:_
- `POST /user/profile`

  - Creates or updates a new profile for the currently logged in user
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
    - name is required
    - address
      - street is required
      - city is required
      - state is required
      - zip (code) is required
    - phone is required
    - birthday is required
    - gender is required and must be either 'male' or 'female'

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
  - _Possible Errors:_

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
  - _Possible Errors:_
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
  - _Possible Errors:_
- `POST /organizations`

  - **_ACCESS: PUBLIC_**
  - Creates a new public or private organization
  - _Dependencies:_ N/A
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
  - _Possible Errors:_
    - uid is required and must be unique and at least 4 characters
    - isPrivate must be a boolean (true or false)

- `PUT /organizations/:org_id`

  - **_ACCESS: PRIVATE - admins only_**
  - Updates a previously registered organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
    - uid is required and must be unique and at least 4 characters
    - isPrivate must be a boolean (true or false)

- `PATCH /organizations/:org_id/addWorker`

  - **_ACCESS: PRIVATE - admins only_**
  - Adds a previously registered worker to an organization (Note: regular workers can only be added to private organizations. Admins and managers are always invite only.)
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
    - workerEmail is required and must be valid
    - access is required and must be either 'admin', 'manager', or 'worker'

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

- `POST /organizations/:org_id/events`

  - **_ACCESS: PRIVATE - managers only_**
  - Creates a new event associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_

- `PATCH /organizations/:org_id/events/:event_id/me`

  - **_ACCESS: PRIVATE - all users of this organization who is participant of this event_**
  - Allows an event participant to confirm status, check in, or check out
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
    - confirmedStatus must be either 'unconfirmed', 'accepted', or 'rejected'
    - checkedIn
      - status must be boolean (true or false), if provided
      - dateTime must be a valid date
    - checkedOut
      - status must be boolean (true or false), if provided
      - dateTime must be a valid date

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
  - _Possible Errors:_

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
  - _Possible Errors:_

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
  - _Possible Errors:_
    - query is required

- `POST /organizations/:org_id/events/locations`

  - **_ACCESS: PRIVATE - managers only_**
  - Creates a new event location associated with this organization
  - _Dependencies:_
    - Must be a logged in user with a valid JWT token
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
  - _Possible Errors:_
    - formatted_address is required
    - location
      - lat must be a decimal value
      - lng must be a decimal value
    - name is required
    - place_id is required
