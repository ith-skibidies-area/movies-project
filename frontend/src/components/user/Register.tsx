import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup
      .string()
      .required()
      .matches(/^([A-Za-z]*)$/gi, "Only Alphabets allowed")
      .min(3)
      .label("'Username'"),
    password: yup.string().required().min(3).label("'Password'"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Should be same as 'Password'")
      .label("'Confirm Password'"),
    role: yup.string().required().label("'Role'"),
  })
  .required();

type formData = yup.InferType<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.warn("Validation not yet added for the form");
    console.log("Form submit clicked");
    console.log(data);
  };

  const onError = () => {
    console.error("Invalid form submitted");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-3 rounded-lg shadow">
        <div className="text-2xl font-bold text-gray-800">Register your account</div>
        <hr className="text-gray-400" />
        <div className="">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="username">
                Username<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.username ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                type="text"
                id="username"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username ? <div className="text-sm text-red-500">{errors.username.message}</div> : null}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="password">
                Password<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.password ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                type="password"
                autoComplete="off"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password ? <div className="text-sm text-red-500">{errors.password.message}</div> : null}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="confirmPassword">
                Confirm Password<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.confirmPassword
                    ? "border-red-600 focus:outline-red-400"
                    : "border-gray-200 focus:outline-sky-400"
                }`}
                type="password"
                autoComplete="off"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <div className="text-sm text-red-500">{errors.confirmPassword.message}</div>
              ) : null}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="font-medium text-gray-800 cursor-pointer" htmlFor="radioUser">
                Role<span className="text-red-600 text-sm">*</span>
              </label>
              <div className="flex gap-5">
                <div className="flex gap-1 items-center">
                  <input
                    className="cursor-pointer w-4 h-4 accent-orange-600 focus:outline-sky-400"
                    type="radio"
                    id="radioAdmin"
                    value="admin"
                    {...register("role")}
                  />
                  <label className="cursor-pointer font-medium text-gray-800" htmlFor="radioAdmin">
                    Admin
                  </label>
                </div>
                <div className="flex gap-1 items-center">
                  <input
                    className="cursor-pointer w-4 h-4 accent-orange-600 focus:outline-sky-400"
                    type="radio"
                    id="radioUser"
                    value="user"
                    {...register("role")}
                  />
                  <label className="cursor-pointer font-medium text-gray-800" htmlFor="radioUser">
                    User
                  </label>
                </div>
              </div>
              {errors.role ? <div className="text-sm text-red-500">{errors.role.message}</div> : null}
            </div>
            <div className="mt-3 flex gap-2 items-center">
              <input className="h-4 w-4 accent-sky-600 focus:outline-sky-400" type="checkbox" id="termsAndConditions" />
              <label className="italic text-sm text-gray-400 cursor-pointer select-none" htmlFor="termsAndConditions">
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
