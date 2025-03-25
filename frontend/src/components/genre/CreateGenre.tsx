import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router";
import http from "../../services/http";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().required().min(3).label("'Genre Name'"),
  })
  .required();

type formData = yup.InferType<typeof schema>;

const CreateGenre = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });
  const { id } = useParams();

  useEffect(() => {
    console.log("Passed ID:", id);
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.warn("Validation not yet added for the form");
    console.log("Form submit clicked");
    http
      .post("/genres", data, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
      .then((response) => {
        toast.success(response.data.msg);
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
        <div className="text-2xl font-bold text-gray-800">Genre Form</div>
        <hr className="text-gray-400" />
        <div className="">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="name">
                Genre Name<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.name ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                type="text"
                id="name"
                placeholder="Name"
                {...register("name")}
              />
              {errors.name ? <div className="text-sm text-red-500">{errors.name.message}</div> : null}
            </div>
            <div className="mt-3 flex flex-col">
              <button className="rounded-lg cursor-pointer bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-sky-400">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGenre;
