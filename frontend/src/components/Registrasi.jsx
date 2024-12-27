import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function Registrasi() {
  // State variables for username, email, passwords and error message
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // state untuk loading
  const [showPassword, setShowPassword] = useState("true");

  // function to handle form submisson
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true saat disubmit
    axios
      .post("http://localhost:9000/api/cms/auth/register", values)
      .then((res) => {
        console.log("Registrasi berhasil :", res.data);
        setLoading(false); // matikan loading setelah response diterima
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error("Registrasi gagal:", err.response?.data || err.message);
        setLoading(false); // matikan loading jika ada error
      });
  };

  return (
    <>
      <div className="layout-regis">
        <div className="container">
          <div className="pt-5 ">
            <h2 className="text-center judul text-dark">
              PENERAPAN METODE ADDITIVE RATIO ASSESSMENT (ARAS)
            </h2>
            <h3 className="text-center judul text-dark">
              DALAM SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN KONTEN YOUTUBE LAYAK
              TONTON UNTUK ANAK-ANAK STUDI KASUS: TK PERTIWI KARANGTALUN
            </h3>
            <div className="mt-4">
              <div className="row justify-content-center mb-5">
                <div className="d-flex justify-content-center w-50">
                  <form
                    onSubmit={handleSubmit}
                    className="w-75 p-3 m-3 shadow rounded-3 bg-light"
                  >
                    <h3 className="text-center judul text-dark">Daftar</h3>
                    <div className="">
                      <label htmlFor="inputUserName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="inputUsername"
                        onChange={(e) =>
                          setValues({ ...values, name: e.target.value })
                        }
                        className="form-control"
                        placeholder="Username"
                      />
                      <label htmlFor="inputEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="inputEmail"
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        className="form-control"
                        placeholder="Email"
                      />
                      <label htmlFor="inputPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type={showPassword ? "password" : "text"}
                        id="password"
                        name="Password"
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        className="form-control"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                      <span
                        type="button"
                        className="text-black dark:text-white py-2"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <>
                            <span>Show Password </span>
                            <FaEyeSlash />
                          </>
                        ) : (
                          <>
                            <span>Hide Password </span>
                            <FaEye />
                          </>
                        )}
                      </span>
                      <br />
                      {loading ? (
                        <div className="text-center spinner my-3">
                          <ClipLoader size={50} color="#36d7b7" />
                        </div>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      )}
                      <br />
                      <span className="d-flex justify-content-center p-2">
                        <Link to={"/login"} className="text-dark">
                          Sudah punya akun?{" "}
                          <span className="text-danger">Silahkan masuk</span>
                        </Link>
                      </span>
                      <br />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}