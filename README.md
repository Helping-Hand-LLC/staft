# Staft

Automating your organization's staffing operations

## API Reference

#### Authentication & Authorization

_ACCESS: PUBLIC_

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/logout`

#### Basic Users & Profiles

_ACCESS: PRIVATE - all users_

- `GET /user/me`
- `GET /user/profile/me`
- `POST /user/profile`
- `DELETE /user/profile`

### Organizations

_Note: Access levels vary within organizations. Each route will have its own access level._

_Also: All admins and managers are verified that their organization matches the `org_id` of the request. So managers and admins of organizations not matching `org_id` do not have access._

- `GET /organizations`
  - _ACCESS: PRIVATE - all users_
- `GET /organizations/:org_id/me`
  - _ACCESS: PRIVATE - all users in this organization_
- `POST /organizations`
  - _ACCESS: PUBLIC_
- `PUT /organizations/:org_id`
  - _ACCESS: PRIVATE - admins only_
- `PATCH /organizations/:org_id/addWorder`
  - _ACCESS: PRIVATE - admins only_
- `DELETE /organizations/:org_id`
  - _ACCESS: PRIVATE - admins only_

#### Organization Users

- `GET /organizations/:org_id/users`
  - _ACCESS: PRIVATE - all users in this organization_
- `GET /organizations/:org_id/users/join/me`
  - _ACCESS: PRIVATE - all users_
- `PATCH /organizations/:org_id/users/leave/me`
  - _ACCESS: PRIVATE - all users in this organization_

#### Organization Events

_NOTE: Admins are automatically given manager access. So routes with access level of 'managers only' applies to admins as well._

- `GET /organizations/:org_id/events`
  - _ACCESS: PRIVATE - managers only_
- `GET /organizations/:org_id/events/me`
  - _ACCESS: PRIVATE - all users in this organization_
- `GET /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
- `GET /organizations/:org_id/events/:event_id/me`
  - _ACCESS: PRIVATE - all users of this organization who is participant of this event_
- `POST /organizations/:org_id/events`
  - _ACCESS: PRIVATE - managers only_
- `PUT /organizations/:org_id/events`
  - _ACCESS: PRIVATE - managers only_
- `PATCH /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
- `DELETE /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_
- `PATCH /organizations/:org_id/events/:event_id/me`
  - _ACCESS: PRIVATE - all users of this organization who is participant of this event_
- `DELETE /organizations/:org_id/events/:event_id`
  - _ACCESS: PRIVATE - managers only_

##### Organization Event Locations

- `GET /organizations/:org_id/events/:event_id/locations/stored`
  - _ACCESS: PRIVATE - managers only_
- `GET /organizations/:org_id/events/:event_id/locations/query`
  - _ACCESS: PRIVATE - managers only_
- `POST /organizations/:org_id/events/:event_id/locations`
  - _ACCESS: PRIVATE - managers only_
