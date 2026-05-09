import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
             <Route path="/profile" element={<Profile />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/orders" element={<Orders />} />
             <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route element={<ProtectedRoute adminOnly={true} />}>
             <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
          {/* Add other routes when pages are ready */}
        </Routes>
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-600 mt-auto">
        <p>&copy; {new Date().getFullYear()} E-Commerce MVP</p>
      </footer>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
