import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa"; // Added FaBars and FaTimes for the menu icon
import { AiFillDatabase } from "react-icons/ai";
import { SiProcesswire } from "react-icons/si";
import { AiFillPrinter } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      {/* Added icon button to toggle sidebar visibility */}
      <div className="menu-icon">
        <button className="btn btn-primary" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-white" />
          ) : (
            <FaBars className="text-white" />
          )}
        </button>
      </div>
      <nav className={`navbar sideBar ${isOpen ? "open" : ""}`}>
        <div className="text-start">
          <div className="col-md">
            <h4 className="text-dark text-center mb-4 fw-bold">Master Data</h4>
            <ul>
              <li className="mb-4">
                <Link className="sidebar text-dark" to="/">
                  <FaHome className="me-3 text-dark" />
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link className="sidebar text-dark" to={"/kriteria"}>
                  <AiFillDatabase className="me-3 text-dark" />
                  Data Kriteria
                </Link>
              </li>
              <li className="mb-4">
                <Link className="sidebar text-dark" to={"/penilaianAlternatif"}>
                  <AiFillDatabase className="me-3 text-dark" />
                  Data Sub Kriteria
                </Link>
              </li>

              <li className="mb-4">
                <Link className="sidebar text-dark" to={"/alternatif"}>
                  <AiFillDatabase className="me-3 text-dark" />
                  Data Alternatif
                </Link>
              </li>
              <li className="mb-4">
                <Link className="sidebar text-dark" to={"/proseshitung"}>
                  <SiProcesswire className="me-3 text-dark" />
                  Data Perhitungan
                </Link>
              </li>
              <li className="mb-4">
                <Link className="sidebar text-dark" to={"/hasilkeputusan"}>
                  <AiFillPrinter className="me-3 text-dark" />
                  Data Hasil Akhir
                </Link>
              </li>
              <li className="mb-4">
                <Link className="sidebar text-dark">
                  <LuUsers className="me-3 text-dark" />
                  Data User
                </Link>
              </li>
            </ul>
            <ul>
              <li className="mb-4">
                <button className="btn btn-primary" onClick={handleLogout}>
                  <CiLogout className="me-3 text-white" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
