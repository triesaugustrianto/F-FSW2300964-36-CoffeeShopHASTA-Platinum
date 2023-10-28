import useSWR from "swr";
import { fetcher } from "../fetch";
import { Errors } from "./Errors";
import { Loading } from "./Loading";
import { useContext } from "react";
import { QueryConsum } from "../context/GlobalContext";

const SideBar = () => {
  const [query, setQuery] = useContext(QueryConsum);
  const { data, isLoading, error } = useSWR(
    `http://app-citrapersada.net:2000/api/product-group?categori=Coffe`,
    fetcher
  );
  const { data: tea } = useSWR(
    `http://app-citrapersada.net:2000/api/product-group?categori=Tea`,
    fetcher
  );
  const { data: blend } = useSWR(
    `http://app-citrapersada.net:2000/api/product-group?categori=Blended`,
    fetcher
  );
  const { data: other } = useSWR(
    `http://app-citrapersada.net:2000/api/product-group?categori=Others`,
    fetcher
  );
  if (error) return <Errors />;
  if (isLoading) return <Loading />;

  return (
    <div className="container-fluid" style={{ width: "250px" }}>
      <div className="container  ">
        <ul className="nav flex-column">
          <h5
            className="fw-bold opacity-75"
            onClick={() => setQuery("all")}
            style={{ cursor: "pointer" }}
          >
            All
          </h5>
          <h5 className="fw-bold opacity-75">Blend</h5>
          {blend &&
            blend.map((b) => {
              return (
                <li className="nav-item" key={b.id}>
                  <button className="btn" onClick={() => setQuery(b.id)}>
                    {b.name}
                  </button>
                </li>
              );
            })}
          <h5 className="fw-bold opacity-75">Coffe</h5>
          {data &&
            data.map((e) => {
              return (
                <li className="nav-item" key={e.id}>
                  <button className="btn" onClick={() => setQuery(e.id)}>
                    <span className="">{e.name}</span>
                  </button>
                </li>
              );
            })}
          <h5 className="fw-bold opacity-75">Tea</h5>
          {tea &&
            tea.map((t) => {
              return (
                <li className="nav-item" key={t.id}>
                  <button className="btn" onClick={() => setQuery(t.id)}>
                    <span className="">{t.name}</span>
                  </button>
                </li>
              );
            })}
          <h5 className="fw-bold opacity-75">Others</h5>
          {other &&
            other.map((o) => {
              return (
                <li className="nav-item" key={o.id}>
                  <button className="btn" onClick={() => setQuery(o.id)}>
                    <span className="">{o.name}</span>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
