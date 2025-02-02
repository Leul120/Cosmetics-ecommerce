import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './product';
import FilterSidebar from './filter';
import SortDropdown from './sort';
import SkeletonLoader from './skeletonLoader';
import LazyLoad from 'react-lazyload';
import MobileFilterButton from './mobileFilter';
import axios from 'axios';
import { AppContext } from '../../App';

const ShopPage = () => {
  const { socket ,setNav} = useContext(AppContext);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setNav('Shop')
    // Fetch products on component mount and listen for updates from WebSocket
    getAllProducts();
    socket.on('get-all-products', getAllProducts);

    return () => {
      socket.off('get-all-products', getAllProducts); // Cleanup on unmount
    };
  }, [socket]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/get-all-products`);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('API did not return an array of products');
        setProducts([]); // Set to empty array if response is not as expected
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simulate network delay
  };

  const openFilters = () => setFiltersOpen(true);
  const closeFilters = () => setFiltersOpen(false);

  const filteredProducts = products
    ?.filter((product) => {
      let { category, priceRange, rating } = filter;

      const lowerCaseCategory = category?.map((cat) => cat.toLowerCase());

      // Filter by category
      const categoryMatch = !category?.length || lowerCaseCategory.includes(product.category.toLowerCase());

      // Filter by price range
      const priceMatch = !priceRange || 
        (product.sizes[0].price >= priceRange[0] && product.sizes[0].price <= priceRange[1]);

      // Filter by rating
      const ratingMatch = !rating || product.rating >= parseFloat(rating);

      return categoryMatch && priceMatch && ratingMatch;
    })
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Search functionality
    .sort((a, b) => {
      if (sort === 'price') return a.sizes[0].price - b.sizes[0].price;
      if (sort === 'newest') return b.id - a.id;
      return 0;
    });

  return (
    <div className="flex pt-20 mb-3 min-h-screen">
      {/* Filter Sidebar */}
      <FilterSidebar
        filter={filter}
        setFilter={setFilter}
        applyFilters={applyFilters}
        isOpen={filtersOpen}
        closeFilters={closeFilters}
      />

      {/* Main Content */}
      <div className="flex-1 px-4 items-center">
        <div className="flex items-center justify-between">
          {/* Search Input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-500  focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
          </div>

          {/* Sort Dropdown */}
          <SortDropdown sort={sort} setSort={setSort} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 mt-4 gap-4">
          {loading ? (
            // Loading State: Show Skeleton Loader
            Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)
          ) : (
            // Product Cards: Show filtered products
            filteredProducts.map((product) => (
              <LazyLoad key={product.id} height={200} offset={100}>
                <div className="transition-opacity duration-300 opacity-100">
                  <ProductCard product={product} />
                </div>
              </LazyLoad>
            ))
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <MobileFilterButton openFilters={openFilters} />
    </div>
  );
};

export default ShopPage;
