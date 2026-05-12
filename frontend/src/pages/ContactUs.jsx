import React from "react";
import Newsletter from "../components/Newsletter";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">

            {/* Top Taglines */}
            <div className="text-center max-w-4xl mx-auto mb-14">
                <p className="text-indigo-600 font-semibold uppercase tracking-widest mb-3">
                    Your Favorite Shopping Destination
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    We’re Here to Make Your Shopping Experience Better
                </h1>

                <p className="text-gray-600 text-lg mt-5">
                    Fast delivery, secure payments, premium products, and dedicated
                    customer support — everything you need in one place.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <span className="bg-white shadow-sm border px-5 py-2 rounded-full text-gray-700">
                        🚚 Fast Delivery
                    </span>

                    <span className="bg-white shadow-sm border px-5 py-2 rounded-full text-gray-700">
                        🔒 Secure Payments
                    </span>

                    <span className="bg-white shadow-sm border px-5 py-2 rounded-full text-gray-700">
                        💎 Premium Quality
                    </span>

                    <span className="bg-white shadow-sm border px-5 py-2 rounded-full text-gray-700">
                        🎧 24/7 Support
                    </span>
                </div>
            </div>

            {/* Contact Section */}
            <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Left Side */}
                <div className="bg-indigo-600 text-white p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-5">
                        Contact Information
                    </h2>

                    <p className="text-indigo-100 mb-8">
                        Have questions about your orders, products, or delivery?
                        Reach out to us anytime — we’d love to help.
                    </p>

                    <div className="space-y-5">
                        <div>
                            <h4 className="font-semibold">📍 Address</h4>
                            <p className="text-indigo-100">
                                123 Market Street, New Delhi, India
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">📞 Phone</h4>
                            <p className="text-indigo-100">+91 98765 43210</p>
                        </div>

                        <div>
                            <h4 className="font-semibold">📧 Email</h4>
                            <p className="text-indigo-100">support@shophub.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Send Us a Message
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Message
                            </label>

                            <textarea
                                rows="5"
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <Newsletter />
        </div>
    );
};

export default ContactUs;