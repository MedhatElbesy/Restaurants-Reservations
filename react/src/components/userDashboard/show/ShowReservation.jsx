import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurantReservations,
  updateReservationStatus,
} from "../../../slices/checkout/checkoutSlice";
import { useParams } from "react-router-dom";
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
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import '../userDashboardRestaurant.css';

function createData(
  id,
  totalPrice,
  detailsReservationDate,
  status,
  notes,
  details,
  payments
) {
  return {
    id,
    totalPrice,
    detailsReservationDate,
    status,
    notes,
    details,
    payments,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(row.status);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    dispatch(updateReservationStatus({ reservationId: row.id, status }));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">{row.detailsReservationDate}</TableCell>
        <TableCell align="right">
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="right">
          <Button variant="contained" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Reservation Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Extra Chairs</TableCell>
                    <TableCell>Extra Child Chairs</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.reservation_date}</TableCell>
                      <TableCell>{detail.amount}</TableCell>
                      <TableCell>{detail.number_of_extra_chairs}</TableCell>
                      <TableCell>
                        {detail.number_of_extra_childs_chairs}
                      </TableCell>
                      <TableCell>{row.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ marginTop: 2 }}
              >
                Payments
              </Typography>
              <Table size="small" aria-label="payments">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.transaction_id}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.customer_name}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    detailsReservationDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        reservation_date: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        number_of_extra_chairs: PropTypes.number.isRequired,
        number_of_extra_childs_chairs: PropTypes.number.isRequired,
      })
    ).isRequired,
    payments: PropTypes.arrayOf(
      PropTypes.shape({
        transaction_id: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        customer_name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const { reservations } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const { restaurantId } = useParams();

  useEffect(() => {
    dispatch(getAllRestaurantReservations(restaurantId));
  }, [ restaurantId]);

  const rows = reservations.map((reservation) =>
    createData(
      reservation.id,
      reservation.total_price,
      reservation.details[0]?.reservation_date || "N/A",
      reservation.payments[0]?.status || "N/A",
      reservation.notes,
      reservation.details,
      reservation.payments
    )
  );

  return (
    <div>
      <main className="restaurant-dashboards">
        <section className="custom-header">
          <h3 className="text-center">Reservations</h3>
          <div className="roof"></div>
        </section>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Reservation ID</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Reservation Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right" colSpan={3}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}
