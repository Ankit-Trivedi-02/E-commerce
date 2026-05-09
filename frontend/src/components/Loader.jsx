const Loader = ({ size = 'h-12 w-12', className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-20 ${className}`}>
      <div className={`animate-spin rounded-full ${size} border-b-2 border-primary`}></div>
    </div>
  );
};

export default Loader;
