import SkeletonLoader from "./SekeltonLoader";

const SkeletonSidebar: React.FC = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <>
      <ul>
        {skeletonItems.map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </ul>
    </>
  );
};

export default SkeletonSidebar;
