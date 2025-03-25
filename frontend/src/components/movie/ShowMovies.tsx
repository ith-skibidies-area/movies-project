import { useEffect, useState } from "react";
import http from "../../services/http";
import { toast } from "react-toastify";
import * as _ from "lodash";

interface MoveData {
  name: string;
  genre_id: string;
  genre: {
    name: string;
  };
  ott: string;
  release_date: string;
}

interface SortData {
  key: string;
  order: "asc" | "desc";
}

const ShowMovies = () => {
  const [movies, setMovies] = useState<MoveData[]>();
  const [sortOrder, setSortOrder] = useState<SortData>({ key: "name", order: "asc" });
  const titles = [
    { name: "No" },
    { key: "name", name: "Name" },
    { key: "genre.name", name: "Genre" },
    { key: "release_date", name: "Release" },
    { key: "ott", name: "OTT" },
    { name: "Edit" },
    { name: "Delete" },
  ];
  useEffect(() => {
    http
      .get("/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);

  const handleSort = (key: string) => {
    if (key !== sortOrder.key) return setSortOrder({ ...sortOrder, key });
    const newOrder = sortOrder.order === "asc" ? "desc" : "asc";
    setSortOrder({ ...sortOrder, order: newOrder });
  };

  const handleDelete = (movieId: number) => {
    http
      .delete("/movie/" + movieId, { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
      .then((response) => {
        toast.success(response.data.msg);
        http
          .get("/movies")
          .then((response) => {
            setMovies(response.data);
          })
          .catch((error) => {
            toast.error("Something went wrong");
            console.log(error);
          });
      })
      .catch((error) => toast.error(error.response.data.msg));
  };

  // const moviesToShow = movies;
  const sortedMovies = _.orderBy(
    movies?.map((movie) => ({
      ...movie,
      name: movie.name.toLowerCase(),
      genre: { name: movie.genre.name ? movie.genre.name.toLowerCase() : movie.genre },
    })),
    [sortOrder.key],
    [sortOrder.order]
  );
  const moviesToShow = sortedMovies?.map((movie) => ({
    ...movie,
    name: movie.name
      .split(" ")
      .map((i) => i[0].toUpperCase() + i.slice(1))
      .join(" "),
    genre: { name: movie.genre.name[0].toUpperCase() + movie.genre.name.slice(1) },
  }));

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full border border-gray-300">
        <div className="text-center border-b border-gray-300 py-4">
          <div className="text-2xl font-bold text-gray-900 underline">Movies List</div>
        </div>
        <div className="flex">
          <div className="grow p-2">
            <table className="table-auto border-collapse text-center w-full text-sm">
              <thead>
                <tr className="border-b border-gray-500">
                  {titles.map((title, index) =>
                    title.key ? (
                      <th className="py-2" key={index}>
                        <span className="cursor-pointer" onClick={() => handleSort(title.key)}>
                          {title.name}
                          {sortOrder.key === title.key ? (
                            sortOrder.order === "asc" ? (
                              " 🔼"
                            ) : (
                              " 🔽"
                            )
                          ) : (
                            <span className="text-white/30">{" ↕️"}</span>
                          )}
                        </span>
                      </th>
                    ) : (
                      <th className="py-2" key={index}>
                        {title.name}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {moviesToShow?.map((movie, index) => (
                  <tr key={movie.name} className="mt-2 border-b border-gray-200 hover:bg-lime-100">
                    <td className="text-gray-800 py-1">{index + 1}</td>
                    <td className="text-gray-800 py-1">
                      <span className="font-medium">{movie.name}</span>
                    </td>
                    <td className="text-gray-800 py-1">{movie.genre.name}</td>
                    <td className="text-gray-800 py-1">{movie.release_date}</td>
                    <td className="text-gray-800 py-1">{movie.ott}</td>
                    <td className="text-gray-800 py-1">
                      <a
                        className="rounded p-1 bg-yellow-100 border border-yellow-500 text-sm cursor-pointer hover:outline-3 hover:outline-yellow-300"
                        href={`/not-found`}
                      >
                        ✏️
                      </a>
                    </td>
                    <td className="text-gray-800 py-1">
                      <button
                        className="rounded p-1 bg-red-100 border border-red-500 text-sm cursor-pointer hover:outline-3 hover:outline-red-300"
                        onClick={() => handleDelete(index + 1)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMovies;
