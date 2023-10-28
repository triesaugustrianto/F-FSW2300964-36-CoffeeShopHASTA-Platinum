import React, { createContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetch";
import { Errors, Loading } from "../components";

export const QueryConsum = createContext();
export const SearchConsum = createContext();
export const ProductConsum = createContext();
export const OrderConsum = createContext();

export const GlobalContext = ({ children }) => {
  const [query, setQuery] = useState("all");
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useSWR(
    `http://app-citrapersada.net:2000/api/productss`,
    fetcher
  );
  const { data: order } = useSWR(
    `http://app-citrapersada.net:2000/api/transaksi-newOrder`,
    fetcher
  );

  if (isLoading) return <Loading />;
  if (error) return <Errors />;

  return (
    <QueryConsum.Provider value={[query, setQuery]}>
      <SearchConsum.Provider value={[search, setSearch]}>
        <ProductConsum.Provider value={[data]}>
          <OrderConsum.Provider value={[order]}>
            {children}
          </OrderConsum.Provider>
        </ProductConsum.Provider>
      </SearchConsum.Provider>
    </QueryConsum.Provider>
  );
};
