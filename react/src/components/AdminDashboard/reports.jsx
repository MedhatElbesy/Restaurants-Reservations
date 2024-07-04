import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { fetchReports } from '../../slices/adminDashboard/adminSlice';
import { useDispatch, useSelector } from 'react-redux';


const ReportList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.adminDashboard.reports);
  const status = useSelector((state) => state.adminDashboard.status);
  const error = useSelector((state) => state.adminDashboard.error);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  // Paginate the data
  const paginatedReports = reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#ffd28d',textAlign:'center',fontFamily:'"Bad Script", cursive' }}>
        Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Restaurant Location ID</TableCell>
              <TableCell align='center'>User ID</TableCell>
              <TableCell align='center'>Report</TableCell>
              <TableCell align='center'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell align='center'>{report.id}</TableCell>
                <TableCell align='center'>{report.restaurant_location_id}</TableCell>
                <TableCell align='center'>{report.user_id}</TableCell>
                <TableCell align='center'>{report.report}</TableCell>
                <TableCell align='center'>{new Date(report.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ bgcolor: '#ffd28d', borderRadius: '0px 5px' }}
        rowsPerPageOptions={[5, 10, 25, 30, 35]}
        component="div"
        count={reports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ReportList;
