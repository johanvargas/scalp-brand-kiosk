import React from "react";
import { useQuery } from "@tanstack/react-query";
import { proxy } from "valtio";

export default function Database() {
  const state = proxy({
    menu: [],
  });

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/api/menu");
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "There was an error: " + error.message;

  state.menu = data;

  return (
    <>
      <h1>Database</h1>
      <h3>All menu</h3>
      <br />
      <div>{isFetching ? "Updating..." : ""}</div>
      {state.menu
        ? state.menu.map((item) => <p key={item.id}>{item.name} {item.storeId} {item.msg}</p>)
        : "Something went wrong when populating the list, hang tight!"}
      <br />
    </>
  );
}
