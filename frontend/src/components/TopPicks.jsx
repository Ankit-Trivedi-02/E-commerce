import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

export default function TopPicks() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopPicks = async () => {
            try {
                setLoading(true);

                // Change API route according to your backend
                const { data } = await axios.get('/api/products');

                setProducts(data.products || []);
            } catch (error) {
                toast.error('Failed to load top picks');
            } finally {
                setLoading(false);
            }
        };

        fetchTopPicks();
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            {/* Heading */}
            <div className="py-12 px-4">
                <h1 className="text-3xl md:text-4xl font-medium text-slate-800 text-center mb-2 font-poppins">
                    Top Picks
                </h1>

                <p className="text-slate-600 mb-10 font-poppins text-center">
                    Discover our most loved products.
                </p>

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <section className="flex flex-wrap items-center justify-center gap-6">

                        {products.map((product) => (
                            <a
                                key={product._id}
                                href={`/product/${product._id}`}
                                className="group w-56"
                            >
                                <img
                                    className="rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover"
                                    src={product.image}
                                    alt={product.name}
                                />

                                <p className="text-sm mt-3 text-slate-700 font-poppins">
                                    {product.name}
                                </p>

                                <p className="text-xl font-medium text-slate-900 font-poppins">
                                    $ {product.price}
                                </p>
                            </a>
                        ))}

                    </section>
                )}
            </div>
        </>
    );
}