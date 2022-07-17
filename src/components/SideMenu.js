import React, { useEffect, useState } from "react";
import pic from "./BMSLOGO .png";

function SideMenu(props) {
  return (
    <div
      style={{ border: " 2px solid #0000", borderRadius: "25px" }}
      className="bg-dark"
    >
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark"
        style={{
          width: "300px",
          height: "100vh",
          border: " 2px solid #0000",
          borderRadius: "25px",
        }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <div
            style={{
              margin: "20px 0px 20px 45px",
              border: " 20px solid #ffff",
              borderRadius: "25px",
              backgroundColor: "#ffff",
            }}
          >
            <img style={{ width: "150px" }} src={pic}></img>
          </div>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item ">
            <h3>
              <a
                href="/client"
                className={
                  props.active === "client" ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Client
              </a>
            </h3>
          </li>
          <li>
            <h3>
              <a
                href="/invoice"
                className={
                  props.active === "invoice" ? "nav-link active" : "nav-link"
                }
              >
                Invoice
              </a>
            </h3>
          </li>
          <li>
            <h3>
              <a
                href="/tax"
                className={
                  props.active === "tax" ? "nav-link active" : "nav-link"
                }
              >
                Tax
              </a>
            </h3>
          </li>
          <li>
            <h3>
              <a
                href="/user"
                className={
                  props.active === "user" ? "nav-link active" : "nav-link"
                }
              >
                User
              </a>
            </h3>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <strong>User</strong>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
