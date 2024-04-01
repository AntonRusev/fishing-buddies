## The API Endpoints of the project:


| Endpoints
|---
| [Users](#users)
| [Events](#events)
| [Photos](#photos)
| [Profiles](#profiles)
| [Followings](#followings)
| [Chat](#chat)

## USERS

#### Login
```
POST /api/account/login
Authorization: -
Request Body: {email, password}
```

#### Register
```
POST /api/account/register
Authorization: -
Request Body: {email, username, password}
Response: Text/Non-JSON
```

#### Get Current User
```
GET /api/account
Authorization: Token
Request Body: -
```

#### Facebook Sign-In
```
POST /api/account/fbLogin?accessToken=${accessToken}
Authorization: -
Request Body: -
```

#### Refresh Token
```
POST /api/account/refreshToken
Authorization: Token
Request Body: -
```

#### Email Verification
```
POST /api/account/verifyEmail?token={token}&email={email}
Authorization: -
Request Body: -
Response: Text/Non-JSON
```

#### Resend Confirmation Email
```
GET /api/account/resendEmailConfirmationLink?email={email}
Authorization: -
Request Body: -
Response: Text/Non-JSON
```

## EVENTS

#### Get All Events
```
GET /api/events
Authorization: -
Request Body: -
```

#### Get Filtered Events With Query Parameters
Possible Query Params(or combinations of): 
`pageNumber={number}` + 
`pageSize={number}` + *one of the following-*
`all={boolean}`/
`isgoing={boolean}`/
`ishost={boolean}` + 
`startDate={date(as a string value in ISO format)}`
```
GET /api/events/{query parameters}
Authorization: -
Request Body: -
```

#### Get Event By Id
```
GET /api/events/{id}
Authorization: -
Request Body: -
```

#### Create Event
```
POST /api/events
Authorization: Token
Request Body: {id, title, description, category, region, date(as a string value in ISO format)}
```

#### Edit Event
```
PUT /api/events/{id}
Authorization: Token
Request Body: {title, description, category, region, date(as a string value in ISO format)}
```

#### Delete Event
```
DELETE /api/events/{id}
Authorization: Token
Request Body: -
```

#### Uppdate Attendance To Event
```
POST /api/events/{id}/attend
Authorization: Token
Request Body: -
```

## PHOTOS

#### Add Photo
```
POST /api/photos
Content-Type: multipart/form-data
Authorization: Token
Request Body: {FormData(blob)}
```

#### Delete Photo
```
DELETE /api/photos/{id}
Authorization: Token
Request Body: -
```

#### Set Photo as Main Photo
```
POST /api/photos/{id}/setMain
Authorization: Token
Request Body: -
```


## PROFILES

#### Get Profile
```
GET /api/profiles/{username}
Authorization: -
Request Body: -
```

#### Get Profile's Events
Possible Predicates: *One of the following-*
`hosting`/
`future`/
`past`
```
GET /api/profiles/{username}/events?predicate={predicate}
Authorization: -
Request Body: -
```

## Followings

#### Update Following (FOLLOW/UNFOLLOW)
```
POST /api/follow/{username}
Authorization: -
Request Body: -
```

#### List Followings
Possible Predicates: *One of the following-*
`following`/
`followers`

```
GET /api/follow/{username}?predicate={predicate}
Authorization: -
Request Body: -
```

## Chat

#### Event Chat Hub Connection 
```
/chat?eventId=${id}
Authorization: Token
```