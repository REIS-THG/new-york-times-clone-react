import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../context";
import SearchArticle from "../components/SearchArticle";
import style from "../style/page.module.css";

function SearchResults() {
  const { formatSection, searchedArticles, loaded, searchArticles } =
    useGlobalContext();
  const { query } = useParams();

  useEffect(() => {
    searchArticles(query);
  }, [query, searchArticles]);

  // Check if there are search results
  if (loaded && searchedArticles.length < 1) {
    return (
      <div className={style.container}>
        <span className={style.preTitle}>Showing results for:</span>
        <h2 className={style.title}>{formatSection(query)}</h2>
        <hr />
        <div className={style.container}>No search results found</div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <span className={style.preTitle}>Showing results for:</span>
      <h2 className={style.title}>{formatSection(query)}</h2>
      <hr />
      {loaded ? (
        <div className={style.container}>
          {searchedArticles.map((article, index) => {
            return <SearchArticle key={index} {...article} />;
          })}
        </div>
      ) : (
        <ClipLoader
          color={"#727272"}
          cssOverride={{ display: "block", margin: "80px auto" }}
          size={80}
          speedMultiplier={0.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}

export default SearchResults;
