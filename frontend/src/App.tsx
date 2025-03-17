const App = () => {
  return (
    <div className="flex justify-center items-center p-20">
      <div className="card border border-black/20 rounded-lg overflow-hidden shadow w-96">
        <div className="card-head">
          <div className="flex gap-0 p-2 justify-center items-center">
            <img src="/popcorn.svg" alt="NA" style={{ height: "2rem" }} />
            <div className="text-2xl text-gray-800 font-bold p-2">Welcome to Movies Web</div>
          </div>
        </div>
        <hr className="text-black/20" />
        <div className="card-body">
          <div className="text-gray-500 p-2">
            Hey there! You have came to the right app. But it was little too early. App is still in development.
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
