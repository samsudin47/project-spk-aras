// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardCard() {
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }
  }, []);
  return (
    <>
      <div className="container text-start pe-5 mt-5 grid gap-3">
        {userName ? (
          <span>
            {" "}
            <p className="lead text-start">
              Selamat datang <span className="fw-bold">{userName}</span> Anda
              bisa mengoperasikan sistem dengan wewenang tertentu melalui
              pilihan menu dibawah ini.
            </p>
          </span>
        ) : (
          <span> </span>
        )}
        <div className="row align-items-center mt-5">
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <h5 className="card-title">Dashboard</h5>
                <ion-icon name="home" size="large"></ion-icon>
                <div>
                  <Link>
                    <a href="#" className="card-link text-dark">
                      Lihat Data
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <h5 className="card-title">Data Hasil Akhir</h5>
                <ion-icon name="server-sharp" size="large"></ion-icon>
                <div>
                  <Link>
                    <a href="#" className="card-link text-dark">
                      Lihat Data
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <h5 className="card-title">Data Users</h5>
                <ion-icon name="print-sharp" size="large"></ion-icon>
                <div>
                  <Link>
                    <a href="#" className="card-link text-dark">
                      Lihat Data
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
