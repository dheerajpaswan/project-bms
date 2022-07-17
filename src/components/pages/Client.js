import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SideMenu from "../SideMenu.js";
import CRUDButtons from "../CRUDButtons.js";
import axios from "axios";
import { deleteUrlClient, getUrlClient } from "./APIUrl.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// let clientGlobal = [];
const ClientGlobal = () => {
  const [clientGlobal, setClientGlobal] = useState([]);
};

const Client = (props) => {
  const gridRef = useRef();
  const [client, setClient] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const columndefClient = [
    { headerName: "Name", field: "Name", dndSource: true },
    { headerName: "Address", field: "Address" },
    { headerName: "Contact No", field: "ContactNo" },
    { headerName: "Email", field: "Email" },
    { headerName: "GstNo", field: "GstNo" },
    { headerName: "DefaultTax", field: "DefaultTaxSID" },
    {
      headerName: "Archive",
      field: "Archive",
      cellRendererFramework: (params) => (
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
            onClick={() => deleteClient(params.data.SID)}
          >
            <DeleteIcon />
          </Link>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    autoHeight: true,
    scroll: true,
    filter: true,
    sortable: true,
    flex: 1,
    floatingFilter: true,
  };

  const loadClient = async function () {
    const result = await axios.get(getUrlClient);
    setClient(result.data.entity);
    //console.log(result.data.entity[0]);
  };

  const deleteClient = async (id) => {
    await axios.delete(`${deleteUrlClient}${id}`);
    loadClient();
  };

  //onselect property code
  // const onSelectionChanged = useCallback(() => {
  //   const selectedRow = gridRef.current.api.getSelectedRows();
  //   const SID = selectedRow[0].SID;
  //   //console.log(SID);
  // }, []);

  const onGridReady = (params) => {
    setGridApi(params);
  };

  useEffect(() => {
    loadClient();

    //to save the data on local broswer
    // const clientJSON = JSON.stringify(client);
    // localStorage.setItem("clients", clientJSON);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-2" style={{ height: "98vh" }}>
          <SideMenu active="client" />
        </div>
        <div className="col-10" style={{ height: "98vh" }}>
          <CRUDButtons appID="Client" />
          <div
            className="ag-theme-alpine"
            style={{ height: "85vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              // onSelectionChanged={onSelectionChanged}
              rowSelection="single"
              rowData={client}
              columnDefs={columndefClient}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
export { ClientGlobal };
