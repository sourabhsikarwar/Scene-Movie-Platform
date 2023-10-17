import React from "react";
import { useParams } from "react-router-dom";
import Movies from "../components/Movies";

const Categories = () => {
  const { id, title, content} = useParams();

  return (
    <div>
      <Movies id={id} title={title} content={content}/>
    </div>
  );
};

export default Categories;
