import { Accordion } from 'flowbite-react';

import aboutData from '../utils/data/aboutData';

const About = () => {
    return (
        <>
            <section className="w-full mx-auto mt-16 rounded bg-gray-100 xl:max-w-screen-xl dark:bg-gray-800">
                <h4 className="py-8 px-12 text-xl italic text-gray-800 bg-gray-50 font-serif rounded md:text-3xl md:py-16 dark:text-white dark:bg-gray-900">
                    "Our goal is to provide people interested in fishing, with a platform, where they can create, or attend events, and interact with other fishing enthusiasts."
                    <span className='block text-right italic text-base md:text-xl'>-The CEO of Fishing Buddies, probably</span>
                </h4>

                <Accordion>
                    {aboutData.map(x => (
                        <Accordion.Panel
                            key={x.id}
                        >
                            {/* TITLE */}
                            <Accordion.Title>
                                {x.title}
                            </Accordion.Title>

                            {/* CONTENT */}
                            <Accordion.Content className='bg-white'>
                                <div className="mb-2 whitespace-pre-wrap text-gray-500 dark:text-gray-400">
                                    {x.content}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ))}
                </Accordion>
            </section>
        </>
    );
};

export default About;