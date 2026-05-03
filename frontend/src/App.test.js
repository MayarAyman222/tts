import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => {
  const React = require('react');
  const navigate = jest.fn();

  return {
    BrowserRouter: ({ children }) => React.createElement(React.Fragment, null, children),
    Routes: ({ children }) => React.Children.toArray(children)[0]?.props?.element || null,
    Route: () => null,
    Link: ({ to, children }) => React.createElement('a', { href: to }, children),
    useNavigate: () => navigate,
  };
}, { virtual: true });

test('renders Voxi landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/voxi/i);
  expect(linkElement).toBeInTheDocument();
});
