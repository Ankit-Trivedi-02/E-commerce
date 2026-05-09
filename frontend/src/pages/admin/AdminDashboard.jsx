import { Link, Routes, Route } from 'react-router-dom';

import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminOrderDetails from './AdminOrderDetails';
import AdminUsers from './AdminUsers';
import AdminCoupons from './AdminCoupons';

const AdminDashboard = () => {
  return (
    <div className="flex h-[calc(100vh-140px)] bg-gray-50 -mx-4 -my-8 md:mx-0 md:my-0 shadow-inner md:shadow-lg md:rounded-xl overflow-hidden glass-effect border border-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/products" className="block px-4 py-3 rounded hover:bg-gray-700 transition">Products</Link>
          <Link to="/admin/orders" className="block px-4 py-3 rounded hover:bg-gray-700 transition">Orders</Link>
          <Link to="/admin/users" className="block px-4 py-3 rounded hover:bg-gray-700 transition">Users</Link>
          <Link to="/admin/coupons" className="block px-4 py-3 rounded hover:bg-gray-700 transition">Coupons</Link>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 bg-white overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        </div>
        <div>
          <Routes>
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/order/:id" element={<AdminOrderDetails />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/coupons" element={<AdminCoupons />} />
            <Route path="*" element={
              <div className="p-8 text-center text-gray-500">
                Select an option from the sidebar to manage your store.
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
