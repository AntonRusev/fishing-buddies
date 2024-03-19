import { http, HttpResponse, delay } from 'msw';

export const handlers = [
    http.post('https://localhost:5000/api/account/login', async () => {
        await delay(150)
        return HttpResponse.json({
            username: "Name",
            token: "Token",
            image: "ImageURL",
        }, { status: 200 })
    }),
    http.post('https://localhost:5000/api/account/register', async () => {
        await delay(150)
        return HttpResponse.json({
            username: "Name",
            token: "Token",
            image: "ImageURL",
        }, { status: 200 })
    }),
    http.get('https://localhost:5000/api/events', async () => {
        // https://localhost:5000/api/events?pageNumber=1&pageSize=5
        await delay(150)
        return HttpResponse.json([
            {
                id: "1",
                title: "Event 1",
                date: "2024-04-07T14:00:12.399877Z",
                description: "Description event 1",
                category: "flowing-freshwater",
                region: "Region 1",
                hostUsername: "Host1",
                isCancelled: false,
                attendees: [
                    {
                        username: "Attendee1",
                        bio: "Bio1",
                        image: "Image1",
                        following: false,
                        followersCount: 2,
                        followingCount: 1,
                    },
                ]
            },
            {
                id: "2",
                title: "Event 2",
                date: "2024-04-07T14:00:12.399877Z",
                description: "Description event 2",
                category: "flowing-freshwater",
                region: "Region 2",
                hostUsername: "Host2",
                isCancelled: false,
                attendees: [
                    {
                        username: "Attendee2",
                        bio: "Bio2",
                        image: "Image2",
                        following: false,
                        followersCount: 3,
                        followingCount: 3,
                    },
                ]
            },
            {
                id: "3",
                title: "Event 3",
                date: "2024-04-07T14:00:12.399877Z",
                description: "Description event 3",
                category: "flowing-freshwater",
                region: "Region 3",
                hostUsername: "Host3",
                isCancelled: false,
                attendees: [
                    {
                        username: "Attendee3",
                        bio: "Bio3",
                        image: "Image3",
                        following: false,
                        followersCount: 3,
                        followingCount: 3,
                    },
                    {
                        username: "Attendee4",
                        bio: "Bio4",
                        image: "Image4",
                        following: false,
                        followersCount: 1,
                        followingCount: 1,
                    },
                ]
            }
        ])
    }),
];