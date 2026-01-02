import React from "react";
import { Link, Outlet } from "react-router";
import { proxy, useSnapshot } from "valtio";
import { useQuery } from "@tanstack/react-query";

export default function Coffee() {
  const state = proxy({
    msg: "Menu Item ",
    data: [],
  });

  const snap = useSnapshot(state);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["menu items"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/api/coffee");
      return await response.json();
    },
  });

  if (isPending) return "Loading...";
  if (error) return "There was an error..."; //error.message;

  const Drink = () => {
    return (
      <>
        <div className="menu-scroll-container h-[70vh] max-h-[600px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-100 rounded-lg border border-gray-200 bg-white"
             style={{
               WebkitOverflowScrolling: 'touch',
               scrollBehavior: 'smooth',
               overscrollBehavior: 'contain',
               touchAction: 'pan-y'
             }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {data.map(item => (
              <Link 
                key={item.id} 
                to={`/coffee/${item.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <div className="text-6xl">☕</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-slate-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-slate-600 font-medium text-sm">
                        View Details →
                      </span>
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-md">
            <small>Snapshot</small>
          </button>
        </div>
        <div className="text-center mt-4 text-gray-600">
          {snap.msg}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container px-2 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 home-title">Coffee Menu</h1>
          <p className="text-gray-600 text-lg">Discover our selection of premium coffee drinks</p>
        </div>
        <Drink />
      </div>
      <Outlet />
    </div>
  );
}
