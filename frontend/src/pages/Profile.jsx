import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { User, Package } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put('/api/users/profile', { name, email });
      login(data); // update global user state
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:flex gap-8">
      <div className="md:w-1/3 mb-6 md:mb-0">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
            </div>
          </div>
          
          <nav className="flex flex-col space-y-2 flex-grow">
            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-primary font-medium border border-gray-200">
              <User size={18} /> Profile Settings
            </Link>
            <Link to="/orders" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <Package size={18} /> My Orders
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                 Admin Dashboard
              </Link>
            )}
          </nav>
          
          <button onClick={logout} className="mt-8 btn-secondary w-full border-red-200 text-red-600 hover:bg-red-50">
            Logout
          </button>
        </div>
      </div>
      
      <div className="md:w-2/3">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Profile Information</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary flex items-center justify-center min-w-[150px]"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
