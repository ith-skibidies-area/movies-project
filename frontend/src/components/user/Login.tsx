import { FieldValues, useForm } from "react-hook-form";
import http from "../../services/http";
import { toast } from "react-toastify";
import { userLoggin } from "../../services/auth";

type formData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<formData>();

  const onSubmit = (data: FieldValues) => {
    console.warn("Validation not yet added for the form");
    console.log("Form submit clicked");
    http
      .post("/login", data)
      .then((response) => {
        userLoggin(response.data.access_token);
        window.location.replace("/");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const onError = () => {
    console.error("Invalid form submitted");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-3 rounded-lg shadow">
        <div className="text-2xl font-bold text-gray-800">Login Into Your Account</div>
        <hr className="text-gray-400" />
        <div className="">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="username">
                Username<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                type="text"
                id="username"
                placeholder="Username"
                {...register("username")}
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="password">
                Password<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>

            <div className="mt-3 flex flex-col">
              <button className="rounded-lg cursor-pointer bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-sky-400">
                Login
              </button>
            </div>
            <div className="mt-3 flex">
              <div className="text-sm text-gray-600">
                New to our kinnamkachi App?{" "}
                <a className="text-blue-500 focus:outline-sky-400" href="#">
                  Register
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
