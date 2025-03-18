const InitialPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border border-gray-300 bg-gray-50/10 rounded shadow w-96">
        <div className="flex justify-center head p-4 text-2xl font-bold text-gray-800">
          <div className="flex items-center">
            <img src="/popcorn.svg" alt="NA" style={{ height: "2rem" }} />
            <div>Welcome to Movies Web</div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <div className="body p-2 text-gray-600">
          👋 Hey there! You have came to the right app. But little too early ⌛ App is still in development 🛠️
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
