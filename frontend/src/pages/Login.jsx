import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/users/login', { email, password });
      login(data);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl glass-effect border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full btn-primary py-3"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">New Customer? <Link to="/register" className="text-primary font-semibold hover:underline">Register Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
