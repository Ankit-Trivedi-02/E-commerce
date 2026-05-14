import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Edit, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Show / Hide Form
  const [showForm, setShowForm] = useState(false);

  // Edit mode
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [images, setImages] = useState(['']);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        '/api/products?pageNumber=1&keyword='
      );

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

  // Add new image input
  const addImageField = () => {
    setImages([...images, '']);
  };

  // Update image field
  const updateImageField = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  // Remove image field
  const removeImageField = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const filteredImages = images.filter(
        (img) => img.trim() !== ''
      );

      if (editingId) {
        // UPDATE
        await axios.put(`/api/products/${editingId}`, {
          name,
          price,
          coverImage,
          images: filteredImages,
          category,
          stock,
          description,
        });

        toast.success('Product updated');
      } else {
        // CREATE SAMPLE PRODUCT
        const { data: newProduct } = await axios.post(
          '/api/products',
          {}
        );

        // UPDATE CREATED PRODUCT
        await axios.put(`/api/products/${newProduct._id}`, {
          name,
          price,
          coverImage,
          images: filteredImages,
          category,
          stock,
          description,
        });

        toast.success('Product created');
      }

      fetchProducts();
      resetForm();

      // Hide form after success
      setShowForm(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Operation failed'
      );
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);

        toast.success('Product deleted');

        fetchProducts();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const editHandler = (product) => {
    setShowForm(true);

    setEditingId(product._id);

    setName(product.name);
    setPrice(product.price);

    setCoverImage(product.coverImage || '');

    setImages(
      product.images?.length > 0
        ? product.images
        : ['']
    );

    setCategory(product.category);
    setStock(product.stock);
    setDescription(product.description);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setName('');
    setPrice('');
    setCoverImage('');
    setImages(['']);
    setCategory('');
    setStock('');
    setDescription('');
  };

  return (
    <div className="p-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Current Products
        </h2>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Product
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold">
              {editingId
                ? 'Edit Product'
                : 'Create Product'}
            </h3>

            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>
          </div>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 text-sm font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* COVER IMAGE */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Cover Image URL
              </label>

              <input
                type="text"
                value={coverImage}
                onChange={(e) =>
                  setCoverImage(e.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-lg p-3"
                required
              />

              {coverImage && (
                <img
                  src={coverImage}
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg border mt-3"
                />
              )}
            </div>

            {/* OTHER IMAGES */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">
                  Other Product Images
                </label>

                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
                >
                  + Add Image
                </button>
              </div>

              <div className="space-y-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center"
                  >
                    <input
                      type="text"
                      value={img}
                      onChange={(e) =>
                        updateImageField(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 border rounded-lg p-3"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImageField(index)
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* PREVIEW */}
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map(
                  (img, index) =>
                    img && (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    )
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={4}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                {editingId
                  ? 'Update Product'
                  : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PRODUCT TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-4 text-left">
                  IMAGE
                </th>
                <th className="px-4 py-4 text-left">
                  NAME
                </th>
                <th className="px-4 py-4 text-left">
                  PRICE
                </th>
                <th className="px-4 py-4 text-left">
                  CATEGORY
                </th>
                <th className="px-4 py-4 text-left">
                  STOCK
                </th>
                <th className="px-4 py-4 text-left">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {product.name}
                  </td>

                  <td className="px-4 py-4">
                    ${product.price}
                  </td>

                  <td className="px-4 py-4">
                    {product.category}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          editHandler(product)
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() =>
                          deleteHandler(product._id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default AdminProducts;