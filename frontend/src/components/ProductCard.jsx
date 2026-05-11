import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary mb-2 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          <Link to={`/product/${product._id}`} className="text-primary font-medium text-sm hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
