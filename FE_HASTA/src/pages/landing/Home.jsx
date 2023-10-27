import { Outlet } from "react-router";
import { NavBar } from "../../components";

function Home() {
  return (
    <div className="container ">
      <div className="container position-fixed z-3 top-0">
        <NavBar />
      </div>
      <div className="position-relative bg-secondary" style={{ top: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
