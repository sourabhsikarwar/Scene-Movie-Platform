import React from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";

const Search = () => {

  const { query } = useParams();

  return (
    <div>
      <Movies query={query} title="search"/>
    </div>
  );
};

export default Search;
