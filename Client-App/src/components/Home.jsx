import { NavLink } from "react-router-dom";

const Home = () => {
    const content = (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div
                    className="mr-auto place-self-center lg:col-span-7">
                    <h1
                        className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
                    >
                        Welcome to Fishing Buddies!
                    </h1>
                    <p
                        className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
                    >
                        Get ready for fishing!
                    </p>
                    <NavLink
                        to='/events'
                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border 
                    border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 
                    dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Browse Events
                    </NavLink>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img
                        src="https://images.unsplash.com/photo-1551131618-3f0a5cf594b4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="mockup"
                    />
                </div>
            </div>
        </section>
    );

    return content;
}

export default Home;