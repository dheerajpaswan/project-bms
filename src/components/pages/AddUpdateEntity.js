import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";
import axios from "axios";
import "./AddUpdateEntity.css";
import SideMenu from "../SideMenu";
import {
  getUrlClient,
  getUrlInvoiceDetail,
  getUrlTax,
  postUrl,
} from "./APIUrl";

//onload
//TOD: u need to fill entity

const AddUpdateEntity = (props) => {
  const navigate = useNavigate();
  const [entity, setEntity] = useState({});
  const [tax, setTax] = useState([]);
  const [client, setClient] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const location = useLocation();
  const { entityfromGrid, appID } = location.state;
  useEffect(() => {
    // Update the document title using the browser API
    console.log("I am loaded");

    if (entityfromGrid != undefined) {
      setEntity(entityfromGrid);
    }

    console.log(entityfromGrid);
    loadTax();
    loadClient();
    loadInvoiceDetail();
  }, []);

  const onInputChange = (e) => {
    e.preventDefault();
    setEntity({ ...entity, [e.target.id]: e.target.value });

    console.log(entity);

    //htmlFor nested property update
    // setUser((pre) => ({
    //   ...pre,
    //   entity: { ...pre.entity, [e.target.id]: e.target.value },
    // }));
  };

  // fetching tax data from API
  const loadTax = async function () {
    const resultTax = await axios.get(getUrlTax);
    setTax(resultTax.data.entity);
    // console.log(resultTax.data.entity);
  };

  //fetching client data from API
  const loadClient = async function () {
    const resultClient = await axios.get(getUrlClient);
    setClient(resultClient.data.entity);
    // console.log(resultClient.data.entity);
  };

  //fetching invoice detail data from API
  const loadInvoiceDetail = async function () {
    const resultInvoiceDetail = await axios.get(
      `${getUrlInvoiceDetail}&conditions=InvoiceSID=?&values=${entityfromGrid.SID}`
    );
    setInvoiceDetails(resultInvoiceDetail.data.entity);
    console.log(resultInvoiceDetail.data.entity);
  };

  const onSubmitInvoiceDetails = (invoiceDetails) => {
    setInvoiceDetails(invoiceDetails);
  };

  const onSubmit = async function (e) {
    e.preventDefault();

    console.log(entity);

    var data = {
      apiID: appID,
      SID: entity.SID ?? 0,
      entity: entity,
    };

    console.log("post data");
    console.log(data);

    await axios.post(postUrl, data).then((res) => {
      if (res.data.success && appID === "Invoice") {
        invoiceDetails.forEach((obj) => {
          obj.InvoiceSID = res.data.SID;
          var invoiceDetailData = {
            apiID: "InvoiceDetail",
            SID: obj.SID ?? 0,
            entity: obj,
          };
          axios
            .post(postUrl, invoiceDetailData)
            .then((res) => console.log(invoiceDetails));
        });
      } else {
        console.log(res.data.message);
      }
    });
    navigate(`/${appID}`);
  };

  //htmlFor client master edit
  if (appID === "Client") {
    return (
      <div className="row">
        <div className="col-2">
          <SideMenu />
        </div>
        <div
          className="col-9"
          style={{
            width: "1200px",
            height: "240px",
            marginTop: "100px",
            marginLeft: "44px",
          }}
        >
          <h1 className="heading mb-4">Client</h1>
          <form
            className="container border shadow"
            // style={{ width: "1000px", padding: "20px" }}
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={entity.Name}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  value={entity.Email}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="phone">Contact No</label>
                <input
                  type="text"
                  className="form-control"
                  id="ContactNo"
                  value={entity.ContactNo}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label htmlFor="GstNo">GstNo</label>
                <input
                  type="text"
                  className="form-control"
                  id="GstNo"
                  value={entity.GstNo}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="DefaultTaxSID">DefaultTax</label>
              <br></br>
              {!entity.DefaultTaxSID ? (
                <select
                  name="DefaultTaxSID"
                  id="DefaultTaxSID"
                  onChange={(e) => onInputChange(e)}
                >
                  <option defaultValue>Select</option>
                  {tax.map((item, index) => (
                    <option key={index} value={item.SID}>
                      {item.Description}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  name="DefaultTaxSID"
                  id="DefaultTaxSID"
                  onChange={(e) => onInputChange(e)}
                >
                  {tax.map((item, index) =>
                    item.SID === entity.DefaultTaxSID ? (
                      <option key={index} value={item.SID} defaultValue>
                        {item.Description}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                  {tax.map((item, index) =>
                    item.SID !== entity.DefaultTaxSID ? (
                      <option key={index} value={item.SID}>
                        {item.Description}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="string"
                className="form-control"
                aria-describedby="emailHelp"
                id="Address"
                value={entity.Address}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="archive">Archive</label>
              <span> </span>
              <input
                type="checkbox"
                id="Archive"
                value={entity.Archive}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else if (appID === "Invoice") {
    //htmlFor invoice master edit
    return (
      <div className="row">
        <div className="col-2">
          <SideMenu />
        </div>

        <div className="col-10">
          <div className="row" style={{ margin: "30px" }}>
            <div className="col-10">
              <h1 style={{ marginLeft: "60px" }}>Generate Invoice</h1>
            </div>
            <div className="col-2">
              <Link to="/client" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
          <div
            className="container border shadow"
            style={{ margin: "30px 80px 30px 80px" }}
          >
            <form>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="customerName">Customer Name</label>
                  {!entity.ClientSID ? (
                    <select
                      className="form-control"
                      id="ClientSID"
                      placeholder="Customer Name"
                      onChange={(e) => onInputChange(e)}
                      required
                    >
                      <option defaultValue>Select</option>
                      {client.map((item, index) => (
                        <option key={index} value={item.SID}>
                          {item.Name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="form-control"
                      id="ClientSID"
                      placeholder="Customer Name"
                      onChange={(e) => onInputChange(e)}
                      required
                    >
                      {client.map((item, index) =>
                        item.SID === entity.ClientSID ? (
                          <option key={index} value={item.SID} defaultValue>
                            {item.Name}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                      {client.map((item, index) =>
                        item.SID !== entity.ClientSID ? (
                          <option key={index} value={item.SID}>
                            {item.Name}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="invoiceNo">Invoice Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="InvoiceNo"
                    placeholder="Invoice Number"
                    value={entity.InvoiceNo}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="SACCode">SACCode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="SACCode"
                    placeholder="SAC Code"
                    value={entity.SACCode}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="InvoiceDate">Invoice Date</label>
                  <input
                    type="date"
                    required
                    pattern="\d{4}-\d{2}-\d{2}"
                    className="form-control"
                    id="InvoiceDate"
                    value={entity.InvoiceDate}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="ContractReference">Contract Reference</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ContractReference"
                    value={entity.ContractReference}
                    placeholder="Contract Reference"
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="TaxSID">Tax</label>
                  {!entity.TaxSID ? (
                    <select
                      type="number"
                      className="form-control"
                      id="TaxSID"
                      placeholder="Tax"
                      onChange={(e) => onInputChange(e)}
                      required
                    >
                      <option defaultValue>Select</option>
                      {tax.map((item, index) => (
                        <option key={index} value={item.SID}>
                          {item.Description}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      type="number"
                      className="form-control"
                      id="TaxSID"
                      onChange={(e) => onInputChange(e)}
                      required
                    >
                      {tax.map((item, index) =>
                        item.SID === entity.TaxSID ? (
                          <option key={index} value={item.SID} defaultValue>
                            {item.Description}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                      {tax.map((item, index) =>
                        item.SID !== entity.TaxSID ? (
                          <option key={index} value={item.SID}>
                            {item.Description}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  )}
                </div>
                <div className="form-group col-2">
                  <label htmlFor="StatusSID">Status</label>
                  <input
                    type="number"
                    className="form-control"
                    id="StatusSID"
                    value={entity.StatusSID}
                    placeholder=""
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Archive"
                  />
                  <label className="form-check-label" htmlFor="Archive">
                    Archive
                  </label>
                </div>
              </div>
            </form>
            <div>
              {/* invoice detail form component*/}

              <InvoiceForm
                appID="InvoiceDetail"
                invoiceDetails={invoiceDetails}
                onSubmitInvoiceDetails={onSubmitInvoiceDetails}
                invoiceSID={entity.SID}
                onInputChange={onInputChange}
                entity={entity} //invoice table
                tax={tax} //tax table
              />
            </div>

            <button
              style={{ margin: "20px", width: "120px" }}
              type="submit"
              onClick={(e) => onSubmit(e)}
              className="btn btn-primary"
            >
              <b>Submit</b>
            </button>
          </div>
        </div>
      </div>
    );
  } else if (appID === "Tax") {
    // htmlFor tax master edit
    return (
      <div className="row">
        <div className="col-2">
          <SideMenu />
        </div>
        <div className="container col-10" style={{ marginTop: "100px" }}>
          <h2 className="mb-4" style={{ paddingLeft: "160px" }}>
            Tax
          </h2>
          <form
            className="container border shadow"
            onSubmit={(e) => onSubmit(e)}
            style={{ marginLeft: "150px", width: "1000px" }}
          >
            <div className="form-group" style={{ margin: "20px" }}>
              <label htmlFor="name">Description</label>
              <input
                type="string"
                className="form-control"
                id="Description"
                value={entity.Description}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="tax1">Tax1</label>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="Tax1"
                  value={entity.Tax1}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="tax2">Tax2</label>
                <input
                  type="number"
                  className="form-control"
                  id="Tax2"
                  value={entity.Tax2}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="archive">Archive</label>
              <span> </span>
              <input
                type="checkbox"
                id="Archive"
                value={entity.Archive}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              <b>Submit</b>
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    // htmlFor user master edit
    return (
      <div className="row">
        <div className="col-2">
          <SideMenu />
        </div>
        <div className="container col-10" style={{ marginTop: "100px" }}>
          <h2 className="mb-4" style={{ marginLeft: "160px" }}>
            User
          </h2>
          <form
            className="container border shadow"
            onSubmit={(e) => onSubmit(e)}
            style={{ marginLeft: "150px", width: "1000px" }}
          >
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="name">Name</label>
                <input
                  type="string"
                  className="form-control"
                  id="Name"
                  value={entity.Name}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="UserName">UserName</label>
                <input
                  type="string"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="UserName"
                  value={entity.UserName}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  value={entity.Password}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="phone">Contact No</label>
                <input
                  type="string"
                  className="form-control"
                  id="ContactNo"
                  value={entity.ContactNo}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                value={entity.Email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="archive">Archive</label>
              <span> </span>
              <input
                type="checkbox"
                id="Archive"
                value={entity.Archive}
                // onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">
              <b>Submit</b>
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default AddUpdateEntity;

//for calculation onchange

// const [calculationData, setCalculationData] = useState([]);
//   const onChangeCalculationData = (e) => {
//     setCalculationData({ ...calculationData, [e.target.id]: e.target.value });
//     console.log(calculationData);
//   };
