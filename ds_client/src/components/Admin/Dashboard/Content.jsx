import React from "react";
// import ContentHeader from "./ContentHeader";
import "./content.css";
import Card from "./Card";

const Content = ({title}) => {
  return (
    <div className="content shadow-lg bg-gray-100">
      {/* <ContentHeader /> */}
      <Card title={title}/>
    </div>
  );
};

export default Content;
