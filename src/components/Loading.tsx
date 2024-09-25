export const LoadingOverlay = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="text-white text-4xl">Loading...</div>
        <img
          src="/path-to-your-penguin-image.png"
          alt="Loading Penguin"
          className="w-32 h-32 animate-bounce mt-5"
        />
      </div>
    );
  };
