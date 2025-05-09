"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/layout/Pagination";
import Category from "@/components/layout/Category";
import MoviesGrid from "@/components/layout/HomeMoviesGrid";
import { MoviesList } from "@/common/type";
import { getMoviesListByCategoryAndPage } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, currentSelect, setTotalPage, setHomePageCache, homePageCache } from "@/redux/features/displaySlice";


export default function Home() {
  const [moviesList, setMovieList] = useState<MoviesList | null>(null);
  const page: number = useSelector(currentPage);
  const select: string = useSelector(currentSelect);
  const pageCache = useSelector(homePageCache);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMovies() {
      let movies: MoviesList | null;
      if (pageCache.hasOwnProperty(`${select}_${page}`)) {
        movies = pageCache[`${select}_${page}`];
        setMovieList(movies);
        dispatch(setTotalPage(movies.total_pages));
      } else {
        movies = await getMoviesListByCategoryAndPage(page, select)
        if (movies) {
          dispatch(setHomePageCache(movies));
          setMovieList(movies);
          dispatch(setTotalPage(movies.total_pages));
        }
      }
    }
    fetchMovies();
  }, [dispatch, select, page, pageCache]);

  return (  
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", gap: "1rem" }}>
        <Pagination />
        <Category />
      </div >
      {moviesList ? <MoviesGrid moviesList={moviesList.results} /> : <div></div>}
      <Pagination />
    </>

  );
}
