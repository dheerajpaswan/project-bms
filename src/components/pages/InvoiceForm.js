import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { deleteUrlInvoiceDetails, getUrlInvoiceDetail } from "./APIUrl";

function InvoiceForm(props) {
  //Varibales
  const { invoiceDetails, invoiceSID, entity, tax } = props;
  // const invoiceDetailURL = `${getUrlInvoiceDetail}&conditions=InvoiceSID=?&values=${invoiceSID}`;
  let taxRate = 0;

  const [invoiceFormDetails, setInvoiceFormDetails] = useState([
    invoiceDetails,
  ]);
  const initialFormData = {
    SID: 0,
    InvoiceSID: invoiceSID,
    Description: "",
    Quantity: 0,
    UnitPrice: 0,
  };

  //
  const [calculation, setCalculation] = useState({
    NetAmount: 0,
    DiscountAmount: 0,
    RoundOffAmount: 0,
    GrossAmount: 0,
    Tax: 0,
    TaxAmount: 0,
  });

  const [FormData, setFormData] = useState({
    SID: 0,
    InvoiceSID: invoiceSID,
    Description: "",
    Quantity: 0,
    UnitPrice: 0,
  });

  //handle delete for delete the invoice detail from the list of the collection
  const handleDeleteClick = async (invoiceDetailId) => {
    await axios.delete(`${deleteUrlInvoiceDetails}${invoiceDetailId}`);
    loadInvoiceFormDetail();
    console.log("Success");
  };

  const loadInvoiceFormDetail = () => {
    setInvoiceFormDetails(invoiceFormDetails);
    // axios.get(invoiceDetailURL).then((res) => {
    //   setInvoiceDetails(res.data.entity);
    //   console.log(res);
    // });
  };

  useEffect(() => {
    calculationFunctionOnCreate(calculation);
    console.log(taxRate);
  }, []);

  //--------------DOUBT-------------------//
  // const loadInvoiceDetail = async function () {
  //   console.log("Success");
  //   await axios
  //     .get(
  //       `https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/GetDataV3?entityTypeName=InvoiceDetail&conditions=InvoiceSID=?&values=${invoiceSID}`
  //     )
  //     .then((res) => {
  //       setInvoiceDetails(res.data.entity);
  //       console.log(res.data.entity);
  //       console.log(invoiceDetails);
  //     });
  //   // console.log(resultInvoiceDetail.data.entity);
  //   // setInvoiceDetails(resultInvoiceDetail.data.entity);
  // };

  //handled any form change
  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;
    setFormData({ ...FormData, [fieldName]: fieldValue });
  };

  const handleCalculationChange = (e) => {
    setCalculation({ ...calculation, [e.target.id]: e.target.value });
    calculationFunctionOnCreate(calculation);
    console.log(calculation);
    // console.log(invoiceSID, props.invoiceSID);
  };

  let totalAmount = 0;

  const calculationFunctionOnCreate = (calculation, e) => {
    console.log("called");
    tax.map((item, index) => {
      entity.TaxSID === item.SID
        ? (taxRate = parseInt(item.Tax1) + parseInt(item.Tax2))
        : console.log("NO Match");
    });

    //calculation
    invoiceDetails.map((detail, index) => {
      let temp = 0;
      temp = detail.Quantity * detail.UnitPrice;
      totalAmount = totalAmount + temp;
    });
    calculation.Tax = taxRate;

    calculation.TaxAmount = (totalAmount * calculation.Tax) / 100;

    calculation.GrossAmount = totalAmount + calculation.TaxAmount;
    calculation.NetAmount =
      totalAmount + calculation.TaxAmount - calculation.DiscountAmount;
    calculation.RoundOffAmount = Math.round(calculation.NetAmount);
    console.log(totalAmount, calculation);

    // handleCalculationChange(e);
    //saving in the datatable
    entity.DiscountAmount = calculation.DiscountAmount;
    entity.NetAmount = calculation.NetAmount;
    entity.RoundOffAmount = calculation.RoundOffAmount;
    entity.GrossAmount = calculation.GrossAmount;
  };

  //final add in arrary if item detail
  const handleFormSubmit = (e) => {
    e.preventDefault();

    invoiceDetails.push({
      SID: FormData.SID,
      InvoiceSID: invoiceSID,
      Description: FormData.Description,
      Quantity: FormData.Quantity,
      UnitPrice: FormData.UnitPrice,
    });
    setFormData(initialFormData);
    //to sent invoice data in parent component
    props.onSubmitInvoiceDetails(invoiceDetails);
    calculationFunctionOnCreate(calculation);
  };

  //single object of itemdetail edit
  const handleEditClick = (e, invoiceDetail) => {
    e.preventDefault();
    const formValues = {
      SID: invoiceDetail.SID,
      InvoiceSID: props.invoiceSID,
      Description: invoiceDetail.Description,
      Quantity: invoiceDetail.Quantity,
      UnitPrice: invoiceDetail.UnitPrice,
    };

    setFormData(formValues);
  };

  return (
    <div>
      <form className=" border">
        <div className="row">
          <div className="form-group col-3">
            <label>Enter Description</label>
            <input
              className="form-control"
              type="text"
              id="Description"
              required
              onChange={handleFormChange}
              value={FormData.Description}
            />
          </div>
          <div className="form-group col-3">
            <label>Enter Quantity</label>
            <input
              className="form-control"
              type="number"
              id="Quantity"
              required
              onChange={handleFormChange}
              value={FormData.Quantity}
            />
          </div>
          <div className="form-group col-3">
            <label>Enter UnitPrice</label>
            <input
              className="form-control"
              type="number"
              id="UnitPrice"
              required="required"
              onChange={handleFormChange}
              value={FormData.UnitPrice}
            />
          </div>
          <button className="btn btn-primary col-3" onClick={handleFormSubmit}>
            Add
          </button>
        </div>
        <table
          style={{ marginTop: "20px" }}
          className="table table-bordered table-hover"
          id="tab_logic"
        >
          <thead>
            <tr>
              <th className="text-center"> Description </th>
              <th className="text-center"> Quantity </th>
              <th className="text-center"> Price </th>
              <th className="text-center"> Actions </th>
            </tr>
          </thead>
          <tbody>
            <>
              {invoiceDetails.map((invoiceDetail, index) => (
                <>
                  <tr>
                    <td>{invoiceDetail.Description}</td>
                    <td>{invoiceDetail.Quantity}</td>
                    <td>{invoiceDetail.UnitPrice}</td>
                    <td>
                      <button
                        className="btn btn-primary pull-left"
                        type="button"
                        onClick={(e) => handleEditClick(e, invoiceDetail)}
                      >
                        Edit
                      </button>
                      <span> </span>
                      <button
                        className="pull-right btn btn-outline-primary"
                        type="button"
                        onClick={() => handleDeleteClick(invoiceDetail.SID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </>
          </tbody>
        </table>
        <>
          <table
            className="table table-bordered table-hover align-left"
            id="tab_logic_total"
          >
            <tbody>
              <tr>
                <th className="text-center">Discount Amount</th>
                <td className="text-center">
                  <input
                    type="number"
                    className="form-control"
                    id="DiscountAmount"
                    onChange={(e) => handleCalculationChange(e)}
                    value={entity.DiscountAmount}
                  />
                </td>

                <th className="text-center">RoundOff Amount</th>
                <td className="text-center">
                  <input
                    type="number"
                    className="form-control"
                    id="RoundOffAmount"
                    value={
                      invoiceSID
                        ? entity.RoundOffAmount
                        : calculation.RoundOffAmount
                    }
                  />
                </td>

                <th className="text-center">Gross Amount</th>
                <td className="text-center">
                  <input
                    type="number"
                    className="form-control"
                    id="GrossAmount"
                    value={
                      invoiceSID ? entity.GrossAmount : calculation.GrossAmount
                    }
                  />
                </td>
              </tr>
              <tr>
                <th className="text-center">Tax</th>
                <td className="text-center">
                  <div className="input-group mb-2 mb-sm-0">
                    <input
                      type="number"
                      className="form-control"
                      id="Tax"
                      value={calculation.Tax}
                    />
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
                    value={calculation.TaxAmount}
                  />
                </td>
              </tr>
              <tr>
                <th className="text-center">Net Amount</th>
                <td className="text-center">
                  <input
                    type="number"
                    id="NetAmount"
                    className="form-control"
                    value={
                      invoiceSID ? entity.NetAmount : calculation.NetAmount
                    }
                  />
                </td>
                <th className="text-center">Amount In Words</th>
                <td className="text-center">
                  <input
                    type="text"
                    id="AmountInWords"
                    className="form-control"
                    onChange={(e) => props.onInputChange(e)}
                    value={entity.AmountInWords}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </form>
    </div>
  );
}

export default InvoiceForm;
