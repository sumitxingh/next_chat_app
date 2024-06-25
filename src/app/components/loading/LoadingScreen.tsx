const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Loading 🔃</h1>
        <p className="text-lg text-gray-600 mt-4">wait for few seconds...</p>
      </div>
    </div>
  )
}
export default LoadingScreen;