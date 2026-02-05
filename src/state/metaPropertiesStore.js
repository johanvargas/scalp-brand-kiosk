import { proxy } from "valtio";

// collects the impression on each page
const metaPropertiesStore = proxy({
  home_impression: () => {
    console.log("home impression")
  },
  results_impression: null,
});

export default metaPropertiesStore;
