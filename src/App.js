import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api/hatchways";
import ResultsList from "./ResultsList/ResultsList";
import "./App.css";

const App = () => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/work_orders`);
        const json = await response.json();
        setResultsData(json.orders);
        setIsFetched(true);
      } catch (error) {
        setIsError(error.toString());
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container-app">
      <h1>Work order list</h1>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ResultsList
          setResults={setResultsData}
          results={resultsData}
          isFetched={isFetched}
        />
      )}
    </div>
  );
};

export default App;
