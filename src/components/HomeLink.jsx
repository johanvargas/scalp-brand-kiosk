import React from "react";
import { Link } from "react-router";

const HomeLink = () => {
  return (
    <Link to="/" className="home-link-footer" viewTransition>
      Home
    </Link>
  );
};

export default HomeLink;
