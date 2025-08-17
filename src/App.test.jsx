// App.test.jsx
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

// Mock Navigation
vi.mock('./components/Navigation', () => ({
  default: ({ itemsInCart }) => (
    <div>Navigation - Items: {itemsInCart}</div>
  ),
}));

// Mock Notifications
vi.mock('./components/Notifications', () => ({
  default: ({ notifications }) => (
    <div>
      Notifications: {notifications.map(n => (
        <span key={n.id}>{n.message}</span>
      ))}
    </div>
  ),
}));

// Mock Outlet from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: ({ context }) => {
      // expose outlet context to tests
      window.testOutletContext = context;
      return <div>Outlet content</div>;
    },
  };
});

// Mock crypto.randomUUID
globalThis.crypto = { randomUUID: () => 'test-id' };

vi.useFakeTimers();

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders Navigation and Notifications', () => {
    expect(screen.getByText(/Navigation - Items: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Notifications:/)).toBeInTheDocument();
  });

  it('addItemToCart updates items count', () => {
    const { addItemToCart } = window.testOutletContext;
    act(() => {
      addItemToCart({ id: 1, name: 'Test product' }, 2);
    });
    expect(screen.getByText(/Navigation - Items: 2/)).toBeInTheDocument();
  });

  it('clearCart resets items and shows notification', () => {
    const { addItemToCart, clearCart } = window.testOutletContext;

    act(() => {
      addItemToCart({ id: 1 }, 3);
    });
    expect(screen.getByText(/Navigation - Items: 3/)).toBeInTheDocument();

    act(() => {
      clearCart();
    });
    expect(screen.getByText(/Navigation - Items: 0/)).toBeInTheDocument();
    expect(screen.getByText('Cart cleared')).toBeInTheDocument();
  });

  it('notifications disappear after timeout', () => {
    const { notify } = window.testOutletContext;
    act(() => {
      notify('Hello');
    });
    expect(screen.getByText('Hello')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});
