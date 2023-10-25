import SideBar from "../../components/SideBar";
import Catalog from "../../components/Catalog";
import { useContext } from "react";
import { QueryConsum } from "../../context/GlobalContext";
import useSWR from "swr";
import { fetcher } from "../../fetch";
import { Errors, Loading, Modals } from "../../components";
import { login } from "../../assets";
import { format } from "../../fetch/format";

export default function Menu() {
  const [id] = useContext(QueryConsum);
  const { data, isLoading, error } = useSWR(
    `http://localhost:2000/api/product-categori?id=${id}`,
    fetcher
  );
  if (isLoading) return <Loading />;
  if (error) return <Errors />;
  return (
    <div className="container-fluid ">
      <div className="d-flex justify-content-start mt-5 ">
        <div className="">
          <SideBar />
        </div>
        <div className="d-flex justify-content-evenly flex-wrap gap-3 ms-4 ">
          {data &&
            data.map((e) => {
              return (
                <Catalog
                  key={e.id}
                  name={e.name}
                  desc={e.description}
                  price={format(e.price)}
                  img={e.image}
                  normal={(e.price * 10) / 100 + e.price}
                />
              );
            })}
        </div>
        <Modals
          id={"addChart"}
          title={"Silahkan login terlebih dahulu"}
          content={
            <div className="d-flex flex-column justify-content-center  align-items-center">
              <img src={login} alt="foto" style={{ width: "200px" }} />
              <button
                className="btn btn-success px-5 my-3"
                onClick={() => window.location.replace("/login")}
              >
                Login
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}
