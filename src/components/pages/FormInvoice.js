import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";

const FromInvoice = (props) => {
  const url =
    "https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/";
  const [entity, setEntity] = useState({});
  let invoiceDetailList = [];
  const [gridApi, setGridApi] = useState(null);
  const [invoiceDetail, setInvoiceDetail] = useState({});

  // const loadInvoiceDetail = async function () {
  //   const resultInvoiceDetail = await axios.get(
  //     `${url}GetDataV3?entityTypeName=InvoiceDetail`
  //   );
  //   setInvoiceDetail(resultInvoiceDetail.data.entity);
  // };

  const deleteInvoiceDetail = function (index) {
    invoiceDetailList.splice(index - 1, 1);
    // loadInvoiceDetail();
  };

  const columndefInvoiceDetail = [
    { headerName: "SID", field: "SID", dndSource: true },
    { headerName: "Description", field: "Description" },
    { headerName: "Quantity", field: "Quantity" },
    { headerName: "UnitPrice", field: "UnitPrice" },
    {
      headerName: "Actions",
      field: "SID",
      cellRendererFramework: (params) => (
        <div>
          <Link
            className="btn btn-danger mr-2"
            onClick={() => deleteInvoiceDetail(params.data.SID)}
          >
            Delete
          </Link>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    filter: true,
    sortable: true,
    floatingFilter: true,
  };

  const onInputChange = (e) => {
    setInvoiceDetail({ ...invoiceDetail, [e.target.id]: e.target.value });
  };
  const onGridReady = (params) => {
    setGridApi(params);
  };
  useEffect(() => {
    //loadInvoiceDetail();
  }, []);
  const onAdd = function () {
    if (invoiceDetail) {
      invoiceDetailList.push(invoiceDetail);
    }
    console.log(invoiceDetailList);

    var table = document.getElementById("table_logic");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
  };

  //   <AgGridReact
  //   rowSelection="single"
  //   rowData={invoiceDetailList}
  //   columnDefs={columndefInvoiceDetail}
  //   defaultColDef={defaultColDef}
  //   onGridReady={onGridReady}
  // />
  return (
    <div style={{ margin: "100px 80px 30px 80px" }}>
      {/* add item container */}
      <div>
        <div className="row clearfix">
          <div className="col-md-12">
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  <th className="text-center"> Description </th>
                  <th className="text-center"> Quantity </th>
                  <th className="text-center"> Price </th>
                </tr>
              </thead>
              <tbody>
                <tr id="addr0">
                  <td>
                    <input
                      type="text"
                      id="Description"
                      className="form-control"
                      value={invoiceDetail.Description}
                      onChange={(e) => onInputChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      id="Quantity"
                      className="form-control qty"
                      value={invoiceDetail.Quantity}
                      onChange={(e) => onInputChange(e)}
                      step={0}
                      min={0}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      id="UnitPrice"
                      value={invoiceDetail.UnitPrice}
                      onChange={(e) => onInputChange(e)}
                      className="form-control price"
                      step={0.0}
                      min={0}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-md-12">
            <button
              id="add_row"
              className="btn btn-primary pull-left"
              onClick={onAdd}
            >
              Add Row
            </button>
          </div>
        </div>

        <div className="row clearfix" style={{ marginTop: 20 }}>
          <div className="pull-right col-md-4">
            <table
              className="table table-bordered table-hover align-left"
              id="tab_logic_total"
            >
              <tbody>
                <tr>
                  <th className="text-center">Sub Total</th>
                  <td className="text-center">
                    <input
                      type="number"
                      name="sub_total"
                      className="form-control"
                      id="sub_total"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th className="text-center">Tax</th>
                  <td className="text-center">
                    <div className="input-group mb-2 mb-sm-0">
                      <input type="number" className="form-control" id="tax" />
                      <div className="input-group-addon">%</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="text-center">Tax Amount</th>
                  <td className="text-center">
                    <input
                      type="number"
                      name="tax_amount"
                      id="tax_amount"
                      className="form-control"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th className="text-center">Grand Total</th>
                  <td className="text-center">
                    <input
                      type="number"
                      name="total_amount"
                      id="total_amount"
                      className="form-control"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromInvoice;
