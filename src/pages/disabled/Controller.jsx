import React, { useEffect } from "react";
import { useLoaderData, Await } from "react-router";
import { useSnapshot } from "valtio";
import { userState } from "../state/userState.js";
import { dbState } from "../state/dbState.js";
import { userActions } from "../actions/userActions.js";

const Controller = () => {
  let { data } = useLoaderData();
  // this should be in store?? with an update action?
  const snap = useSnapshot(userState);

  const Loading = () => {
    return <p> Loading...</p>;
  };

  function ClientComponent(snap) {
    return snap ? snap : "no data available";
  }

  const Health = () => {
    const check = useSnapshot(dbState);
    return <>
      <div>{"http response status: "}{String(check.isConnected)}</div>
      <div>{"does the db exist: "}{String(check.dbExists)}</div>
      </>
  }

  function Data({ data }) {
    // data is already resolved here due to Await wrapper
    return (
      <div className="data-list">
        {data.map((user) => (
          <div key={user.id} className="data-item">
            <div className="data-item-content">
              <span className="data-name">{user.name}</span>
              <span className="data-username">@{user.username}</span>
              <span className="data-date">
                {new Date(user.dateCreated).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="profile-container pt-20 min-h-screen">
        <Health />
        <h1 className="home-title">Profile</h1>
        <h3 className="text-sm">Dashboard</h3>
        <div className="controller-container">
          <div className="user-info-card">
            <h3>User Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{ClientComponent(snap.id)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">State:</span>
                <span className="info-value">{ClientComponent(snap.msg)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{ClientComponent(snap.name)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Store ID:</span>
                <span className="info-value">
                  {ClientComponent(snap.storeId)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">User:</span>
                <span className="info-value">{ClientComponent(snap.user)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Game Status:</span>
                <span className="info-value">
                  {ClientComponent(snap.gameIsSet)}
                </span>
              </div>
            </div>
          </div>

          <div className="data-card">
            <h3>Data Management</h3>
            <div className="data-content">
              <React.Suspense fallback={<Loading />}>
                <Await
                  resolve={data}
                  errorElement={
                    <div className="error-message">Could not load data 😬</div>
                  }
                  children={(resolvedData) => <Data data={resolvedData} />}
                />
              </React.Suspense>
            </div>
            <div className="button-container">
              <button onClick={userActions.changeMSG} className="action-button">
                Change User State Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controller;
