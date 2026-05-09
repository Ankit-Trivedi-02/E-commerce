import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (error) {
        toast.error('Order not found');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (!order) return <div className="text-center py-20 text-gray-500">Order not found</div>;

  const getStatusIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const statusIndex = getStatusIndex(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/orders" className="btn-secondary inline-flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft size={16} /> Back to My Orders
      </Link>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-start mb-6 border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order #{order._id.substring(0, 10)}</h1>
            <p className="text-gray-500 text-sm mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
            <p className="text-gray-500 text-sm mt-1">
               {order.couponApplied ? 'Coupon Applied' : 'No Coupon Applied'}
            </p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="py-8 px-4 bg-gray-50 rounded-lg border border-gray-200 mb-8 relative">
          {isCancelled ? (
            <div className="flex flex-col items-center justify-center text-red-500 py-6">
              <XCircle size={48} className="mb-4" />
              <h3 className="text-xl font-bold">Order Cancelled</h3>
              <p className="text-gray-600 mt-2 text-center">This order has been cancelled and will not be fulfilled.</p>
            </div>
          ) : (
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(statusIndex / 3) * 100}%` }}
              ></div>
              
              <div className="flex justify-between relative z-10">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusIndex >= 0 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'} shadow-md`}>
                    <Package size={20} />
                  </div>
                  <span className="mt-2 text-sm font-semibold">Pending</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusIndex >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'} shadow-md`}>
                    <Package size={20} />
                  </div>
                  <span className="mt-2 text-sm font-semibold">Processing</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusIndex >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'} shadow-md`}>
                    <Truck size={20} />
                  </div>
                  <span className="mt-2 text-sm font-semibold">Shipped</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusIndex >= 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'} shadow-md`}>
                    <CheckCircle size={20} />
                  </div>
                  <span className="mt-2 text-sm font-semibold">Delivered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Shipping Information</h3>
            <p className="text-gray-700"><strong>Name:</strong> {order.user.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {order.user.email}</p>
            <p className="text-gray-700 mt-2"><strong>Address:</strong><br/>
              {order.shippingAddress.address}<br/>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
              {order.shippingAddress.country}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Order Items</h3>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img src={item.image.startsWith('/') ? `http://localhost:5000${item.image}` : item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
                  <div className="flex-1">
                    <Link to={`/product/${item.product}`} className="font-semibold text-primary hover:underline">{item.name}</Link>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                  <div className="font-bold text-gray-800">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
