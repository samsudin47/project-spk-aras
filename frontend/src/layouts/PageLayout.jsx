import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboards";

export default function PageLayout() {
  return (
    <>
      <div className="bg-white text-center">
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}
