import React, { createContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetch";
import { Errors, Loading } from "../components";

export const QueryConsum = createContext();
export const SearchConsum = createContext();
export const ProductConsum = createContext();

export const GlobalContext = ({ children }) => {
  const [query, setQuery] = useState("all");
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/productss`,
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  return (
    <QueryConsum.Provider value={[query, setQuery]}>
      <SearchConsum.Provider value={[search, setSearch]}>
        <ProductConsum.Provider value={[data]}>
          {children}
        </ProductConsum.Provider>
      </SearchConsum.Provider>
    </QueryConsum.Provider>
  );
};
