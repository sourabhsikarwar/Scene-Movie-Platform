import React from "react";

function Favourites() {
  // const [curGenre, setCurGenre] = useState("All Genres");
  // const [favourites, setFavourites] = useState([]);
  // const [genre, setGenre] = useState(["All Genres"]);
  // const [rating, setRating] = useState(0);
  // const [popularity, setPopularity] = useState(0);
  // const [search, setSearch] = useState('');
  // const [rows, setRows] = useState(5);
  // const [curPage, setCurPage] = useState(1)
  // const saveMounted = useRef(true);

  // const savedData = async () => {
  //   let favData = (await JSON.parse(localStorage.getItem("imdb"))) || [];
  //   setFavourites([...favData]);
  // };
  // const del = async (movie) => {
  //   const newArray = favourites.filter((m) => m.id !== movie.id);
  //   setFavourites([...newArray]);
  //   await localStorage.setItem("imdb", JSON.stringify(newArray));
  // };

  // const genres = [
  //   {
  //     id: 28,
  //     name: "Action",
  //   },
  //   {
  //     id: 12,
  //     name: "Adventure",
  //   },
  //   {
  //     id: 16,
  //     name: "Animation",
  //   },
  //   {
  //     id: 35,
  //     name: "Comedy",
  //   },
  //   {
  //     id: 80,
  //     name: "Crime",
  //   },
  //   {
  //     id: 99,
  //     name: "Documentary",
  //   },
  //   {
  //     id: 18,
  //     name: "Drama",
  //   },
  //   {
  //     id: 10751,
  //     name: "Family",
  //   },
  //   {
  //     id: 14,
  //     name: "Fantasy",
  //   },
  //   {
  //     id: 36,
  //     name: "History",
  //   },
  //   {
  //     id: 27,
  //     name: "Horror",
  //   },
  //   {
  //     id: 10402,
  //     name: "Music",
  //   },
  //   {
  //     id: 9648,
  //     name: "Mystery",
  //   },
  //   {
  //     id: 10749,
  //     name: "Romance",
  //   },
  //   {
  //     id: 878,
  //     name: "Science Fiction",
  //   },
  //   {
  //     id: 10770,
  //     name: "TV Movie",
  //   },
  //   {
  //     id: 53,
  //     name: "Thriller",
  //   },
  //   {
  //     id: 10752,
  //     name: "War",
  //   },
  //   {
  //     id: 37,
  //     name: "Western",
  //   },
  // ];

  // useEffect(() => {
  //   if(saveMounted.current){
  //     savedData();
  //   }
  //   return () => {
  //     saveMounted.current = false;
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     let temp = favourites.map(
  //       (movie) => genres.find((item) => item.id === movie.genre_ids[0]).name
  //     );
  //     // let temp = favourites.map((movie) => genres[movie.genre_ids[0]]); it is defining temp as object not as array
  //     temp = new Set(temp);
  //     setGenre(["All Genres", ...temp]);
  //   } catch (error) {
        // return error
  //   }
  // }, [favourites]);

  // let filterMovies = [];
  // filterMovies =
  //   curGenre === "All Genres"
  //     ? favourites
  //     : favourites.filter(
  //         (movie) =>
  //           curGenre ===
  //           genres.find((item) => item.id === movie.genre_ids[0]).name
  //       );

  //       filterMovies = filterMovies.filter((movie) => {
  //         return movie.title.toLowerCase().includes(search.toLowerCase())
  //       })

  //       let maxPage = Math.ceil(filterMovies.length/rows);
  //       let si = (curPage-1)*rows;
  //       let ei = Number(si) + Number(rows);

  //       filterMovies = filterMovies.slice(si, ei);

  //       let goBack = () => {
  //         if(curPage > 1){
  //           setCurPage(curPage - 1);
  //         }
  //       }

  //       let goNext = () => {
  //         if(curPage < maxPage){
  //           setCurPage(curPage + 1);
  //         }
  //       }

  // if (rating === -1) {
  //   filterMovies = filterMovies.sort(function (objA, objB) {
  //     return objA.vote_average - objB.vote_average;
  //   });
  // } else if (rating === 1) {
  //   filterMovies = filterMovies.sort(function (objA, objB) {
  //     return objB.vote_average - objA.vote_average;
  //   });
  // }

  // if (popularity === -1) {
  //   filterMovies = filterMovies.sort(function (objA, objB) {
  //     return objA.popularity - objB.popularity;
  //   });
  // } else if (popularity === 1) {
  //   filterMovies = filterMovies.sort(function (objA, objB) {
  //     return objB.popularity - objA.popularity;
  //   });
  // }

  return (
    <div>
      favorites
      {/* <div className="flex justify-center space-x-2 my-4 flex-wrap">
        {genre.map((gName) => (
          <div
            className={
              curGenre === gName
                ? "bg-blue-500 py-1 px-2 my-2 text-white rounded-md cursor-pointer drop-shadow-sm hover:bg-blue-600 ease-in-out duration-400"
                : "bg-gray-400 py-1 px-2 my-2 text-white rounded-md cursor-pointer drop-shadow-sm hover:bg-gray-500 ease-in-out duration-400"
            }
            onClick={() => {
              setCurGenre(gName)
              setCurPage(1);
            }}
          >
            {gName}
          </div>
        ))}
      </div> */}

      {/* <div className="flex flex-wrap justify-center my-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="border-2 p-2 mx-2 my-2" />
        <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} placeholder="Rows" className="border-2 p-2 mx-2 my-2" />
      </div> */}
      {/* <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="font-md text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="font-sm text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex">
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setPopularity(0);
                            setRating(-1)
                          }}
                        >
                          &#8681;
                        </p>
                        <p className="mx-2">Rating</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setPopularity(0);
                            setRating(1)}
                          }
                        >
                          &#8679;
                        </p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="font-sm text-gray-900 px-6 py-4 text-left"
                    >
                      <div className="flex">
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRating(0);
                            setPopularity(-1);
                          }}
                        >
                          &#8681;
                        </p>
                        <p className="mx-2">Popularity</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRating(0);
                            setPopularity(1)}
                          }
                        >
                          &#8679;
                        </p>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="font-md text-gray-900 px-6 py-4 text-left"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="font-md text-gray-900 px-6 py-4 text-left"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterMovies.map((movie) => {
                    return (
                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center my-auto break-all">
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`}
                            alt="poster"
                            width={120}
                          />
                          <h4 className="ml-4">{movie.title}</h4>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {movie.vote_average}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {movie.popularity}
                        </td>
                        <td className="text-sm text-green-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            className="rounded-lg bg-green-100 hover:bg-transparent p-2 ease-out duration-800"
                            onClick={() => del(movie)}
                          >
                            {
                              genres.find((e) => e.id === movie.genre_ids[0])
                                .name
                            }
                          </button>
                        </td>
                        <td className="text-sm text-red-600 px-6 py-4 whitespace-nowrap">
                          <button
                            className="rounded-lg bg-red-100 p-2"
                            onClick={() => del(movie)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="my-4">
        <Pagination page={curPage} goBack={goBack} goNext={goNext}/>
      </div> */}
    </div>
  );
}

export default Favourites;
