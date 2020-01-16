import React, { useState, useEffect } from "react";
import Result from "./Result";
import { BASE_URL } from "../api/hatchways";
import "./ResultsList.css";

const ResultsList = ({ setResults, results, isFetched }) => {
  const [query, setQuery] = useState("");
  const [workerData, setWorkerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [workersFetched, setWorkersFetched] = useState(false);

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
    // Boolean to resolve memory leak for fetch state updates
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
          setWorkersFetched(true);
          setWorkerData(fetchResults.sort((a, b) => a.worker.id - b.worker.id));
        } else {
          return null;
        }
      } catch (error) {
        if (isSubscribed) {
          setWorkersFetched(false);
          setIsError(error.toString());
        } else {
          return null;
        }
      }
      setIsLoading(false);
    };
    fetchData();
    // Cancel subscriptions once component unmounts
    return () => (isSubscribed = false);
  }, [results]);

  function resultsList() {
    sortAscending
      ? results.sort((a, b) => a.deadline - b.deadline)
      : results.sort((a, b) => b.deadline - a.deadline);

    if (query.length > 3) {
      const foundWorker = workerData.filter(worker =>
        worker.worker.name.toLowerCase().includes(query.toLowerCase())
      );
      if (foundWorker.length) {
        return results
          .filter(result => result.workerId === foundWorker[0].worker.id)
          .map(match => (
            <Result
              key={match.id}
              result={match}
              worker={workerData[match.workerId]}
            />
          ));
      } else {
        return <p>No matches found...</p>;
      }
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
    <div className="container-results">
      <form>
        <input
          id="name-input"
          placeholder="Filter by worker name..."
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="toggle">
          <p>Earliest first</p>
          <input
            type="checkbox"
            id="deadline-input"
            onClick={() => setSortAscending(!sortAscending)}
          />
          <label htmlFor="deadline-input">Toggle</label>
          <p>Latest first</p>
        </div>
      </form>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        isFetched && workersFetched && resultsList()
      )}
    </div>
  );
};

export default ResultsList;
