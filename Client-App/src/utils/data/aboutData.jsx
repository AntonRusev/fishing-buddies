import { NavLink } from "react-router-dom";

//  Seed data for the About component

const aboutData = [
  {
    id: 1,
    title: "Summary",
    content: (
      <p>
        Fishing Buddies is a social network for fishing enthusiasts. All users can view a list of all fishing events, detailed info of any unique event and other registered users' profiles. There is option to register, and once a user is authenticated, they can create their own events(and edit, delete or cancel them, if needed), attend other people's events, filter the list of existing events, live chat about these events, decorate their own profile by providing a bio and uploading photos, and follow or be followed by other people.
      </p>
    )
  },
  {
    id: 2,
    title: "Features",
    content: (
      <p>
        The application features authorization and authentication of users(and Facebook login*), Refresh Token functionality, client and server-side data validation, persisting data, all CRUD operations, error handling, WebSocket protocol, photo-uploading to a third party service(Cloudinary), user followings, event attendance, various filtering mechanisms, responsive design, dark and light themes, and more...

        <span className="block pt-2 italic">* Facebook requires a business account, in order to allow the developers to get access to data from users without "app role" credential. If you want to test the feature, contact me(for more information, check the Contact section), so that I can set up your Facebook account with "app role" in the Fishing Buddies project.</span>
      </p>
    )
  },
  {
    id: 3,
    title: "Under the hood",
    content: (
      <>
        <p>
          Fishing Buddies is a full-stack application, developed with React and ASP.NET Core. It is a multi-project solution that is built using Clean Architecture and the CQRS and Mediator pattern. Among the tools and utilities used in the development of this project are: Vite, Redux-Toolkit, RTK-Query, Tailwind, Flowbite, React-Router-Dom, Formik, React-Infinite-Scroller, AutoMapper, SignalR, MediatR, .Net Core Identity and others...
        </p>
        <p className="pt-4">
          The repository of the project can be found <NavLink to="https://github.com/AntonRusev/fishing-buddies" className="font-bold underline">here</NavLink>.
        </p>
      </>
    )
  },
  {
    id: 4,
    title: "Contact",
    content: (
      <>
        <p>
          Hello, my name is Anton!
        </p>
        <p className="pt-4">
          If you have any questions regarding the project, or just want to contact me, feel free to get in touch on <NavLink to="https://www.linkedin.com/in/anton-rusev-9861a5277/" className="font-bold underline">LinkedIn</NavLink>, or email me at <span className="font-bold italic">fishingbuddies2024@gmail.com</span>!
        </p>
      </>
    )
  },
];

export default aboutData;