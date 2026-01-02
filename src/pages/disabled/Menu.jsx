import React from "react";
import { NavLink, Outlet } from "react-router";
import { proxy, useSnapshot } from "valtio";
//import { useQuery } from "@tanstack/react-query";

export default function Menu() {
  const state = proxy({
    msg: "Choose your preferred drink category",
    data: [],
  });

  const snap = useSnapshot(state);

  //  const { isPending, error, data, isFetching } = useQuery({
  //    queryKey: ["menu items"],
  //    queryFn: async () => {
  //      const response = await fetch("http://localhost:3001/api/coffee");
  //      return await response.json();
  //    },
  //  });

  //  if (isPending) return "Loading...";
  //  if (error) return "There was an error..."; //error.message;

  const Drink = () => {
    return (
      <>
        <div className="menu-container">
          <div className="menu-cards">
            <NavLink to="coffee" className="menu-card coffee-card">
              <div className="menu-icon">☕</div>
              <h3 className="menu-title">Coffee</h3>
              <p className="menu-description">
                Premium coffee blends and specialty drinks
              </p>
              <div className="menu-arrow">→</div>
            </NavLink>
            
            <NavLink to="drinkies" className="menu-card bar-card">
              <div className="menu-icon">🍸</div>
              <h3 className="menu-title">Bar</h3>
              <p className="menu-description">
                Craft cocktails and alcoholic beverages
              </p>
              <div className="menu-arrow">→</div>
            </NavLink>
          </div>
          
          <div className="menu-message">
            <p>{snap.msg}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="profile-container pt-20 min-h-screen">
        <div className="menu-header">
          <h1 className="home-title">Menu</h1>
          <h3 className="text-sm">Drink Selection</h3>
          <p className="menu-subtitle">
            Discover our premium coffee and craft cocktail selections
          </p>
        </div>
        <Drink />
      </div>
      <Outlet />
    </>
  );
}
