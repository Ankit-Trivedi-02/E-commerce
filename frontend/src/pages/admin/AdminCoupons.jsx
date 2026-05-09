import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Trash2 } from 'lucide-react';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [expiryDate, setExpiryDate] = useState('');

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/coupons');
      setCoupons(data);
    } catch (error) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/coupons', { code, discountPercentage, expiryDate });
      toast.success('Coupon created successfully');
      fetchCoupons();
      setCode('');
      setDiscountPercentage(10);
      setExpiryDate('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`/api/coupons/${id}`);
        toast.success('Coupon deleted');
        fetchCoupons();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete coupon');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Create Discount Coupon</h2>
        <form onSubmit={createHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Coupon Code</label><input type="text" className="w-full border rounded p-2 uppercase" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} required placeholder="e.g. SUMMER20" /></div>
          <div><label className="block text-sm font-medium mb-1">Discount (%)</label><input type="number" min="1" max="100" className="w-full border rounded p-2" value={discountPercentage} onChange={e=>setDiscountPercentage(e.target.value)} required /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Expiry Date</label><input type="date" className="w-full border rounded p-2" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} required /></div>
          <div className="md:col-span-2">
             <button type="submit" className="btn-primary flex items-center justify-center gap-2"><Plus size={18}/> Create Coupon</button>
          </div>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4">Active & Past Coupons</h2>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">CODE</th>
                <th className="px-4 py-3">DISCOUNT</th>
                <th className="px-4 py-3">EXPIRY</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-900">{coupon.code}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">{coupon.discountPercentage}%</td>
                  <td className="px-4 py-3 text-sm">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {new Date(coupon.expiryDate) < new Date() || !coupon.isActive ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Expired</span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteHandler(coupon._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
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

export default AdminCoupons;
