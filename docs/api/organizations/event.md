# Organization Events

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
          "participants": [],
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
    {
      "myOrgEvents": [
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
              "confirmedStatus": "accepted",
              "_id": "<participant_id>",
              "worker": "<user_id>"
            }
          ],
          "createdAt": "2020-05-16T22:40:50.815Z",
          "updatedAt": "2020-06-02T19:40:31.533Z",
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
              "_id": "<particpant_id>",
              "worker": "<user_id>"
            }
          ],
          "createdAt": "2020-05-19T21:44:20.600Z",
          "updatedAt": "2020-05-19T21:46:56.552Z",
          "__v": 1
        }
      ]
    }
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
        "participants": [],
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
            { "worker": "<user_id>" },
            { "worker": "<user_id>" }
        ]
    }
    ```

  - _Example Response:_

    ```json
    {
      "event": {
        "repeatOptions": { "ends": null },
        "isPublished": false,
        "isRepeatEvent": false,
        "_id": "<event_id>",
        "organization": "<org_id>",
        "title": "Event Title",
        "location": "<location_id>",
        "createdBy": "<user_id>",
        "startDateTime": "2020-05-15T06:30:00.000Z",
        "endDateTime": "2020-05-15T10:45:00.000Z",
        "participants": [
          {
            "checkedIn": { "status": false },
            "checkedOut": { "status": false },
            "confirmedStatus": "accepted",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          },
          {
            "checkedIn": { "status": false },
            "checkedOut": { "status": false },
            "confirmedStatus": "accepted",
            "_id": "<participant_id>",
            "worker": "<user_id>"
          }
        ],
        "createdAt": "2020-05-16T22:40:50.815Z",
        "updatedAt": "2020-06-02T20:55:29.174Z",
        "__v": 9
      }
    }
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

- `PATCH /organizations/:org_id/events/:event_id/add`

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

    { "worker": "<user_id>" }
    ```

  - _Example Response:_

    ```json
    {
      "participants": [
        {
          "checkedIn": { "status": false },
          "checkedOut": { "status": false },
          "confirmedStatus": "unconfirmed",
          "_id": "<participant_id>",
          "worker": "<user_id>"
        }
      ]
    }
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

- `DELETE /organizations/:org_id/events/:event_id/remove`

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

    { "worker": "<user_id>" }
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
