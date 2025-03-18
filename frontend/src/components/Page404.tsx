const Page404 = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border border-gray-300 bg-gray-50/10 rounded shadow w-96">
        <div className="head p-4 text-2xl font-bold text-gray-800 flex justify-center">⚠️ 404 Page Not Found ❗</div>
        <hr className="text-gray-300" />
        <div className="body p-2 text-gray-600">
          Oops... that is a <strong>wrong turn!</strong> 🛑 Keep your mind focused here, dood..! 🤦‍♂️
        </div>
      </div>
    </div>
  );
};

export default Page404;
