import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-500 mb-4 text-lg">Your cart is empty</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">Go Shopping</Link>
        </div>
      ) : (
        <div className="md:flex gap-8">
          <div className="md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center gap-4 bg-white p-4 mb-4 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                <img src={item.image.startsWith('/') ? `http://localhost:5000${item.image}` : item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="font-semibold text-lg text-gray-800 hover:text-primary transition-colors">{item.name}</Link>
                  <p className="text-primary font-bold text-lg">${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    className="border border-gray-300 rounded bg-gray-50 p-2 focus:ring-primary focus:border-primary focus:outline-none"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product)}
                  className="p-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-4 text-gray-800">Order Summary</h2>
              <div className="flex justify-between mb-4 text-lg">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-bold text-gray-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              <button 
                onClick={checkoutHandler}
                className="w-full btn-primary mt-4 py-4 text-lg font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
