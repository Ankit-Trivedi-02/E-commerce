import { useState, useEffect } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { Search, Filter } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products?keyword=${debouncedKeyword}&category=${category}&sort=${sort}`);
        setProducts(data.products || []);
      } catch (error) {
        toast.error('Failed to load products');
        setError('Could not fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [debouncedKeyword, category, sort]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 shrink-0">Latest Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow md:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Filters */}
          <div className="flex gap-2 shrink-0">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All Categories</option>
              {/* Note: ideally categories would be dynamic, hardcoding common ones for MVP */}
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Beauty">Beauty</option>
            </select>
            
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Sort By</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-xl border border-gray-100 mt-4 shadow-sm">
              <Filter size={48} className="mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
