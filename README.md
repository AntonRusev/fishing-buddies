# Fishing Buddies

A "social network" application for fishermen.

## Endpoints:

### USERS
##### Login(POST) - /api/account/login (email, password)
##### Register(POST) - /api/account/register (email, username, password)
##### Get Current User(GET) - /api/account

### EVENTS
##### Get All Events(GET) - /api/events
##### Get Event by Id(GET) - /api/events/{id}
##### Create Event(POST) - /api/events (id, title, description, category, region, date)
##### Edit Event(PUT) - /api/events/{id}
##### Delete Event(DELETE) - /api/events/{id}
##### Update Attendance(POST) - /api/events/{id}/attend

### PHOTOS
##### Add Photo(POST) - /api/photos
##### Delete Photo(DELETE) - /api/photos/{id}
##### Set Photo as Main Photo(POST) - /api/photos/{id}/setMain

### PROFILES
##### Get Profile(GET) - /api/profiles/{username}