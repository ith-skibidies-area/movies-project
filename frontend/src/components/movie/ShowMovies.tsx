import { useEffect, useState } from "react";
import http from "../../services/http";
import { toast } from "react-toastify";
import * as _ from "lodash";

interface GenreData {
  id: number;
  name: string;
}

interface MoveData {
  id: number;
  name: string;
  genre: {
    id: number;
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
  const maxItemsPerPage = 5;
  const [movies, setMovies] = useState<MoveData[]>();
  const [genres, setGenres] = useState<GenreData[]>();
  const [sortOrder, setSortOrder] = useState<SortData>({ key: "name", order: "asc" });
  const [page, setPage] = useState({
    number: 1,
    pages: [1],
  });
  const [activeGenre, setActiveGenre] = useState(-1);

  const titles = [
    { key: "id", name: "No" },
    { key: "name", name: "Name" },
    { key: "genre.name", name: "Genre" },
    { key: "release_date", name: "Release" },
    { key: "ott", name: "OTT" },
    { name: "Edit" },
    { name: "Delete" },
  ];
  useEffect(() => {
    http
      .get("/genres")
      .then((response) => setGenres([{ id: -1, name: "All" }, ...response.data]))
      .catch((error) => toast.error("Something went wrong"));
    http
      .get("/movies")
      .then((response) => {
        setMovies(response.data);
        setPage({ ...page, pages: _.range(1, response.data.length / maxItemsPerPage + 1) });
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
            const newPagesList = _.range(1, response.data.length / maxItemsPerPage + 1);
            const newPageNumber = newPagesList.includes(page.number) ? page.number : Math.max(page.number - 1, 1);
            setPage({ number: newPageNumber, pages: newPagesList });
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
      genre: { ...movie.genre, name: movie.genre.name ? movie.genre.name.toLowerCase() : movie.genre },
    })),
    [sortOrder.key],
    [sortOrder.order]
  );

  const filterMovies = () => {
    const newMoviesList = sortedMovies?.filter((movie) => (activeGenre === -1 ? true : movie.genre.id === activeGenre));
    return newMoviesList;
  };

  const moviesToShow = filterMovies()
    .slice((page.number - 1) * maxItemsPerPage, page.number * maxItemsPerPage)
    .map((movie) => ({
      ...movie,
      name: movie.name
        .split(" ")
        .map((i) => i[0].toUpperCase() + i.slice(1))
        .join(" "),
      genre: { name: movie.genre.name[0].toUpperCase() + movie.genre.name.slice(1) },
    }));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col border border-gray-300">
          <div className="text-center border-b border-gray-300 py-4">
            <div className="text-2xl font-bold text-gray-900 underline px-8">Genres</div>
          </div>
          <div className="flex">
            <div className="grow">
              <table className="table-auto border-collapse text-center w-full text-sm">
                <tbody>
                  {genres?.map((genre) => (
                    <tr
                      key={genre.id}
                      className={`cursor-pointer  text-base border-b border-gray-300 ${
                        genre.id === activeGenre ? "bg-sky-400 text-white" : "hover:bg-black/5"
                      }`}
                      onClick={() => {
                        const newMoviesList =
                          movies?.filter((movie) => (genre.id === -1 ? true : movie.genre.id === genre.id)) || [];
                        const newPagesList = _.range(1, newMoviesList.length / maxItemsPerPage + 1);
                        const newPageNumber = newPagesList.includes(page.number)
                          ? page.number
                          : Math.max(page.number - 1, 1);
                        setPage({ number: newPageNumber, pages: newPagesList });
                        setActiveGenre(genre.id);
                      }}
                    >
                      <td className="p-1">{genre.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full border border-gray-300">
          <div className="text-center border-b border-gray-300 py-4 flex justify-center items-start gap-1">
            <div className="text-2xl font-bold text-gray-900 underline">Movies </div>
            {<span className="bg-green-400 px-2 py-0.5 rounded-full text-xs font-medium">{filterMovies().length}</span>}
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
                  {moviesToShow?.map((movie) => (
                    <tr key={movie.name} className="mt-2 border-b border-gray-200 hover:bg-lime-100">
                      <td className="text-gray-800 py-1">{movie.id}</td>
                      <td className="text-gray-800 py-1">
                        <span className="font-medium">{movie.name}</span>
                      </td>
                      <td className="text-gray-800 py-1">{movie.genre.name}</td>
                      <td className="text-gray-800 py-1">{movie.release_date}</td>
                      <td className="text-gray-800 py-1">{movie.ott}</td>
                      <td className="text-gray-800 py-1">
                        <a
                          className="rounded p-1 bg-yellow-100 border border-yellow-500 text-sm cursor-pointer hover:outline-3 hover:outline-yellow-300"
                          href={`/wip`}
                        >
                          ✏️
                        </a>
                      </td>
                      <td className="text-gray-800 py-1">
                        <button
                          className="rounded p-1 bg-red-100 border border-red-500 text-sm cursor-pointer hover:outline-3 hover:outline-red-300"
                          onClick={() => handleDelete(movie.id)}
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
      {page.pages.length === 1 ? null : (
        <table className="w-full flex p-2 border-collapse">
          <tbody>
            <tr>
              {page.pages.map((p) => (
                <td
                  key={p}
                  className={`cursor-pointer border-2 border-gray-300 text-sky-600 px-3 py-0.5 ${
                    p === page.number ? "bg-sky-400 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setPage({ ...page, number: p })}
                >
                  {p}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowMovies;
