const SkeletonUserCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 shimmer"></div>
        <div className="flex-1">
          <div className="w-32 h-6 bg-gray-300 rounded shimmer mb-2"></div>
          <div className="w-48 h-6 bg-gray-300 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserCard;