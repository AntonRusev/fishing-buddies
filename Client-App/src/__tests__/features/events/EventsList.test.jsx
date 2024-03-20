import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test-utils';

import EventsList from '../../../features/events/EventsList';
import { mockEventList } from '../../../test/mocks/state/eventsListState';

describe("testing EventsList", () => {
    it("is properly displayed", () => {
        renderWithProviders(<EventsList fishingEvents={mockEventList} />);

        const listElement = screen.getByTestId('events-list');

        expect(listElement).toBeVisible();
    });

    it("shows the correct number of list items", () => {
        renderWithProviders(<EventsList fishingEvents={mockEventList} />);

        const eventsList = screen.getAllByTestId('event-card');

        expect(eventsList).toHaveLength(3);
    });
});