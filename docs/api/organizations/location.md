# Organization Event Locations

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
          "formatted_address": "University Drive &, Hilltop Ave, Lexington, KY 40508, United States",
          "location": { "lat": 38.0325678, "lng": -84.50135739999999 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJR01_XbhEQogRSQ3AWBRP5fk"
        },
        {
          "formatted_address": "740 S Limestone Ave, Lexington, KY 40508, United States",
          "location": { "lat": 38.0335569, "lng": -84.508223 },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
          "name": "Starbucks",
          "place_id": "ChIJOWopvbtEQogR78GWgZIdUYc"
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
        "formatted_address": "870 S Broadway, Lexington, KY 40504, United States",
        "geometry": {
          "location": { "lat": 38.039084, "lng": -84.51431800000002 }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
        "name": "Starbucks",
        "place_id": "ChIJOTQb-KJEQogRrOPapO4JqzQ",
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
