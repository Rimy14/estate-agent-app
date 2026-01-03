import { useState, useMemo } from 'react';

/**
 * Custom hook for property search filtering logic
 * @param {Array} properties - Array of all properties
 * @returns {Object} - Search state and filtered results
 */
export const useSearchFilter = properties => {
  const [filters, setFilters] = useState({
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAfter: null,
    dateBefore: null,
  });

  // Update individual filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: 'Any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAfter: null,
      dateBefore: null,
    });
  };

  // Parse date from property added object
  const parsePropertyDate = added => {
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    return new Date(added.year, monthMap[added.month], added.day);
  };

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Type filter
      if (filters.type !== 'Any' && property.type !== filters.type) {
        return false;
      }

      // Price filter
      if (filters.minPrice && property.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
        return false;
      }

      // Bedroom filter
      if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) {
        return false;
      }
      if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) {
        return false;
      }

      // Postcode filter (first part only, e.g., "BR1")
      if (filters.postcode) {
        const searchPostcode = filters.postcode.toUpperCase().trim();
        if (!property.postcode.toUpperCase().startsWith(searchPostcode)) {
          return false;
        }
      }

      // Date filter
      const propertyDate = parsePropertyDate(property.added);

      if (filters.dateAfter) {
        const afterDate = new Date(filters.dateAfter);
        afterDate.setHours(0, 0, 0, 0);
        if (propertyDate < afterDate) {
          return false;
        }
      }

      if (filters.dateBefore) {
        const beforeDate = new Date(filters.dateBefore);
        beforeDate.setHours(23, 59, 59, 999);
        if (propertyDate > beforeDate) {
          return false;
        }
      }

      return true;
    });
  }, [properties, filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    hasActiveFilters: Object.values(filters).some(
      val => val !== '' && val !== 'Any' && val !== null
    ),
  };
};
