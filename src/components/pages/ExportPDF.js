import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import logo from "../BMSLOGO .png";
import { getUrlClient, getUrlInvoiceDetail, getUrlTax } from "./APIUrl";
import Invoice from "./Invoice";

const ExportPDF = function (props) {
  const componentRef = useRef();
  const location = useLocation();
  const [tax, setTax] = useState([]);
  const [client, setClient] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);

  const { entityfromGrid, appID } = location.state;

  //print pdf function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    loadTax();
    loadClient();
    loadInvoiceDetail();
  }, []);

  ////fetching tax data from API
  const loadTax = async function () {
    const resultTax = await axios.get(getUrlTax);
    setTax(resultTax.data.entity);
    //console.log(resultTax.data.entity);
  };

  //fetching client data from API
  const loadClient = async function () {
    const resultClient = await axios.get(getUrlClient);
    setClient(resultClient.data.entity);
  };

  //fetching invoice detail data from API
  const loadInvoiceDetail = async function () {
    const resultInvoiceDetail = await axios.get(
      `${getUrlInvoiceDetail}&conditions=InvoiceSID=?&values=${entityfromGrid.SID}`
    );
    setInvoiceDetails(resultInvoiceDetail.data.entity);
    console.log(entityfromGrid);
  };

  //a simple date formatting function
  function dateFormat(inputDate, format) {
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  return (
    //   {invoices.map((item,index) =>())}
    <div>
      <div ref={componentRef} id="invoicePDF">
        <div style={{ margin: "20px" }}>
          <img
            src={logo}
            style={{ width: "250px", margin: "10px", textAlign: "right" }}
          ></img>
          <h1 style={{ textAlign: "center" }}>
            Bright Media Solution Pvt. Ltd.
          </h1>
          <p style={{ textAlign: "right" }}>
            Date:{" "}
            {dateFormat(entityfromGrid.InvoiceDate.split(" ")[0], "dd-MM-yyyy")}
          </p>
          <h4 style={{ textAlign: "Center" }}>Tax Invoice</h4>
          <p style={{ textAlign: "center" }}>ORIGINAL INVOICE FOR RECIPIENT</p>
          <div>
            <table
              className="table table-bordered"
              border={1}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td style={{ width: "40%" }}>
                    <h5>
                      CLIENT:
                      <br />
                      {client.map((client, index) =>
                        client.SID === entityfromGrid.ClientSID
                          ? client.Name
                          : ""
                      )}
                    </h5>
                    <p>
                      {client.map((client, index) =>
                        client.SID === entityfromGrid.ClientSID
                          ? client.Address
                          : ""
                      )}
                    </p>
                    <h5>
                      GST:
                      {client.map((client, index) =>
                        client.SID === entityfromGrid.ClientSID
                          ? client.GstNo
                          : ""
                      )}
                    </h5>
                  </td>
                  <td style={{ width: "40%" }}>
                    <div style={{ margin: "50px" }}>
                      <b>INVOICE NO:</b> {entityfromGrid.InvoiceNo}
                    </div>
                  </td>
                  <td style={{ width: "20%" }}>
                    <div style={{ margin: "50px" }}>
                      <b>CONTRACT REFERENCE </b>
                    </div>
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td style={{ width: "40%" }}>
                    BMS GST:<b>07AAFCB5355B1Z0</b>
                  </td>
                  <td style={{ width: "40%" }}></td>
                  <td style={{ width: "20%" }}>
                    <b>Schedule / Service Order Reference</b>
                  </td>
                </tr>
                <tr>
                  <th>Item</th>
                  <th>Description of Service</th>
                  <th>Total Price INR</th>
                </tr>
                <tr>
                  <td style={{ width: "40%", marginBottom: "30px" }}>
                    <h4>01.</h4>
                  </td>
                  <td style={{ width: "40%" }}>
                    <h4>
                      {invoiceDetails.map((detail, index) => (
                        <h4> {detail.Description}</h4>
                      ))}
                      <br />
                      Discount
                    </h4>
                    <br />
                    <h4>
                      Final Amount <br />
                      {tax.map((tax, index) =>
                        tax.SID === entityfromGrid.TaxSID
                          ? `${tax.Description} ${tax.Tax1}%`
                          : ""
                      )}
                    </h4>
                  </td>
                  <td style={{ width: "20%" }}>
                    <h4>
                      {entityfromGrid.GrossAmount}
                      {invoiceDetails.map((detail, index) => (
                        <br />
                      ))}
                      {entityfromGrid.DiscountAmount}
                    </h4>
                    <br />
                    <h4>
                      {entityfromGrid.RoundOffAmount -
                        entityfromGrid.DiscountAmount}{" "}
                      <br />
                      {entityfromGrid.NetAmount * 0.18}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    <h4>Total INR</h4>
                  </td>
                  <td>
                    <h4>{entityfromGrid.RoundOffAmount}</h4>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <h4>Amount In Words: {entityfromGrid.AmountInWords}</h4>
                  </td>
                </tr>
                <tr style={{ textAlign: "left" }}>
                  <td colSpan={2}>
                    <h6>
                      {" "}
                      Payment Terms: As per above mentioned terms.
                      <br /> HDFC BANK, Roop Nagar, New Delhi .<br /> MICR
                      Code:110240053, IFSC Code:HDFC0000339
                      <br />
                      Account Name: Bright Media Solution Pvt. Ltd.
                      <br /> A/C No.: 50200001777681
                    </h6>
                  </td>
                  <td style={{ textAlign: "center" }}>Signature</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Bright Media Solution Pvt. Ltd.</h3>
          <p>
            G-24, IInd Vijay Nagar, Delhi-110009 Ph. 011-45085423.
            <br /> Email: Contact @bmsinfoglobal.com <br />
            CIN No .U72900DL2013PTC251813
            <br /> Range: RANGE-51(SR0101), Division: SERVICE TAX DIVISION-XI,
            <br /> SERVICE TAX COMMISSIONERATE DELHI-III
            <br /> IGST No. 07AAFCB5355B1Z
          </p>
        </div>
        <br />
      </div>
      <div style={{ margin: "10px", textAlign: "right" }}>
        <h6>Print PDF of the invoice</h6>
        <button className="btn btn-danger" onClick={handlePrint}>
          PRINT
        </button>
      </div>
    </div>
  );
};

export default ExportPDF;
