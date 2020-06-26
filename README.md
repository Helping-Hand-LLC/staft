# Staft

Automating your organization's staffing operations

## API Reference

- [auth](./docs/api/auth.md)
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /auth/logout`
- [users & profiles](./docs/api/user.md)
  - `GET /user/me`
  - `GET /user/profile/me`
  - `POST /user/profile`
  - `DELETE /user/profile`
- [organizations](./docs/api/organizations/organization.md)
  - `GET /organizations`
  - `GET /organizations/:org_id/me`
  - `POST /organizations`
  - `PUT /organizations/:org_id`
  - `PATCH /organizations/:org_id/addWorker`
  - `DELETE /organizations/:org_id`
- [workers](./docs/api/organizations/worker.md)
  - `GET /organizations/:org_id/workers`
  - `GET /organizations/:org_id/workers/join/me`
  - `PATCH /organizations/:org_id/workers/leave/me`
- [events](./docs/api/organizations/event.md)
  - `GET /organizations/:org_id/events`
  - `GET /organizations/:org_id/events/me`
  - `GET /organizations/:org_id/events/:event_id`
  - `GET /organizations/:org_id/events/:event_id/me`
  - `POST /organizations/:org_id/events`
  - `PUT /organizations/:org_id/events:event_id`
  - `PATCH /organizations/:org_id/events/:event_id/add`
  - `DELETE /organizations/:org_id/events/:event_id/remove`
  - `PATCH /organizations/:org_id/events/:event_id/me`
  - `DELETE /organizations/:org_id/events/:event_id`
- [locations](./docs/api/organizations/location.md)
  - `GET /organizations/:org_id/events/locations/stored`
  - `GET /organizations/:org_id/events/locations/query`
  - `POST /organizations/:org_id/events/locations`
