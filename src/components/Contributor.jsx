import React, { useEffect, useState } from "react";
import axios from "axios";

const Contributor = () => {
  const [contributors, setContributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchResult, setSearchResult] = useState("");
  const [searchContributor,setSearchContributor] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/sourabhsikarwar/scene-movie-platform/contributors"
      )
      .then((response) => {
        setContributors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = contributors.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    const value = contributors.filter((item) => {
      return `${item.login.toLowerCase()}`.includes(searchResult.toLowerCase());
    });
    if(searchResult.length > 0){
      setSearchContributor(value);
    }else{
      setSearchContributor(contributors);
    }
  },[searchResult])

  return (
    <div className=" mt-20 contact-container">
      <div>
        <h2 className="text-3xl dark:text-white  font-bold text-center justify-center">
          Contributors
        </h2>
        <p className="text-center mt-5  text-lg lg:px-60">
        Thank you to all the contributors who have played an
          integral role in making Scene Movie App a success through their valuable
          contributions
        </p>
      </div>

      <div className=" flex justify-center mt-8">
      <input
          type="text"
          placeholder="Search Contributor"
          style={{color:"black"}}
          onChange={(e) => setSearchResult(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center p-6 gap-4 rounded-xl sm:p-12 dark:text-gray-100 ml-2">
        {(searchResult.length == 0 ?currentUsers:searchContributor).map((contributor) => {
          return (
            <div
              key={contributor.id}
              className="flex flex-col p-[30px] items-center space-y-4 text-center divide-y divide-gray-700 hover:shadow-lg transition-shadow hover:dark:text-violet-400"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
              />
              <div style={{ border: "none" }} className=" space-y-1">
                <h2 className="text-xl text-[#6058f2] font-semibold sm:text-2xl">
                  {contributor.login}
                </h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-400">{`Contributions: ${contributor.contributions}`}</p>
                <button
                  className=" mt-2 bg-blue-gradient  text-sm sm:text-base  text-black px-8 py-2 rounded-md shadow hover:bg-white duration-300"
                  onClick={() =>
                    window.open(`https://github.com/${contributor.login}`)
                  }
                >
                  Connect
                </button>
              </div>
            </div>
          );
        })}
        {contributors.length === 0 || (searchResult.length > 0 && searchContributor.length == 0 )&& <p>No contributors found.</p>}
      </div>
      <div className="pagination">
        {contributors.length > 0 && (
          <ul className="flex justify-center space-x-4 mt--10 mb-9">
            {Array.from(
              { length: Math.ceil(contributors.length / usersPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Contributor;
