import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Star,
  Minus,
  Plus,
} from 'lucide-react';

import axios from '../api/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import TopPicks from '../components/TopPicks';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // ADD TO CART
  const addToCartHandler = () => {
    addToCart(
      {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.stock,
      },
      qty
    );

    toast.success('Added to Cart!');
    navigate('/cart');
  };

  // BUY NOW
  const buyNowHandler = () => {
    addToCart(
      {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.stock,
      },
      qty
    );

    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  // INCREMENT / DECREMENT
  const incrementQty = () => {
    if (qty < Math.min(product.stock, 10)) {
      setQty((prev) => prev + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* BACK BUTTON */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition text-sm"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      {product && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-5 md:p-8">
          <div className="flex flex-col md:flex-row gap-10">

            {/* IMAGE */}
            <div className="md:w-1/2">
              <div className="border border-gray-200 rounded-3xl overflow-hidden bg-gray-50">
                <img
                  src={
                    product.image.startsWith('/')
                      ? `http://localhost:5000${product.image}`
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* INFO */}
            <div className="md:w-1/2 flex flex-col justify-between">

              {/* TOP CONTENT */}
              <div>

                {/* CATEGORY */}
                <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-3">
                  {product.category}
                </p>

                {/* NAME */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* RATING */}
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      fill="#6366f1"
                      strokeWidth={0}
                      className="text-indigo-500"
                    />
                  ))}

                  <Star
                    size={18}
                    fill="#c7d2fe"
                    strokeWidth={0}
                    className="text-indigo-200"
                  />

                  <span className="ml-2 text-gray-500 text-sm">
                    (4 Reviews)
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* STOCK */}
                <div className="flex items-center justify-between mt-8">
                  <span className="font-medium text-gray-700">
                    Availability
                  </span>

                  <span
                    className={`font-semibold ${product.stock > 0
                        ? 'text-green-600'
                        : 'text-red-500'
                      }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} In Stock`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* QUANTITY */}
                {product.stock > 0 && (
                  <div className="flex items-center justify-between mt-6">

                    <span className="font-medium text-gray-700">
                      Quantity
                    </span>

                    <div className="flex items-center bg-gray-100 rounded-2xl p-1">

                      <button
                        type="button"
                        onClick={decrementQty}
                        disabled={qty <= 1}
                        className="w-11 h-11 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="w-12 text-center text-lg font-semibold">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={incrementQty}
                        disabled={
                          qty >= Math.min(product.stock, 10)
                        }
                        className="w-11 h-11 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* BUTTONS */}
                {/* MOBILE: ABOVE DESCRIPTION */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  {/* ADD TO CART */}
                  <button
                    onClick={addToCartHandler}
                    disabled={product.stock === 0}
                    className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>

                  {/* BUY NOW */}
                  <button
                    onClick={buyNowHandler}
                    disabled={product.stock === 0}
                    className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                  >
                    <CreditCard size={20} />
                    Buy Now
                  </button>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-10 border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    About Product
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <TopPicks/>
    </div>
  );
};

export default ProductDetail;