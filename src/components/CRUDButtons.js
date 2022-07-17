import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function CRUDButtons(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "10vh",
        marginTop: "15px",
      }}
    >
      <Button style={{ margin: "4px" }} variant="outlined">
        <Link
          style={{ textDecoration: "none" }}
          to="/AddUpdate"
          state={{ entityfromGrid: "", appID: props.appID }} //no need in case of add operation
          className="btn btn-light"
        >
          {props.appID === "Invoice" ? "Generate Invoice" : "Create"}
        </Link>
      </Button>
    </div>
  );
}

export default CRUDButtons;
