import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { Search, Filter, X } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');

  // Mobile Filter
  const [showFilters, setShowFilters] = useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/products?keyword=${debouncedKeyword}&category=${category}&sort=${sort}`
        );

        setProducts(data.products || []);
      } catch (error) {
        toast.error('Failed to load products');
        setError('Could not fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedKeyword, category, sort]);

  return (
    <div className="w-full pb-10">

      {/* Hero Section */}
<div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 -mt-24 h-[220px] md:h-[320px] overflow-hidden">
    <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
        alt="Shop Banner"
        className="w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-center px-4">
        <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
                Shop Here Your All Products
            </h1>

            <p className="text-white/90 mt-3 text-sm md:text-lg">
                Discover premium products at the best prices
            </p>
        </div>
    </div>
</div>

      {/* Main Content */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mt-6">

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-medium"
          >
            <Filter size={18} />
            Filters & Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

          {/* Sidebar Desktop */}
          <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl shadow-sm p-5 h-fit sticky top-24">

            {/* Search */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Search
              </h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                <Search
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Categories
              </h3>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Cricket</option>
                  <option value="Clothing">Badminton</option>
                  <option value="Home">Football</option>
                  <option value="Beauty">Table Tennis</option>
              </select>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Sort By
              </h3>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-gray-500 pt-4 border-t">
              <Filter size={18} />
              <span className="text-sm">
                Smart product filtering
              </span>
            </div>
          </div>

          {/* Mobile Filters */}
          <div
            className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 lg:hidden
            ${showFilters ? 'visible opacity-100' : 'invisible opacity-0'}
            `}
          >
            <div
              className={`absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white p-5 overflow-y-auto transition-all duration-300
              ${showFilters ? 'translate-x-0' : '-translate-x-full'}
              `}
            >
              {/* Close */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  Filters
                </h2>

                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Search
                </h3>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />

                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Categories
                </h3>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Cricket</option>
                  <option value="Clothing">Badminton</option>
                  <option value="Home">Football</option>
                  <option value="Beauty">Table Tennis</option>
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Sort By
                </h3>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Featured</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                </select>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {/* Product Count */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-sm md:text-base text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">
                      {products.length}
                    </span>{' '}
                    products
                  </p>
                </div>

                {/* Product Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm py-20 flex flex-col items-center justify-center text-center">
                    <Filter
                      size={52}
                      className="text-gray-300 mb-4"
                    />

                    <h3 className="text-2xl font-semibold text-gray-700">
                      No Products Found
                    </h3>

                    <p className="text-gray-500 mt-2 px-4">
                      Try changing your filters or search keyword.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;