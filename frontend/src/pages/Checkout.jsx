import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponId, setCouponId] = useState(null);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalPrice = subtotal - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const { data } = await axios.post('/api/coupons/validate', { code: couponCode });
      setDiscountPercent(data.discountPercentage);
      setCouponId(data._id);
      toast.success(`Coupon applied! ${data.discountPercentage}% off`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
    }
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        totalPrice: totalPrice,
        couponApplied: couponId
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto md:flex gap-8">
      <div className="md:w-2/3">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>
          <form id="checkout-form" onSubmit={placeOrderHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={address} onChange={(e)=>setAddress(e.target.value)} required />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={city} onChange={(e)=>setCity(e.target.value)} required />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={country} onChange={(e)=>setCountry(e.target.value)} required />
            </div>
          </form>
          
          <h2 className="text-2xl font-bold mb-4 mt-8 border-t pt-6 text-gray-800">Apply Coupon</h2>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="button" onClick={handleApplyCoupon} className="btn-secondary whitespace-nowrap">Apply</button>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/3 mt-6 md:mt-0">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
          <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">{item.qty}x {item.name}</span>
                <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4 mt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            form="checkout-form"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
