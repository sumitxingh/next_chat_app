const SkeletonLoader: React.FC = () => {
  return (
    <li className="py-2 px-4 flex items-center">
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-gray-300 shimmer"></div>
      </div>
      <div className="ml-2 w-32 h-6 bg-gray-300 rounded shimmer"></div>
    </li>
  );
};

export default SkeletonLoader;
