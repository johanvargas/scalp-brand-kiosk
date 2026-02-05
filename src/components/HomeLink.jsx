import React from "react";
import { Link } from "react-router";
import { metaPropertiesStore } from "../state/index.js";

const HomeLink = () => {
  const updateMetaProperty = () => {
    metaPropertiesStore.home_impression();
  };
  
  return (
    <Link to="/" className="home-link-footer" onClick={updateMetaProperty} viewTransition>
      Home
    </Link>
  );
};

export default HomeLink;
