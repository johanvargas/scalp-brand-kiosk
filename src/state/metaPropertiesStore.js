import { proxy } from "valtio";

async function getData(urlFetch) {
  const url =   urlFetch
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// collects the impression on each page
const metaPropertiesStore = proxy({
  session_start: Date.now(),  // just to have a 'imprint' an id at the very least
  duration: 0, 
  bounce_count: 0, // number of 'walk-aways'; people that didn't complete the sequence
  home_impression: () => { // when the home button is pressed
    console.log("home impression posted");
    const url = "http://localhost:8877"; // web server for meta properties db (sqlite3) 
    getData(url)
  },
  start_impression: () => { // when the home button is pressed
    
    console.log("start impression posted");
  },
  results_impression: () => {
    console.log("results impression posted");
  },
});

export default metaPropertiesStore;
