import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api/hatchways";
import ResultsList from "./Results/ResultsList";
import Search from "./Search/Search";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [sortFilter, setSortFilter] = useState("name");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [url, setUrl] = useState(BASE_URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}/work_orders`);
        const json = await response.json();

        setData(json.orders);
        setResultsFound(true);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const onSearchSubmit = async nameQuery => {
  //     setIsError(false);
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`${BASE_URL}/${nameQuery}`);
  //       const json = await response.json();

  //       setData(json);
  //       data.results.length ? setResultsFound(true) : setResultsFound(false);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   };
  //   onSearchSubmit();
  // }, [BASE_URL]);

  const onFilterChange = () => {};

  return (
    <div>
      <h1>Find a worker</h1>
      {/* <Search
        onSubmit={onSearchSubmit}
        onFilterChange={onFilterChange}
        sortFilter={sortFilter}
      /> */}

      <ResultsList results={data} resultsFound={resultsFound} />
    </div>
  );
};

export default App;
