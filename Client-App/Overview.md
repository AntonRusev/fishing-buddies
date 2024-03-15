## Client-Side Overview

| Content
|---
| [Tech Stack](#tech-stack)
| [Features](#features)
| [Optimization](#optimization)

### Tech-stack
 + The client-side of "Fishing Buddies" is a SPA with responsive design, developed with `ReactJS` and build with `Vite`. 
 + It's using the `Redux-Toolkit` library for its state management and `RTK Query` for data fetching and caching. 
 + `React-Router-Dom` is used for routing and navigation inside the app. 
 + For the visual design of the application, the CSS framework `Tailwind` is being used, together with the `Flowbite` library. 
 + The input forms and the respective data are managed with `Formik`, and `Yup` is used for validation. 
 + `React Infinite Scroller` is used for pagination. 
 + `SignalR` is chosen for *WebSocket* connection management.

### Features
Guest users can access:
+ The list of events.
+ Details for any unique event.
+ Other users' profiles
+ The Login and Register(+ Sign In with Facebook) components.
+ Dark or light theme option.
+ Event filtering option, but only by starting date.

Registered users have access to:
+ Everything that the guest users have access to, except for the Login and Register components.
+ Creating Events.
+ Editing, Deleting and Disabling/Enabling their own Events.
+ Confirming or cancelling Attendance to other users' Events.
+ The Followers feature- the option to "follow" other users or being "followed" by them.
+ Uploading photos, deleting already uploaded photos, and selecting one of them as Main photo(Avatar).
+ Adding their own User Bio.
+ View any given Event's chat board and write chat messages. 
+ Various event filtering options, such as if the user is attending or if is host.

### Optimization 
+ The application has data caching, provided by `RTK Query`. Updates to the cached data through mutation API calls, are done with the *pessimistic updates* approach. Validation tags are also used in some places, for auto-fetching outdated data. 

+ Memoization and Selectors are used in some parts of the app to prevent re-renders.

+ Reusable components, functions and classes are being used throughout the application in order to prevent code repetition.