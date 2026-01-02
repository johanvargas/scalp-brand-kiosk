import { dbState } from "../state/dbState";

// user actions
export const dbActions = {
  changeMSG: () => {
    userState.msg = "user state updated";
  },
  setName: (n) => {
    userState.name = n;
  },
  setStoreId: (n) => {
    console.log("store id set: ", userState.storeId);
    userState.storeId = n;
  },
  updateDbExists: () => {
    !dbState.dbExists;
  },
  healthCheck: async () => {
    const url = "http://localhost:3001/api/health";

    try {
      let response = await fetch(url);
      console.log(response);
      if (response.status != "200") {
        throw new Error(`Response status: ${response.status}`);
      }

      dbState.dbExists = true;

      return response.status;
    } catch (error) {
      console.error("fetch error: ", error.message);
    }
  },
};
