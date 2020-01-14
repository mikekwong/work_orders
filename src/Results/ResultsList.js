import React from "react";
import Result from "./Result";

const ResultsList = ({ results, resultsFound }) => {
  const resultsList = results.map(result => (
    <Result key={result.id} result={result} />
  ));

  const notFound = <p>Not Found.</p>;

  return (
    <>
      <h1>Results</h1>
      {resultsFound ? resultsList : notFound}
    </>
  );
};

export default ResultsList;
