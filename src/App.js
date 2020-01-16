import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api/hatchways";
import ResultsList from "./Results/ResultsList";
// import Search from "./Search/Search";
import "./App.css";

const App = () => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [resultsFound, setResultsFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/work_orders`);
        const json = await response.json();
        setResultsData(json.orders);
        setResultsFound(true);
      } catch (error) {
        setIsError(error.toString());
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
