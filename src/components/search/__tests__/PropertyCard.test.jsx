import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PropertyCard from '../PropertyCard';
import { FavoritesProvider } from '../../../context/FavoritesContext';

describe('PropertyCard Component', () => {
  const mockProperty = {
    id: 'test1',
    price: 250000,
    location: 'London, UK',
    bedrooms: 3,
    bathrooms: 2,
    type: 'House',
    tenure: 'Freehold',
    thumbnail: '/images/prop1/prop1pic1.jpg',
    added: { day: 15, month: 'December', year: 2024 }
  };

  test('renders property details correctly', () => {
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <PropertyCard property={mockProperty} />
        </FavoritesProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/£250,000/i)).toBeInTheDocument();
    expect(screen.getByText(/London, UK/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    const houseElements = screen.getAllByText('House');
    expect(houseElements.length).toBeGreaterThan(0);
  });

  test('renders favorite button', () => {
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <PropertyCard property={mockProperty} />
        </FavoritesProvider>
      </BrowserRouter>
    );

    const favoriteButton = screen.getByLabelText(/Add to Favorites/i);
    expect(favoriteButton).toBeInTheDocument();
  });
});
