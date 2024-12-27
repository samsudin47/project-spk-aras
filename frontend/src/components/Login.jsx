import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function Login() {
  // State variables for username, email, passwords and error message
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();

  // function to handle form submisson
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send login request to backend
      const response = await axios.post(
        "http://localhost:9000/api/cms/auth/login",
        {
          // email,
          name,
          password,
        }
      );

      // if login is successful, save the token and redirect
      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem("token", token);
        setLoading(false);
        if (localStorage.setItem("username", username)) {
          navigate("/login");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage("Your email or password is incorrect");
      setLoading(false);
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="layout-login">
        <div className="container ">
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
                    <h3 className="text-center judul text-dark">Sign In</h3>
                    <div className="mb-3">
                      <label htmlFor="inputUserName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="inputName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Username"
                      />
                      <label htmlFor="inputPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type={showPassword ? "password" : "text"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            <FaEye />
                          </>
                        ) : (
                          <>
                            <span>Hide Password </span>
                            <FaEyeSlash />
                          </>
                        )}
                      </span>
                      <br />
                      {loading ? (
                        <div className="text-center my-3">
                          <ClipLoader
                            size={50}
                            color="#36d7b7"
                            loading={loading}
                          />
                        </div>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Sign In
                        </button>
                      )}

                      <span className="d-flex justify-content-center p-2">
                        <Link to={"/register"} className="text-dark">
                          Belum punya akun?{" "}
                          <span className="text-danger">
                            Daftar terlebih dulu
                          </span>
                        </Link>
                      </span>
                      {errorMessage && (
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          {errorMessage}
                        </div>
                      )}
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
