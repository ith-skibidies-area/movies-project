import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router";

type formData = {
  name: string;
  gener_id: number;
  ott: string;
  release_date: string;
};

const CreateMovie = () => {
  const { register, handleSubmit, setValue } = useForm<formData>();
  const { id } = useParams();

  useEffect(() => {
    console.log("Passed ID:", id);
    setValue("release_date", "2025-03-25");
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.warn("Validation not yet added for the form");
    console.log("Form submit clicked");
    const release_date = {
      year: Number.parseInt(data.release_date.split("-")[0]),
      month: Number.parseInt(data.release_date.split("-")[1]),
      date: Number.parseInt(data.release_date.split("-")[2]),
    };
    const input_data = { ...data, release_date };
    console.log(input_data);
  };

  const onError = () => {
    console.error("Invalid form submitted");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-3 rounded-lg shadow">
        <div className="text-2xl font-bold text-gray-800">Movie Form</div>
        <hr className="text-gray-400" />
        <div className="">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="name">
                Movie Name<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                type="text"
                id="name"
                placeholder="Name"
                {...register("name")}
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="gener_id">
                Genre ID<span className="text-red-600 text-sm">*</span>
              </label>
              <select
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                id="gener_id"
                {...register("gener_id")}
                defaultValue={"0"}
              >
                <option value="0">---Select---</option>
                <option value="1">Action</option>
                <option value="2">Horror</option>
              </select>
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="ott">
                OTT Platform<span className="text-red-600 text-sm">*</span>
              </label>
              <select
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                id="ott"
                {...register("ott")}
                defaultValue={"default"}
              >
                <option value="default">---Select---</option>
                <option value="Amazon">Amazon</option>
                <option value="Jio">Jio</option>
                <option value="Sony">Sony</option>
                <option value="Hulu">Hulu</option>
              </select>
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="release_date">
                Release Date<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className="border font-medium text-gray-900 p-1 rounded border-gray-200 focus:outline-sky-400"
                type="date"
                id="release_date"
                {...register("release_date")}
              />
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

export default CreateMovie;
