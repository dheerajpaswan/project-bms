import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NotFound from "./components/pages/NotFound";
import AddUpdateEntity from "./components/pages/AddUpdateEntity";
import Client from "./components/pages/Client";
import Invoice from "./components/pages/Invoice";
import Tax from "./components/pages/Tax";
import User from "./components/pages/User";
import Login from "./components/pages/Login";
import ExportPDF from "./components/pages/ExportPDF";

function App() {
  return (
    <>
      <>
        <Router>
          <Routes>
            <Route exact element={<Login />} path="/"></Route>
            <Route element={<Client appID="Client" />} path="/client"></Route>
            <Route
              element={<Invoice appID="Invoice" />}
              path="/invoice"
            ></Route>
            <Route element={<Tax appID="Tax" />} path="/tax"></Route>
            <Route element={<User appID="User" />} path="/user"></Route>
            <Route element={<AddUpdateEntity />} path="/AddUpdate"></Route>
            <Route element={<ExportPDF />} path="/exportPDF"></Route>
            <Route element={<NotFound />} path="/error"></Route>
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;
