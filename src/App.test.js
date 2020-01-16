import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title correctly', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/A Philips Hue React app/i);
    expect(linkElement).toBeInTheDocument();
});
