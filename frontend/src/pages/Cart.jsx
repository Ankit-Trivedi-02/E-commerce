import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import TopPicks from '../components/TopPicks';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  // FIXED QTY UPDATE
  const updateQty = (item, type) => {
    let newQty = item.qty;

    if (type === 'inc') {
      newQty = item.qty + 1;
    }

    if (type === 'dec') {
      newQty = item.qty - 1;
    }

    // MIN 1 MAX 10
    if (newQty < 1 || newQty > 10) return;

    // IMPORTANT FIX
    addToCart(item, newQty);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-5 py-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ORDER SUMMARY */}
        {/* MOBILE TOP + DESKTOP RIGHT */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-[360px] order-1 lg:order-2">
            <div className="bg-white p-5 rounded-3xl shadow-md border border-gray-100 lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-100 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    Free
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>pre applied</span>
                </div>
              </div>

              <div className="flex justify-between mt-5 text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{(subtotal).toFixed(2)}</span>
              </div>

              <button
                onClick={checkoutHandler}
                className="w-full mt-6 bg-primary hover:opacity-90 text-white py-4 rounded-2xl text-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-1">
              {cartItems.length} item
              {cartItems.length > 1 && 's'} in your cart
            </p>
          </div>

          {/* EMPTY */}
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mb-6">
                Looks like you haven’t added anything yet.
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row gap-4">

                    {/* IMAGE */}
                    <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={
                          item.coverImage?.startsWith('/')
                            ? `http://localhost:5000${item.coverImage}`
                            : item.coverImage
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 flex flex-col justify-between">

                      <div>
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg md:text-xl font-semibold text-gray-900 hover:text-primary transition"
                        >
                          {item.name}
                        </Link>

                        <p className="text-primary text-2xl font-bold mt-2">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* BOTTOM */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                        {/* QTY */}
                        <div className="flex items-center bg-gray-100 rounded-2xl p-1">

                          <button
                            type="button"
                            onClick={() => updateQty(item, 'dec')}
                            disabled={item.qty <= 1}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-10 text-center font-semibold text-lg">
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQty(item, 'inc')}
                            disabled={item.qty >= 10}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-5">

                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Subtotal
                            </p>

                            <p className="text-lg md:text-xl font-bold text-gray-900">
                              ₹
                              {(
                                item.qty * item.price
                              ).toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(item.product)
                            }
                            className="w-11 h-11 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* CONTINUE SHOPPING */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary font-semibold mt-2 hover:gap-3 transition-all"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      <TopPicks />
    </div>
  );
};

export default Cart;