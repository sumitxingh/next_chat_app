import SkeletonUserCard from "./SkeletonUserCard";

const SkeletonUserList: React.FC = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skeletonItems.map((_, idx) => (
        <SkeletonUserCard key={idx} />
      ))}
    </div>
  );
};

export default SkeletonUserList;