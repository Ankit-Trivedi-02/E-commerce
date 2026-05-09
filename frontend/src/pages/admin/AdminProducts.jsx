import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Edit } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit mode state
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products?pageNumber=1&keyword=');
      setProducts(data.products || []);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.image);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update product
        await axios.put(`/api/products/${editingId}`, {
          name, price, image, category, stock, description
        });
        toast.success('Product updated successfully');
      } else {
        // Create product
        const { data: newProd } = await axios.post('/api/products', {});
        await axios.put(`/api/products/${newProd._id}`, {
          name, price, image, category, stock, description
        });
        toast.success('Product created successfully');
      }
      
      fetchProducts();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const editHandler = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock);
    setDescription(product.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName(''); setPrice(0); setImage(''); setCategory(''); setStock(0); setDescription('');
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-800">Cancel Edit</button>
          )}
        </div>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={name} onChange={e=>setName(e.target.value)} required /></div>
          <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" className="w-full border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={category} onChange={e=>setCategory(e.target.value)} required /></div>
          <div><label className="block text-sm font-medium mb-1">Price ($)</label><input type="number" step="0.01" className="w-full border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={price} onChange={e=>setPrice(e.target.value)} required /></div>
          <div><label className="block text-sm font-medium mb-1">Stock Quantity</label><input type="number" className="w-full border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={stock} onChange={e=>setStock(e.target.value)} required /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={description} onChange={e=>setDescription(e.target.value)} required></textarea></div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Image URL or Upload</label>
            <div className="flex gap-4 items-center mb-2">
              <input type="text" placeholder="Enter image URL" className="flex-1 border rounded p-2 focus:ring-2 focus:ring-primary focus:outline-none" value={image} onChange={e=>setImage(e.target.value)} />
              <span className="text-gray-500">OR</span>
              <input type="file" onChange={uploadFileHandler} className="border p-1 rounded" />
            </div>
            {image && <img src={image.startsWith('/') ? `http://localhost:5000${image}` : image} alt="Preview" className="h-20 object-cover rounded mt-2 border" />}
          </div>
          <div className="md:col-span-2 mt-4">
             <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                {editingId ? <><Edit size={18} /> Update Product</> : <><Plus size={18}/> Create Product</>}
             </button>
          </div>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4">Current Products</h2>
      {loading ? <p>Loading...</p> : (
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">NAME</th>
              <th className="px-4 py-3">PRICE</th>
              <th className="px-4 py-3">CATEGORY</th>
              <th className="px-4 py-3">STOCK</th>
              <th className="px-4 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{product._id.substring(0,8)}</td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => editHandler(product)} className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
