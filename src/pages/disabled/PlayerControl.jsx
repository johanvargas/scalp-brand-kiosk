import React from "react";
import { useSnapshot } from "valtio";
import { userState } from "../state/userState.js";
import { userActions } from "../actions/userActions.js";

const UserControl = () => {
  const snap = useSnapshot(userState);

  function handleSubmitCreateuser(e) {
    e.preventDefault();
    userActions.setName(e.target.name.value);
    console.log("Tangeirs!");
  }

  return (
    <>
      <div className="bg-blue-400 p-2 rounded-lg m-2">
        <form onSubmit={handleSubmitCreateuser}>
          <legend>Create New user</legend>
          <fieldset>
            <label className="px-2" htmlFor="name">Enter Name</label>
            <input
              className="border-1 rounded-md p-2"
              value={snap.name}
              name="name"
              onChange={(e) => userActions.setName(e.target.value)}
              placeholder="enter name"
              id="name"
              autoComplete="on"
            />

            <label className="px-2" htmlFor="storeID">Enter Store Id</label>
            <input
              className="border-1 rounded-md p-2"
              value={snap.storeid}
              name="name"
              onChange={(e) => userActions.setStoreId(e.target.value)}
              placeholder="enter store id"
              id="storeID"
              autoComplete="on"
            />
            <br />
            <button>Submit New user</button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default UserControl;
