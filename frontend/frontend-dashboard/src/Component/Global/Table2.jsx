import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(orderId, address, eta, status) {
  return {
    orderId,
    address,
    eta,
    status,
  };
}

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="font-normal"
      >
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">
          {new Date(row.eta).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    eta: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  let rows = [];
  if (props.orders.length > 0) {
    rows = props.orders.map((order) => {
      return createData(order.order_id, order.location, order.edd, order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1));
    });
  }

  return (
    <TableContainer component={Paper} style={{ width: 70 + 'vw' }}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 10 + 'vw' }}>
              {" "}
              <p style={{ fontWeight: "bold" }}>Order ID</p>
            </TableCell>
            <TableCell align="left">
              {" "}
              <p style={{ fontWeight: "bold" }}>Delivary Address</p>
            </TableCell>
            <TableCell align="left" style={{ width: 10 + 'vw' }}>
              {" "}
              <p style={{ fontWeight: "bold" }}>EDD</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: "bold" }}>Status</p>
            </TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
