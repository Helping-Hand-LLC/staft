# Staft

Automating your organization's staffing operations

## API Reference

#### Authentication & Authorization

_ACCESS: PUBLIC_

- `POST /auth/login`
  - Logs in a previously registered user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `POST /auth/register`
  - Registers a new user and automatically logs in this new user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /auth/logout`
  - Logs out the currently logged in user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_

#### Basic Users & Profiles

_ACCESS: PRIVATE - all users_

- `GET /user/me`
  - Retrieves the basic information for the currently logged in user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /user/profile/me`
  - Retrieves the user profile for the currently logged in user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `POST /user/profile`
  - Creates or updates a new profile for the currently logged in user
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `DELETE /user/profile`
  - Deletes a user and their corresponding profile
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_

### Organizations

_Note: Access levels vary within organizations. Each route will have its own access level._

_Also: All admins and managers are verified that their organization matches the `org_id` of the request. So managers and admins of organizations not matching `org_id` do not have access._

- `GET /organizations`
  - _ACCESS: PRIVATE - all users_
  - Retrieves all public organizations
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/me`
  - _ACCESS: PRIVATE - all users in this organization_
  - Retrieves the basic information of a logged in user's organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `POST /organizations`
  - _ACCESS: PUBLIC_
  - Creates a new public or private organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PUT /organizations/:org_id`
  - _ACCESS: PRIVATE - admins only_
  - Updates a previously registered organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PATCH /organizations/:org_id/addWorker`
  - _ACCESS: PRIVATE - admins only_
  - Adds a previously registered worker to an organization (Note: regular workers can only be added to private organizations. Admins and managers are always invite only.)
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `DELETE /organizations/:org_id`
  - _ACCESS: PRIVATE - admins only_
  - Deletes a previously registered organization and its events
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_

#### Organization Workers

- `GET /organizations/:org_id/workers`
  - **_ACCESS: PRIVATE - all users in this organization_**
  - Retrives all workers of this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/workers/join/me`
  - _ACCESS: PRIVATE - all users_
  - Allows a previously registered worker to join a public organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PATCH /organizations/:org_id/workers/leave/me`
  - _ACCESS: PRIVATE - all users in this organization_
  - Allows a previously registered worker to leave an organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_

#### Organization Events

_NOTE: Admins are automatically given manager access. So routes with access level of 'managers only' applies to admins as well._

- `GET /organizations/:org_id/events`
  - _ACCESS: PRIVATE - managers only_
  - Retrieves all events associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/events/me`
  - _ACCESS: PRIVATE - all users in this organization_
  - Retrieves all events associated with this organization in which the logged in user is a participant
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
  - Retrieves a single event associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/events/:event_id/me`
  - _ACCESS: PRIVATE - all users of this organization who is participant of this event_
  - Retrieves a single event associated with this organization in which the logged in user is a participant
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `POST /organizations/:org_id/events`
  - _ACCESS: PRIVATE - managers only_
  - Creates a new event associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PUT /organizations/:org_id/events:event_id`
  - _ACCESS: PRIVATE - managers only_
  - Updates an event associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PATCH /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
  - Adds or removes a worker as a participant of this organization event
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `PATCH /organizations/:org_id/events/:event_id/me`
  - _ACCESS: PRIVATE - all users of this organization who is participant of this event_
  - Allows an event participant to confirm status, check in, or check out
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `DELETE /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
  - Deletes an organization event
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_

##### Organization Event Locations

- `GET /organizations/:org_id/events/locations/stored`
  - _ACCESS: PRIVATE - managers only_
  - Retrieves all stored event locations associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `GET /organizations/:org_id/events/locations/query`
  - _ACCESS: PRIVATE - managers only_
  - Makes a Google Places API query for a provided location
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
- `POST /organizations/:org_id/events/locations`
  - _ACCESS: PRIVATE - managers only_
  - Creates a new event location associated with this organization
  - _Dependencies:_
  - _Example Request:_
  - _Example Response:_
  - _Possible Errors:_
