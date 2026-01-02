import { userState } from '../state/userState';

// user actions
export const userActions = {
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
};
