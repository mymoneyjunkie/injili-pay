const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;