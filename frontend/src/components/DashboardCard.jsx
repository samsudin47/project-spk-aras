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
      <div className="container text-start pe-5 mt-2 grid gap-3">
        {userName ? (
          <span>
            <p className="lead text-start">
              Selamat datang <span className="fw-bold">{userName}</span> Anda
              bisa mengoperasikan sistem dengan wewenang tertentu melalui
              pilihan menu dibawah ini.
            </p>
          </span>
        ) : (
          <span> </span>
        )}
        <div className="row align-items-around mt-2">
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data Kriteria</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="server-sharp" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"/kriteria"}>
                    <button className="btn btn-primary">Lihat Data</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data Sub Kriteria</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="server-sharp" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"/penilaianAlternatif"}>
                    <button className="btn btn-primary">Lihat Data</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data Alternatif</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="server-sharp" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"/alternatif"}>
                    <button className="btn btn-primary">Lihat Data</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center mt-2">
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data User</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="people-outline" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"."}>
                    <button className="btn btn-primary">Lihat Data</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data Perhitungan</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="calculator-outline" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"/prosesHitung"}>
                    <button className="btn btn-primary">Lihat Data</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md p-2 g-col-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-8">
                    <h5 className="card-title">Data Hasil Akhir</h5>
                  </div>
                  <div className="col-4">
                    <ion-icon name="print-sharp" size="large"></ion-icon>
                  </div>
                </div>
                <div>
                  <Link to={"/hasilkeputusan"}>
                    <button className="btn btn-primary">Lihat Data</button>
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
