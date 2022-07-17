import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SideMenu from "../SideMenu.js";
import CRUDButtons from "../CRUDButtons.js";
import axios from "axios";
import { deleteUrlUser, getUrlUser } from "./APIUrl.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const User = (props) => {
  const gridRef = useRef();
  const [users, setUser] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const columndefUser = [
    { headerName: "Name", field: "Name", dndSource: true },
    { headerName: "UserName", field: "UserName" },
    // { headerName: "Password", field: "Password" },
    { headerName: "Email", field: "Email" },
    { headerName: "Contact No", field: "ContactNo" },
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
            onClick={() => deleteUser(params.data.SID)}
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

  const loadUsers = async function () {
    const result = await axios.get(getUrlUser);
    setUser(result.data.entity);
    // console.log(result.data.entity);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${deleteUrlUser}${id}`);
    loadUsers();
  };

  //on selection POC code

  //   const onSelectionChanged = useCallback(() => {
  //     const selectedRow = gridRef.current.api.getSelectedRows();
  //     const SID = selectedRow[0].SID;
  //     //console.log(SID);
  //   }, []);

  const onGridReady = (params) => {
    setGridApi(params);
  };

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-2" style={{ height: "98vh" }}>
          <SideMenu active="user" />
        </div>
        <div className="col-10" style={{ height: "98vh" }}>
          <CRUDButtons appID="User" />
          <div
            className="ag-theme-alpine"
            style={{ height: "85vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowSelection="single"
              rowData={users}
              columnDefs={columndefUser}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
