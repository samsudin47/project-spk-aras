import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";

export default function GeneralNavbar() {
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg mt-3">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse me-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
            </ul>
            <Form className="d-flex" role="search">
              <InputGroup>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </InputGroup>
              <div className="icon-wrapper ms-5">
                <ion-icon
                  className="icon-class"
                  name="person-circle-outline"
                  size="large"
                ></ion-icon>
                <div className="tooltip-text">{userName}</div>
              </div>
            </Form>
          </div>
        </div>
      </nav>
    </>
  );
}
