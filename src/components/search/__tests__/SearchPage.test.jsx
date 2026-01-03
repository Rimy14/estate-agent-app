import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SearchPage from '../../../pages/SearchPage';
import { FavoritesProvider } from '../../../context/FavoritesContext';

describe('SearchPage Component', () => {
  test('renders search page elements', () => {
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <SearchPage />
        </FavoritesProvider>
      </BrowserRouter>
    );

    // Use getAllByText for text that appears multiple times
    const propertiesText = screen.getAllByText(/properties/i);
    expect(propertiesText.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/Search Filters/i)).toBeInTheDocument();
  });

  test('displays filter options', () => {
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <SearchPage />
        </FavoritesProvider>
      </BrowserRouter>
    );

    // Use getAllByText since "Property Type" appears twice
    const propertyTypeLabels = screen.getAllByText(/Property Type/i);
    expect(propertyTypeLabels.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Any')).toBeInTheDocument();
  });

  test('displays property cards', () => {
    render(
      <BrowserRouter>
        <FavoritesProvider>
          <SearchPage />
        </FavoritesProvider>
      </BrowserRouter>
    );

    // Check if at least one price is displayed (property card rendered)
    const priceElements = screen.getAllByText(/£/i);
    expect(priceElements.length).toBeGreaterThan(0);
  });
});
