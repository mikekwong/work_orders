import React, { useState, useEffect } from "react";
import Result from "./Result";
import { BASE_URL } from "../api/hatchways";

const ResultsList = ({ setResults, results, resultsFound }) => {
  const [query, setQuery] = useState("");
  const [workerData, setWorkerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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
        const results = await Promise.all(
          urlIds.map(async url => {
            let response = await fetch(url);
            return response.json();
          })
        );
        isSubscribed &&
          setWorkerData(results.sort((a, b) => a.worker.id - b.worker.id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => (isSubscribed = false);
  }, []);

  function resultsList() {
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
        <button type="submit">Submit</button>
      </form>
      <h1>Results</h1>
      {resultsFound && !searchSubmitted && resultsList()}
    </>
  );
};

export default ResultsList;
