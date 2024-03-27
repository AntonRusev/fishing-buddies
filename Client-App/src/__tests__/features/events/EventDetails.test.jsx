import { describe, expect, it } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { format } from "date-fns";

import { renderWithProviders } from '../../../utils/test-utils';
import { mockUser } from '../../../test/mocks/state/userState';

import EventDetails from '../../../features/events/details/EventDetails';

describe("testing EventDetails", () => {
    window.history.pushState({}, '', '/events/1');

    it("shows the details page", async () => {
        renderWithProviders(<EventDetails />);

        expect(screen.queryByText("Loading event...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId("event-details")).toBeInTheDocument();
        });
    });

    it("shows the the proper Event data", async () => {
        renderWithProviders(<EventDetails />);

        const date = format("2024-04-07T14:00:12.399877Z", 'dd MMM yyyy');

        await waitFor(() => {
            expect(screen.queryByText("Event 1")).toBeInTheDocument();
            expect(screen.queryByText("Description event 1")).toBeInTheDocument();
            expect(screen.queryByText("Region 1")).toBeInTheDocument();
            expect(screen.queryAllByText("Host1")).toHaveLength(2);
            expect(screen.queryByText(date)).toBeInTheDocument();
            expect(screen.queryByText("River fishing")).toBeInTheDocument();
            expect(screen.queryAllByTestId("event-details-attendee")).toHaveLength(3);
        });
    });

    it("renders the proper heading picture", async () => {
        renderWithProviders(<EventDetails />);

        await waitFor(() => {
            const pictureElement = screen.getByAltText('bg-picture'); // Image alt text
            expect(pictureElement).toBeVisible();
            expect(pictureElement).toHaveAttribute('src', '/flowing-freshwater.jpg');
        });

    });

    it("does not show buttons to not authenticated User", async () => {
        renderWithProviders(<EventDetails />);

        await waitFor(() => {
            expect(screen.queryByText("Deactivate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Activate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Cancel attendance")).not.toBeInTheDocument();
            expect(screen.queryByText("Join Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Edit")).not.toBeInTheDocument();
            expect(screen.queryByText("Remove")).not.toBeInTheDocument();
        });
    });

    it("shows the proper buttons if the authenticated User is not the host and is not attending", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: mockUser
            }
        });

        await waitFor(() => {
            expect(screen.queryByText("Deactivate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Activate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Cancel attendance")).not.toBeInTheDocument();
            expect(screen.queryByText("Join Event")).toBeInTheDocument();
            expect(screen.queryByText("Edit")).not.toBeInTheDocument();
            expect(screen.queryByText("Remove")).not.toBeInTheDocument();
        });
    });

    it("shows the proper buttons if the authenticated User is not the host and is attending", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: { user: { username: "Attendee2" } }
            }
        });

        await waitFor(() => {
            expect(screen.queryByText("Deactivate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Activate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Cancel attendance")).toBeInTheDocument();
            expect(screen.queryByText("Join Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Edit")).not.toBeInTheDocument();
            expect(screen.queryByText("Remove")).not.toBeInTheDocument();
        });
    });

    it("shows the proper buttons if the authenticated User is the host and the event is not cancelled", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: { user: { username: "Host1" } }
            }
        });

        await waitFor(() => {
            expect(screen.queryByText("Deactivate Event")).toBeInTheDocument();
            expect(screen.queryByText("Activate Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Cancel attendance")).not.toBeInTheDocument();
            expect(screen.queryByText("Join Event")).not.toBeInTheDocument();
            expect(screen.queryByText("Edit")).toBeInTheDocument();
            expect(screen.queryByText("Remove")).toBeInTheDocument();
        });
    });

    it("navigates to the hosting User's profile page, upon click on the profile link", async () => {
        renderWithProviders(<EventDetails />);

        let profileLink;

        await waitFor(() => {
            profileLink = screen.queryByTestId("event-details-hostlink");
            expect(profileLink).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(profileLink);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe(`/profile/Host1`);
        });
    });

    it("navigates to an attendee's profile page, upon click on the attendees profile link", async () => {
        renderWithProviders(<EventDetails />);

        let profileLink;

        await waitFor(() => {
            profileLink = screen.getByText("Attendee2");
            expect(profileLink).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(profileLink);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe(`/profile/Attendee2`);
        });
    });

    it("does not show the chat to not authenticated users", async () => {
        renderWithProviders(<EventDetails />);

        await waitFor(() => {
            expect(screen.queryByText("Chat about this event")).not.toBeInTheDocument();
            expect(screen.queryByText("No comments.")).not.toBeInTheDocument();
        });
    });

    it("shows the chat to authenticated users with no comments", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: mockUser
            }
        });

        await waitFor(() => {
            expect(screen.queryByText("Chat about this event")).toBeInTheDocument();
            expect(screen.queryByText("No comments.")).toBeInTheDocument();
        });
    });

    // it("is working as intended when pressing add comment", async () => {
    //     renderWithProviders(<EventDetails />, {
    //         preloadedState: {
    //             auth: mockUser
    //         }
    //     });

    //     let commentInput;
    //     let buttonElement;

    //     await waitFor(() => {
    //         commentInput = screen.getByPlaceholderText('Enter your comment (Enter to submit, SHIFT + Enter for new line)');
    //         buttonElement = screen.getByRole('button', { name: /Add Comment/i });

    //         expect(commentInput).toBeInTheDocument();
    //         expect(buttonElement).toBeInTheDocument();
    //         expect(buttonElement).toHaveAttribute('disabled');
    //     });

    //     act(() => {
    //         fireEvent.change(commentInput, { target: { value: 'First comment!' } });
    //         fireEvent.blur(commentInput);
    //     });

    //     await waitFor(() => {
    //         expect(buttonElement).not.toHaveAttribute('disabled');
    //     });

    //     act(() => {
    //         fireEvent.click(buttonElement);
    //     });

    //     await waitFor(() => {
    //         expect(commentInput).toHaveValue('');        // Resets the input field
    //         // TODO wait for websocket MSW testing support release
    //         // expect(screen.queryByText("First comment!")).toBeInTheDocument();
    //     });
    // });

    it("is working as intended when Edit button is clicked", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: { user: { username: "Host1" } }
            }
        });

        let buttonElement;

        await waitFor(() => {
            buttonElement = screen.queryByText("Edit");
            expect(buttonElement).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(buttonElement);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe('/manage/1');
        });
    });

    it("is working as intended when Remove button is clicked", async () => {
        renderWithProviders(<EventDetails />, {
            preloadedState: {
                auth: { user: { username: "Host1" } }
            }
        });

        let removeButtonElement;
        let confirmButtonElement;

        await waitFor(() => {
            removeButtonElement = screen.queryByText("Remove");
            expect(removeButtonElement).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(removeButtonElement);
        });

        await waitFor(() => {
            confirmButtonElement = screen.queryByText("Yes, I'm sure");

            expect(screen.getByText("Are you sure you want to delete this event?")).toBeInTheDocument();
            expect(confirmButtonElement).toBeInTheDocument();
        });

        act(() => {
            fireEvent.click(confirmButtonElement);
        });

        await waitFor(() => {
            expect(global.window.location.pathname).toBe('/events');
        });
    });
});