const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              TENNEX
            </h2>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium sports gear for cricket, badminton, tennis & fitness enthusiasts.
              Built for performance, durability, and champions.
            </p>

            <div className="mt-6 text-sm text-gray-400">
              <p>📞 +91 99999 99999</p>
              <p>📧 support@tennex.com</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/shop" className="hover:text-white transition">
                  Shop
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="/developer" className="hover:text-white transition">
                  Developer
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              About Us
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              We are a sports-first brand focused on delivering high-quality equipment
              trusted by players since the '90s. Performance is our priority.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TENNEX. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;