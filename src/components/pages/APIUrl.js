//API url for the project

const url =
  "https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/";

const postUrl = `${url}save`;
//Login API
const getUrlLogin = `${url}GetDataV3?entityTypeName=User&conditions=UserName = ? AND Password=?&values=`;

//Client master API
const getUrlClient = `${url}GetDataV3?entityTypeName=Client`;
const deleteUrlClient = `${url}Delete?entityTypeName=Client&id=`; //add id in master

//Invoice master API
const getUrlInvoice = `${url}GetDataV3?entityTypeName=Invoice`;
const deleteUrlInvoice = `${url}Delete?entityTypeName=Invoice&id=`; //add id in invoice

//InvoiceDetail API
const getUrlInvoiceDetail = `${url}GetDataV3?entityTypeName=InvoiceDetail`;
const deleteUrlInvoiceDetails = `${url}Delete?entityTypeName=InvoiceDetail&id=`; //add id in invoiceDetail

//Tax master API
const getUrlTax = `${url}GetDataV3?entityTypeName=Tax`;
const deleteUrlTax = `${url}Delete?entityTypeName=Tax&id=`; //add id in tax

//User master API
const getUrlUser = `${url}GetDataV3?entityTypeName=User`;
const deleteUrlUser = `${url}Delete?entityTypeName=User&id=`; //add id in user

export {
  postUrl,
  getUrlLogin,
  getUrlClient,
  deleteUrlClient,
  getUrlInvoice,
  deleteUrlInvoice,
  getUrlInvoiceDetail,
  deleteUrlInvoiceDetails,
  getUrlTax,
  deleteUrlTax,
  getUrlUser,
  deleteUrlUser,
};
