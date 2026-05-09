import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatusHandler = async (id, newStatus) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">USER</th>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3">TOTAL</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-3 text-sm">{order._id.substring(0,8)}</td>
                  <td className="px-4 py-3 text-sm">{order.user ? order.user.name : 'Unknown User'}</td>
                  <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-semibold">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full 
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/order/${order._id}`} className="text-primary hover:underline font-medium">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
