# Fishing Buddies repository

The "Fishing Buddies" project is a full-stack application, based on the Udemy course ["Complete guide to building an app with .Net Core and React"](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/), by Neil Cummings.

The deployed application can be found at https://fishing-buddies.fly.dev/

| Content
|---
| [About](#about)
| [Technologies](#technologies)
| [Installation](#installation)
| [Structure](#structure)
| [Security](#security)
| [Roadmap](#roadmap)
| [Endpoints](#endpoints)

## About

### "Social Network" application for fans of fishing

The purpose of "Fishing Buddies" is to provide people interested in fishing, with a platform, where they can create, or attend events, and interact with other fishing enthusiasts. 

### What exactly can the users do in the app?

All users can view a list of all events, detailed info of any unique event and other registered users' profiles. There is option to register, and once a user is authenticated, they can create their own events(and edit, delete or cancel them, if needed), attend other people's events, filter the list of existing events, live chat about these events, decorate their own profile by providing a bio and uploading photos, and follow or be followed by other people. 

### Deep dive
| [Overview of the client-side of the application can be found here](./Client-App/Overview.md)
|---

#### Features
The application features authorization and authentication of users(*and Facebook sign-in**), email confirmation upon registration, Refresh Token functionality, client and server-side data validation, persisting data, all CRUD operations, error handling, WebSocket protocol, photo-uploading to a third party service(Cloudinary), user followings, event attendance, various filtering mechanisms, responsive design, dark and light themes, and more...

**As Facebook requires a business account, in order to allow the developers to get access to data from users without "app role" set up, if you want to test the feature, contact me(either by the email or the phone number, provided in my CV/Portfolio), so that I can set up your Facebook account with an app role.*

## Technologies

"Fishing Buddies" is a full-stack application, developed with `React` and `ASP.NET Core`.
It is a multi-project solution that is built using Clean Architecture and the CQRS and Mediator pattern. Among the tools and utilities used in the development of this project are: `Vite`, `Redux-Toolkit`, `RTK-Query`, `Tailwind`, `Flowbite`, `React-Router-Dom`, `Formik`, `React-Infinite-Scroller`, `AutoMapper`, `SignalR`, `MediatR`, `.Net Core Identity` and others...

`React Testing Library`, `Vitest` and `Mock Service Worker` are used for testing the client application.

## Installation

### Online Access
The deployed application can be found at https://fishing-buddies.fly.dev/

### Locally 
*IMPORTANT: The application uses PostgreSQL database, so one has to be provided for testing purposes!*
*The easiest way to access one is to run it in a Docker Container. More info can be found [here](https://hub.docker.com/_/postgres).*

#### Git Clone and Installation:
Enter the following commands in the terminal-
```
git clone https://github.com/AntonRusev/fishing-buddies.git
cd .\fishing-buddies\API
dotnet run

<<Open New Terminal (in VSCode Ctrl + Shift + `)>>

cd .\fishing-buddies\Client-App
npm install
npm run dev
```
The application will be accessible at `https://localhost:3000/` in development mode, and if built, at `https://localhost:5000/`.

## Structure

"Fishing Buddies" is an application consisting of multiple projects and is built using Clean Architecture, with CQRS and Mediator patterns. Each project has it's own responsibility: 
+ "API" - receives HTTP requests and responds to them.
+ "Application" - processes business logic.
+ "Domain" - contains the business entities. 
+ "Persistence" - provides connection to the database and translates the code into SQL queries. 
+ "Client-App" - creates the user interface, ensuring responsiveness and allowing the users to access the functionality provided by the back end.

The Client-App itself utilizes Redux, a state management library, to maintain a centralized and predictable state. Redux stores the entire application state in a single store, making it easier to manage and update data. The major features- authentication, events and profiles, among others, are separated into their own slices. 

## Security

### Headers
The application is graded `"A"` for Content Security Policies on [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Ffishing-buddies.fly.dev%2F&followRedirects=on)

### Refresh Token
The application uses a *Refresh Token* cookie. The token is valid for 5 minutes, so even if the JWT, that is stored in the Local Storage, is compromised, the user profile cannot be authenticated, if the *Refresh Token* is revoked and the User is auto-logged out in their next visit to the app.

## Roadmap

Currently, the focus is on expanding the pool of unit and integration tests.

## Endpoints:
| [The API Endpoints can be found here](./API/Endpoints.md)
|---