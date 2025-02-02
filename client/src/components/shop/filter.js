import React, { useState, useEffect, useCallback } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { debounce } from 'lodash'; // Add lodash debounce for optimization

const defaultFilter = {
  category: [],
  brand: [],
  priceRange: [0, 300],
  rating: 0,
  skinType: [],
  concern: [],
  formulation: [],
};

const FilterSidebar = React.memo(({ filter = {}, setFilter, applyFilters, isOpen, closeFilters }) => {
  const [localFilter, setLocalFilter] = useState({ ...defaultFilter, ...filter });

  // Sync filter props to localFilter
  useEffect(() => {
    setLocalFilter({ ...defaultFilter, ...filter });
  }, [filter]);

  const resetFilters = useCallback(() => {
    setLocalFilter(defaultFilter);
    setFilter(defaultFilter);
  }, [setFilter]);

  const handleFilterChange = useCallback((filterType, value) => {
    setLocalFilter((prev) => {
      const currentValue = prev[filterType] || defaultFilter[filterType];
      if (Array.isArray(currentValue)) {
        if (currentValue.includes(value)) {
          return { ...prev, [filterType]: currentValue.filter((item) => item !== value) };
        } else {
          return { ...prev, [filterType]: [...currentValue, value] };
        }
      } else {
        return { ...prev, [filterType]: value };
      }
    });
  }, []);

  const debouncedHandlePriceChange = useCallback(debounce((newPrice) => {
    setLocalFilter((prev) => ({ ...prev, priceRange: [0, newPrice] }));
  }, 300), []);

  const handlePriceChange = (e) => {
    const newValue = parseInt(e.target.value);
    debouncedHandlePriceChange(newValue);
  };

  const handleApplyFilters = () => {
    setFilter(localFilter);
    applyFilters();
    closeFilters();
  };

  const FilterSection = ({ title, options, filterType }) => (
    <Disclosure as="div" className="mb-4">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900  rounded-lg  focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
            <span>{title}</span>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            {options.map((option) => (
              <div key={option} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`${filterType}-${option}`}
                  checked={(localFilter[filterType] || []).includes(option)}
                  onChange={() => handleFilterChange(filterType, option)}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor={`${filterType}-${option}`} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  const PriceRangeSlider = () => (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Price Range</h3>
      <input
        type="range"
        min="0"
        max="300"
        step="1"
        color='#a69108'
        value={localFilter.priceRange[1]}
        onChange={handlePriceChange}
        className="w-full text-gray-300 bg-gray-400"
      />
      <div className="flex justify-between mt-2">
        <span>$0</span>
        <span>${localFilter.priceRange[1]}</span>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <FilterSection
        title="Category"
        options={['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Bodycare',"Nail"]}
        filterType="category"
      />

      

      <PriceRangeSlider />

      <FilterSection
        title="Rating"
        options={['4 stars & up', '3 stars & up', '2 stars & up']}
        filterType="rating"
      />

      <FilterSection
        title="Type"
        options={['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive']}
        filterType="type"
      />

      

      

      <div className="flex flex-col space-y-2 mt-6">
        <button
          onClick={handleApplyFilters}
          className="w-full py-2 bg-gray-600 text-white font-semibold  hover:bg-gray-500 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full py-2 text-gray-600 border border-gray-600  hover:bg-gray-50 transition"
        >
          Reset Filters
        </button>
      </div>
    </>
  );

  return (
    <div>
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 p-4 bg-gray-50 border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Filter Modal */}
      <Transition show={isOpen}>
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              className="text-indigo-600 font-semibold hover:underline"
              onClick={closeFilters}
            >
              Close
            </button>
          </div>
          <SidebarContent />
        </div>
      </Transition>
    </div>
  );
});

export default FilterSidebar;
