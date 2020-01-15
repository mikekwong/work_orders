import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api/hatchways";
import ResultsList from "./Results/ResultsList";
// import Search from "./Search/Search";
import "./App.css";

const App = () => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [sortFilter, setSortFilter] = useState("name");
  // const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [url, setUrl] = useState(`${BASE_URL}/work_orders`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setResultsData(json.orders);
        setResultsFound(true);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onFilterChange = () => {};

  return (
    <div>
      <h1>Work order list</h1>

      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ResultsList
          setResults={setResultsData}
          results={resultsData}
          resultsFound={resultsFound}
        />
      )}
    </div>
  );
};

export default App;
