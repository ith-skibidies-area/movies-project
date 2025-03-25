import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import http from "../../services/http";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().required().min(3).label("'Movie Name'"),
    genre_id: yup.number().required().notOneOf([-1], "Please select a valid input").label("'Genre'"),
    ott: yup.string().required().notOneOf(["default"], "Please select a valid input").label("'OTT'"),
    release_date: yup.string().required().label("'Release Date'"),
  })
  .required();

type formData = yup.InferType<typeof schema>;

type GenreData = {
  name: string;
};

const CreateMovie = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });
  const [genres, setGenres] = useState<GenreData[]>([]);
  const [otts, setOtts] = useState([]);

  useEffect(() => {
    http.get("/genres").then((response) => setGenres(response.data));
    http.get("/ott").then((response) => setOtts(response.data));
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
    http
      .post("/movies", input_data, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
      .then((response) => {
        toast.success(response.data.msg);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const onError = () => {
    console.error("Invalid form submitted");
    console.log(errors);
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
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="genre_id">
                Genre ID<span className="text-red-600 text-sm">*</span>
              </label>
              <select
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.genre_id ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                id="genre_id"
                {...register("genre_id")}
                defaultValue={-1}
              >
                <option value={-1}>---Select---</option>
                {genres.map((genre, index) => (
                  <option key={genre.name} value={index + 1}>
                    {genre.name}
                  </option>
                ))}
              </select>
              {errors.genre_id ? <div className="text-sm text-red-500">{errors.genre_id.message}</div> : null}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="ott">
                OTT Platform<span className="text-red-600 text-sm">*</span>
              </label>
              <select
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.ott ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                id="ott"
                {...register("ott")}
                defaultValue={"default"}
              >
                <option value="default">---Select---</option>
                {otts.map((ott) => (
                  <option key={ott} value={ott}>
                    {ott}
                  </option>
                ))}
              </select>
              {errors.ott ? <div className="text-sm text-red-500">{errors.ott.message}</div> : null}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <label className="cursor-pointer font-medium text-gray-800" htmlFor="release_date">
                Release Date<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                className={`border font-medium text-gray-900 p-1 rounded ${
                  errors.release_date ? "border-red-600 focus:outline-red-400" : "border-gray-200 focus:outline-sky-400"
                }`}
                type="date"
                id="release_date"
                {...register("release_date")}
              />
            </div>
            {errors.release_date ? <div className="text-sm text-red-500">{errors.release_date.message}</div> : null}
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
