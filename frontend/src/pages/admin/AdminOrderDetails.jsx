import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Edit3, Trash2 } from 'lucide-react';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      toast.error('Order not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatusHandler = async () => {
    try {
      setUpdating(true);
      await axios.put(`/api/orders/${id}/status`, { status });
      toast.success('Order status updated');
      fetchOrder();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6">Loading order details...</div>;
  if (!order) return <div className="p-6 text-red-500">Order not found</div>;

  return (
    <div className="p-6">
      <Link to="/admin/orders" className="btn-secondary inline-flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center bg-gray-50">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order #{order._id}</h1>
            <p className="text-sm text-gray-500 mt-1">Placed: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border">
            <label className="font-semibold text-gray-700">Status:</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:ring-primary focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button 
              onClick={updateStatusHandler}
              disabled={updating || status === order.status}
              className="btn-primary py-2 px-4 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-bold border-b pb-2 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <img src={item.image.startsWith('/') ? `http://localhost:5000${item.image}` : item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Product ID: {item.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price.toFixed(2)} x {item.qty}</p>
                      <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">Customer Details</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>ID:</strong> {order.user._id}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">Shipping Address</h2>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-lg">
              <h2 className="text-lg font-bold border-b pb-2 mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Price</span>
                <span className="font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
              </div>
              {order.couponApplied && (
                <div className="text-sm text-green-600 mt-2">
                  Coupon Applied: {order.couponApplied.code} ({order.couponApplied.discountPercentage}% off)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
