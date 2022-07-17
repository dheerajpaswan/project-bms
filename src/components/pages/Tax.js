import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SideMenu from "../SideMenu.js";
import CRUDButtons from "../CRUDButtons.js";
import axios from "axios";
import { deleteUrlTax, getUrlTax } from "./APIUrl.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Tax = (props) => {
  const gridRef = useRef();
  const [tax, setTax] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const columndefTax = [
    { headerName: "Description", field: "Description", dndSource: true },
    { headerName: "Tax1", field: "Tax1" },
    { headerName: "Tax2", field: "Tax2" },
    {
      headerName: "Archive",
      field: "Archive",
      cellRenderer: (params) => (
        <input
          type="checkbox"
          defaultChecked={params.data.Archive === 1 ? "checked" : ""}
        />
      ),
    },
    {
      headerName: "Actions",
      field: "SID",
      cellRendererFramework: (params) => (
        <div>
          <Link
            style={{ textDecoration: "none" }}
            to="/AddUpdate"
            state={{ entityfromGrid: params.data, appID: props.appID }}
            className="btn btn-primary"
          >
            <EditIcon />
          </Link>
          <span> </span>
          <Link
            to={`/${props.appID}`}
            className="btn btn-danger mr-2"
            onClick={() => deleteTax(params.data.SID)}
          >
            <DeleteIcon />
          </Link>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    autoHeight: true,
    filter: true,
    sortable: true,
    flex: 1,
    floatingFilter: true,
  };

  const loadTax = async function () {
    const result = await axios.get(getUrlTax);
    setTax(result.data.entity);
    //console.log(result.data.entity[0]);
  };

  const deleteTax = async (id) => {
    await axios.delete(`${deleteUrlTax}${id}`);
    loadTax();
  };

  // const onSelectionChanged = useCallback(() => {
  //   const selectedRow = gridRef.current.api.getSelectedRows();
  //   const SID = selectedRow[0].SID;
  //   //console.log(SID);
  // }, []);

  const onGridReady = (params) => {
    setGridApi(params);
  };

  useEffect(() => {
    loadTax();
    //to save the data on local broswer
    //   const taxJSON = JSON.stringify(tax);
    //   localStorage.setItem("taxs", taxJSON);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-2" style={{ height: "98vh" }}>
          <SideMenu active="tax" />
        </div>
        <div className="col-10" style={{ height: "98vh" }}>
          <CRUDButtons appID="Tax" />
          <div
            className="ag-theme-alpine"
            style={{ height: "85vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowSelection="single"
              rowData={tax}
              columnDefs={columndefTax}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tax;
