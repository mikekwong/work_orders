import React, { useState, useEffect } from "react";
import Result from "./Result";
import { BASE_URL } from "../api/hatchways";
import "./ResultsList.css";

const ResultsList = ({ setResults, results, resultsFound }) => {
  const [query, setQuery] = useState("");
  const [workerData, setWorkerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  // const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const notFound = <p>Not Found.</p>;

  useEffect(() => {
    const lookup = {};
    const urlIds = [];
    for (let i = 0; i < results.length; i++) {
      let id = results[i].workerId;
      if (!lookup[id]) {
        lookup[id] = 1;
        urlIds.push(`${BASE_URL}/workers/${id}`);
      }
    }
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchResults = await Promise.all(
          urlIds.map(async url => {
            let response = await fetch(url);
            return response.json();
          })
        );
        if (isSubscribed) {
          setWorkerData(fetchResults.sort((a, b) => a.worker.id - b.worker.id));
        } else {
          return null;
        }
      } catch (error) {
        if (isSubscribed) {
          setIsError(error.toString());
        } else {
          return null;
        }
      }
      setIsLoading(false);
    };
    fetchData();
    return () => (isSubscribed = false);
  }, []);

  function resultsList() {
    sortAscending
      ? results.sort((a, b) => a.deadline - b.deadline)
      : results.sort((a, b) => b.deadline - a.deadline);

    if (query.length > 3) {
      return workerData.map(worker => {
        if (worker.worker.name.toLowerCase().includes(query.toLowerCase())) {
          return results.map(result => {
            if (result.workerId === worker.worker.id) {
              return (
                <Result
                  key={result.id}
                  result={result}
                  worker={workerData[worker.worker.id]}
                />
              );
            }
          });
        }
      });
    } else {
      return results.map(result => (
        <Result
          key={result.id}
          result={result}
          worker={workerData[result.workerId]}
        />
      ));
    }
  }

  return (
    <>
      <form>
        <input
          placeholder="Filter by worker name..."
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <input
          type="checkbox"
          id="switch"
          onClick={() => setSortAscending(!sortAscending)}
        />
        <label htmlFor="switch">Toggle</label>
      </form>
      <h1>Results</h1>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? <div>Loading...</div> : resultsFound && resultsList()}
    </>
  );
};

export default ResultsList;
