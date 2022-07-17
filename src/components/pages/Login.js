import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../BMSLOGO .png";
import { getUrlClient, getUrlLogin, getUrlTax } from "./APIUrl";
import "./Login.css";
function Login() {
  const [login, setLogin] = useState(false);
  const [clients, setClients] = useState([]);
  const [taxs, setTaxs] = useState([]);
  const [value, setValue] = useState({});
  let navigate = useNavigate();

  const loadClient = async function () {
    const result = await axios.get(getUrlClient);
    setClients(result.data.entity);
  };

  const loadTax = async function () {
    const result = await axios.get(getUrlTax);
    setTaxs(result.data.entity);
    //console.log(result.data.entity[0]);
  };

  const handleLogin = async function () {
    await axios
      .get(`${getUrlLogin}${value.username},${value.password}`)
      .then((res) => {
        if (res.data.entity.length > 0) {
          // loading and setting the client in local storage

          navigate("/client");
          setLogin(true);
          console.log(login);
        } else {
          alert("Invalid credentials");
          console.log(res.data.message);
        }
      });
  };

  useEffect(() => {
    loadClient();
    loadTax();
    const clientJSON = JSON.stringify(clients);
    localStorage.setItem("clients", clientJSON);
    const taxJSON = JSON.stringify(taxs);
    localStorage.setItem("taxs", taxJSON);
  }, [clients, taxs]);

  const onInputChange = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                style={{ padding: "100px" }}
                src={pic}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="string"
                    id="username"
                    className="form-control form-control-lg"
                    placeholder="Enter username"
                    onChange={(e) => onInputChange(e)}
                  />
                  <label className="form-label">Username</label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={(e) => onInputChange(e)}
                  />
                  <label className="form-label">Password</label>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                  <div className="form-check mb-0"></div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
          style={{ backgroundColor: "red" }}
        >
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2022. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
