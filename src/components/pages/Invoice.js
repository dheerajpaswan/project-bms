import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SideMenu from "../SideMenu.js";
import CRUDButtons from "../CRUDButtons.js";
import axios from "axios";
import ExportPDF from "./ExportPDF.js";
import { deleteUrlInvoice, getUrlClient, getUrlInvoice } from "./APIUrl.js";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Invoice = (props) => {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [taxs, setTaxs] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const columndefInvoice = [
    { headerName: "Client Name", field: "ClientName", dndSource: true },
    // { headerName: "Client Name", field: "ClientSID" }, //client sid column
    // { headerName: "ClientSID", field: "ClientSID" },
    { headerName: "Invoice No", field: "InvoiceNo" },
    { headerName: "SAC Code", field: "SACCode" },
    { headerName: "ContractReference", field: "ContractReference" },
    { headerName: "InvoiceDate", field: "InvoiceDate" },
    // { headerName: "TaxSID", field: "TaxSID" },
    { headerName: "Tax", field: "Tax" },
    { headerName: "DiscountAmount", field: "DiscountAmount" },
    { headerName: "RoundOffAmount", field: "RoundOffAmount" },
    { headerName: "GrossAmount", field: "GrossAmount" },
    { headerName: "NetAmount", field: "NetAmount" },
    { headerName: "AmountInWords", field: "AmountInWords" },
    { headerName: "StatusSID", field: "StatusSID" },
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
            className="btn btn-danger"
            onClick={() => deleteInvoice(params.data.SID)}
          >
            <DeleteIcon />
          </Link>
          <span> </span>
          <Link
            to={`/exportPDF`}
            className="btn btn-success"
            state={{
              entityfromGrid: params.data,
              appID: props.appID,
            }}
            onClick={() => handlePrint(params.data.SID)}
          >
            <PrintIcon />
          </Link>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    autoHeight: true,
    resizable: true,
    filter: true,
    sortable: true,
    floatingFilter: true,
  };

  useEffect(() => {
    loadInvoices();

    //to save invoice data locally
    // const invoiceJSON = JSON.stringify(invoices);
    // localStorage.setItem("invoices", invoiceJSON);

    //to load the data from local broswer
    const clientJSON = localStorage.getItem("clients");
    const taxJSON = localStorage.getItem("taxs");
    const localClients = JSON.parse(clientJSON);
    if (localClients) {
      setClients(localClients);
    }
    const localTaxs = JSON.parse(taxJSON);
    if (localTaxs) {
      setTaxs(localTaxs);
    }
  }, []);

  //showing the value of client name and tax description on basis of invoice table clientSID and taxSID
  invoices.map(function (obj, index) {
    clients.map((clientObj, index) =>
      obj.ClientSID === clientObj.SID ? (obj.ClientName = clientObj.Name) : ""
    );
    taxs.map((taxObj, index) =>
      obj.TaxSID === taxObj.SID ? (obj.Tax = taxObj.Description) : ""
    );
  });

  //Exporting PDF
  const handlePrint = function (id) {
    invoices.map((item, index) =>
      item.SID === id ? <ExportPDF invoice={item} /> : console.log("Error")
    );
  };

  const loadInvoices = async function () {
    const result = await axios.get(getUrlInvoice);
    setInvoices(result.data.entity);
  };

  const deleteInvoice = async (id) => {
    await axios.delete(`${deleteUrlInvoice}${id}`);
    loadInvoices();
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRow = gridRef.current.api.getSelectedRows();
    const SID = selectedRow[0].SID;
    //console.log(SID);
  }, []);

  const onGridReady = (params) => {
    setGridApi(params);
  };

  return (
    <>
      <div className="row">
        <div className="col-2" style={{ height: "98vh" }}>
          <SideMenu active="invoice" />
        </div>
        <div className="col-10" style={{ height: "98vh" }}>
          <CRUDButtons appID="Invoice" />
          <div
            className="ag-theme-alpine"
            style={{ height: "85vh", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              onSelectionChanged={onSelectionChanged}
              rowSelection="single"
              rowData={invoices}
              columnDefs={columndefInvoice}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
