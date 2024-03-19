import '@testing-library/jest-dom';

import { server } from './mocks/server';
import { apiSlice } from '../app/api/apiSlice';
import { setupStore } from '../app/store';

const store = setupStore({});

// Establish API mocking before all tests.
beforeAll(() => {
    server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers();
    // Clearing RTK Query cache after each test
    store.dispatch(apiSlice.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());