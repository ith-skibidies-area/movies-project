import React from "react";

const Register = () => {
  const handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    console.warn("Validation not yet added for the form");
    console.log("Form submit clicked");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-3 rounded-lg shadow">
        <div className="text-2xl font-bold text-gray-800">Register your account</div>
        <hr className="text-gray-400" />
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="username">
                Username<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border border-gray-200 focus:outline-sky-400 font-medium text-gray-900 p-1 rounded"
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="password">
                Password<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border border-gray-200 focus:outline-sky-400 font-medium text-gray-900 p-1 rounded"
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="confirmPassword">
                Confirm Password<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border border-gray-200 focus:outline-sky-400 font-medium text-gray-900 p-1 rounded"
                type="password"
                autoComplete="off"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="font-medium text-gray-800" htmlFor="password">
                Role<span className="text-red-600 text-sm">*</span>
              </label>
              <div className="flex gap-5">
                <div className="flex gap-1 items-center">
                  <input
                    className="cursor-pointer w-4 h-4 accent-orange-600 focus:outline-sky-400"
                    type="radio"
                    name="role"
                    id="admin"
                  />
                  <label className="cursor-pointer font-medium text-gray-800" htmlFor="admin">
                    Admin
                  </label>
                </div>
                <div className="flex gap-1 items-center">
                  <input
                    className="cursor-pointer w-4 h-4 accent-orange-600 focus:outline-sky-400"
                    type="radio"
                    name="role"
                    id="user"
                    defaultChecked
                  />
                  <label className="cursor-pointer font-medium text-gray-800" htmlFor="user">
                    User
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 items-center">
              <input className="h-4 w-4 accent-sky-600 focus:outline-sky-400" type="checkbox" id="termsAndConditions" />
              <label className="italic text-sm text-gray-400" htmlFor="termsAndConditions">
                I accept terms and conditions<span className="text-red-600 text-sm">*</span>
              </label>
            </div>
            <div className="mt-3 flex flex-col">
              <button className="rounded-lg cursor-pointer bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-sky-400">
                Register
              </button>
            </div>
            <div className="mt-3 flex">
              <div className="text-sm text-gray-600">
                Already have account?{" "}
                <a className="text-blue-500 focus:outline-sky-400" href="#">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
