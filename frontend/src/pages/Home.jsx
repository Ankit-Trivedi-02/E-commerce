import { Link } from 'react-router-dom';

const Home = () => {

  const categories = [
    {
      name: 'Cricket',
      image:
        'https://crowncricketer.com/wp-content/uploads/2024/04/Cricket-Bats.jpeg',
    },
    {
      name: 'Football',
      image:
        'https://images.jdmagicbox.com/v2/comp/mumbai/h4/022pxx22.xx22.110712190802.k4h4/catalogue/royal-sports-dhobi-talao-mumbai-sports-goods-dealers-317f44r.jpg',
    },
    {
      name: 'Badminton',
      image:
        'https://ultrex.in/wp-content/uploads/2023/11/Untitled-design-2025-01-04T133909.646.png',
    },
    {
      name: 'Basketball',
      image:
        'https://static1.gensler.com/uploads/hero_element/20388/thumb_desktop/thumbs/project-nba-store-paris-08-2000x1125_1661986274_1024x576.jpg',
    },
    {
      name: 'Table Tennis',
      image:
        'https://www.greenpaddle.com/cdn/shop/files/IMG_4828_2000x2000_crop_center.jpg?v=1613688307',
    },
  ];

  const banners = [
    {
      title: 'Premium Collection',
      subtitle: 'New Season Arrivals',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Exclusive Deals',
      subtitle: 'Up To 50% OFF',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Trending Products',
      subtitle: 'Best Sellers Of The Month',
      image:
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="w-full overflow-hidden">

      {/* HERO BANNER */}
      <Link to="/shop">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 -mt-24 h-[75vh] md:h-[90vh] overflow-hidden">
          
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45 flex items-center">
            <div className="px-6 md:px-20 max-w-3xl">
              
              <p className="text-white/80 uppercase tracking-[4px] text-sm md:text-base mb-4">
                Premium Shopping Experience
              </p>

              <h1 className="text-white text-4xl md:text-7xl font-black leading-tight">
                THE PRODUCTS <br />
                YOU WILL LOVE
              </h1>

              <p className="text-white/90 mt-5 text-sm md:text-lg max-w-xl">
                Discover premium collections with unbeatable quality
                and modern design.
              </p>

              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* CATEGORY SECTION */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Shop Categories
          </h2>

          <Link
            to="/shop"
            className="text-indigo-600 font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/shop"
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-square">
                
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="text-white text-lg md:text-xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INFO STRIP */}
      <div className="bg-indigo-900 text-white py-4 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm md:text-lg font-semibold text-center px-4">
          <span>Premium Quality</span>
          <span>Fast Delivery</span>
          <span>Trusted By Customers</span>
          <span>Affordable Prices</span>
        </div>
      </div>

      {/* PROMO BANNERS */}
      <section className="py-12 md:py-16 px-4 md:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            TRENDING NOW
          </h2>

          <p className="text-gray-500 mt-3">
            Explore the hottest collections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {banners.map((banner, index) => (
            <Link
              key={index}
              to="/shop"
              className="group relative overflow-hidden rounded-3xl h-[300px]"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                
                <p className="text-white/80 text-sm uppercase tracking-widest">
                  {banner.subtitle}
                </p>

                <h3 className="text-white text-3xl font-bold mt-2">
                  {banner.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-gray-50">

        <h2 className="text-center text-3xl md:text-5xl font-black text-gray-900 mb-14">
          WHY SHOP WITH US
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          
          <div>
            <div className="text-5xl mb-5">🚚</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Fast Delivery
            </h3>

            <p className="text-gray-500 mt-3">
              Quick and reliable delivery for all orders.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-5">⭐</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Premium Quality
            </h3>

            <p className="text-gray-500 mt-3">
              Carefully selected premium products.
            </p>
          </div>

          <div>
            <div className="text-5xl mb-5">💳</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Secure Payment
            </h3>

            <p className="text-gray-500 mt-3">
              Safe and secure checkout experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;