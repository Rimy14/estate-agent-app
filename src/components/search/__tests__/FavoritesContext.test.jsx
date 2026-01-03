import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoritesProvider, useFavorites } from '../../../context/FavoritesContext';

describe('FavoritesContext', () => {
  test('adds property to favorites', () => {
    const wrapper = ({ children }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );

    const { result } = renderHook(() => useFavorites(), { wrapper });

    const mockProperty = {
      id: 'prop1',
      price: 300000,
      location: 'Test Location',
      bedrooms: 3,
      bathrooms: 2,
      type: 'House',
      thumbnail: 'test.jpg'
    };

    expect(result.current.favorites).toHaveLength(0);

    act(() => {
      result.current.addFavorite(mockProperty);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe('prop1');
  });

  test('removes property from favorites', () => {
    const wrapper = ({ children }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );

    const { result } = renderHook(() => useFavorites(), { wrapper });

    const mockProperty = {
      id: 'prop1',
      price: 300000,
      location: 'Test Location',
    };

    act(() => {
      result.current.addFavorite(mockProperty);
    });

    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.removeFavorite('prop1');
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  test('checks if property is favorite', () => {
    const wrapper = ({ children }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );

    const { result } = renderHook(() => useFavorites(), { wrapper });

    const mockProperty = { id: 'prop1', price: 300000 };

    expect(result.current.isFavorite('prop1')).toBe(false);

    act(() => {
      result.current.addFavorite(mockProperty);
    });

    expect(result.current.isFavorite('prop1')).toBe(true);
  });
});
