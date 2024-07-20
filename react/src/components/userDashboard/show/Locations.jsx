import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faSearch, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { InputAdornment, TextField, TablePagination } from '@mui/material';
import Loader from '../../../layouts/loader/loader';
import { deleteTableAvailability, getTableAvailability} from '../../../slices/restaurant/table/availabilitySlice';
import { fetchRestaurantTablesAsync } from '../../../slices/restaurant/table/restaurantTablesSlice';
import Swal from 'sweetalert2';
import { deleteLocationAsync } from '../../../slices/restaurant/location/deleteSlice';
import { fetchRestaurantById } from '../../../slices/restaurant/restaurantSlice';
import { deleteTableAsync } from '../../../slices/restaurant/table/deleteTableSlice';
import { deleteTableImageAsync } from '../../../slices/restaurant/tableImage/tableImage';
import { Spinner } from 'react-bootstrap';

export default function Locations() {
  const dispatch = useDispatch();
  const { restaurant } = useOutletContext(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [SelectedTableId, setSelectedTableId] = useState(null);
  const [imageIndices, setImageIndices] = useState({});
  const [filteredTables, setFilteredTables] = useState(null);
  const status = restaurant ? 'succeeded' : 'loading';
  const [tablesAvailability, setTablesAvailability] = useState(null);
  const { tables: restaurantTables = [] } = useSelector((state) => state.restaurantTables);
  const { tableAvailability, loading, error } = useSelector((state) => state.tableAvailability);
  const [showAvailability, setShowAvailability] = useState(false); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  useEffect(() => {
    const filteredTable = (restaurantTables || []).filter((table) => {
      const description = table.description || '';
      const numberOfChairs = table.number_of_chairs || '';
      const maxNumberOfPersons = table.max_number_of_persons || '';
      const extraNumberOfChairs = table.extra_number_of_chairs || '';
      const price = table.price || '';
      const salePrice = table.sale_price || '';
      const extraNumberOfChildsChairs = table.extra_number_of_childs_chairs || '';
      const extraChildChairPrice = table.extra_child_chair_price || '';
      const status = table.status || '';

      return (
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        numberOfChairs.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        maxNumberOfPersons.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        extraNumberOfChairs.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        salePrice.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        extraNumberOfChildsChairs.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        extraChildChairPrice.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredTables(filteredTable);
  }, [searchTerm, restaurantTables]);


  useEffect(() => {
    if (tableAvailability) {
      setTablesAvailability(tableAvailability);
    }
  }, [tableAvailability]);

  if (!restaurant) {
    return (
      <main className="centered-flex">
        <Spinner />
      </main>
    );
  }

  
 
  
  const handleShowTables = (locationId) => {
    setSelectedLocationId(locationId);
    dispatch(fetchRestaurantTablesAsync(locationId));
  };


  const handleShowTableAvailability = (tableId) => {
    setSelectedTableId(tableId);
    dispatch(getTableAvailability(tableId));
    setShowAvailability(true);
  };


  const handleHideTables = () => {
    setSelectedLocationId(null);
    setSelectedTableId(null);
    setShowAvailability(false);
  };

  
  const handleNextImage = (tableId) => {
    setImageIndices((prevIndices) => ({
      ...prevIndices,
      [tableId]: ((prevIndices[tableId] || 0) + 1) % restaurantTables.find(table => table.id === tableId).images.length,
    }));
  };

  const handlePrevImage = (tableId) => {
    setImageIndices((prevIndices) => ({
      ...prevIndices,
      [tableId]: ((prevIndices[tableId] || 0) - 1 + restaurantTables.find(table => table.id === tableId).images.length) % restaurantTables.find(table => table.id === tableId).images.length,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const filteredLocations = restaurant.locations.filter((location) => {
    const address = location.address || '';
    const closedDays = location.closed_days || [];
    const zip = location.zip || '';
    const numberOfTables = location.number_of_tables || '';
    const status = location.status || '';
    const openingTime = location.opening_time || '';
    const closedTime = location.closed_time || '';
    const rating = location.average_rating || '';
    const phoneNumber = location.phone_number || '';
    const mobileNumber = location.mobile_number || '';

    return (
      address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      closedDays.join(', ').toLowerCase().includes(searchTerm.toLowerCase()) ||
      zip.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      numberOfTables.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      openingTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      closedTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rating.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      phoneNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobileNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  
  
  const handleDeleteLocation = (locationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this location!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLocationAsync(locationId))
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id)); 
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the location.',
              'error'
            );
          });
      }
    });
  };

  const handleDelete = (tableId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this table!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableAsync(tableId))
          .then(() => {
            setFilteredTables((prevTables) =>
              prevTables.filter((table) => table.id !== tableId)
            );
            Swal.fire('Deleted!', 'The table has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while deleting the table.', 'error');
          });
      }
    });
  };

  const handleDeleteImage = (imageId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableImageAsync(imageId))
          .then(() => {
            dispatch(fetchRestaurantTablesAsync(locationId));
            Swal.fire('Deleted!', 'The image has been deleted.', 'success');
          })
          
      }
    });
  };


  const handleDeleteTableAvailability = (availabilityId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this availability!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableAvailability(availabilityId))
          .then(() => {
            setTablesAvailability((prevAvailability) =>
              prevAvailability.filter((availability) => availability.id !== availabilityId)
            );
            Swal.fire(
              'Deleted!',
              'The availability has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the availability.',
              'error'
            );
          });
      }
    });
  };


  if (status === 'loading') {
    return (
      <main className="centered-flex">
        <Spinner />
      </main>
    );
  }

  const paginatedLocations = (filteredLocations || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (

    <main className="container-fluid restaurant-dashboards mx-5">

      {/* Location Table */}

      <Paper sx={{ width: '100%', marginTop: '10px', display: selectedLocationId ? 'none' : 'block' }}>

        <section className="custom-header">
          <h3 className="text-center">Restaurant Locations</h3>
          <div className="roof"></div>
        </section>

        <div 
         className="float-end my-4" 
         style={{ zIndex: 10, position: 'relative' }}
        >
          <Link 
            to={`/add-location/${restaurant.id}`}
            className="btn btn-outline-warning mx-2 text-dark">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Link>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className='my-3'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>

          <Table aria-label="sticky table">

            <TableHead className="table-head">
              <TableRow>
                <TableCell className='text-center table-cell'>Address</TableCell>
                <TableCell className='text-center table-cell'>Zip</TableCell>
                <TableCell className='text-center table-cell'>Opening Time</TableCell>
                <TableCell className='text-center table-cell'>Closed Time</TableCell>
                <TableCell className='text-center table-cell'>Closed Days</TableCell>
                <TableCell className='text-center table-cell'>Number of Tables</TableCell>
                <TableCell className='text-center table-cell'>Phone Number</TableCell>
                <TableCell className='text-center table-cell'>Mobile Number</TableCell>
                <TableCell className='text-center table-cell'>Status</TableCell>
                <TableCell className='text-center table-cell'>Rating</TableCell>
                <TableCell className='text-center table-cell'>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedLocations.map((location, index) => (
                <TableRow key={location.id} hover={true} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <TableCell className='text-center'>{location.address}</TableCell>
                  <TableCell className='text-center'>{location.zip}</TableCell>
                  <TableCell className='text-center'>{location.opening_time}</TableCell>
                  <TableCell className='text-center'>{location.closed_time}</TableCell>
                  <TableCell className='text-center'>{Array.isArray(location.closed_days) ? location.closed_days.join(', ') : location.closed_days}</TableCell>
                  <TableCell className='text-center'>{location.number_of_tables}</TableCell>
                  <TableCell className='text-center'>{location.phone_number}</TableCell>
                  <TableCell className='text-center'>{location.mobile_number}</TableCell>
                  <TableCell className='text-center'>{location.status}</TableCell>
                  <TableCell className='text-center'>{location.average_rating}</TableCell>
                  <TableCell className="d-flex align-items-center justify-content-center">

                    <div className="btn-group">
                      <Link
                        to={`/edit-location/${location.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit 
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        <FontAwesomeIcon icon={faTrash}/> Delete
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleShowTables(location.id)}
                      >
                        <FontAwesomeIcon icon={faEye}/>  Tables
                      </button>
                    </div>
                    
                  </TableCell>
                </TableRow>
              ))}

              {/* If no matching records */}

              {filteredLocations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center">
                    No locations found matching your search.
                  </TableCell>
                </TableRow>
              )}

            </TableBody>

          </Table>

        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredLocations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        
      </Paper>




      {/* Tables Table */}

      {selectedLocationId && (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '10px' ,display: SelectedTableId ? 'none' : 'block' }}>
        <section className="custom-header">
            <h3 className="text-center">
              Tables for {restaurant.locations.find(location => location.id === selectedLocationId)?.address}
            </h3>
            <div className="roof"></div>
        </section>

        <section>

          <div className="float-end my-4" style={{ zIndex: 10, position: 'relative' }}>
          <Link 
           to={`/add-table/${selectedLocationId}`} 
           className="btn btn-outline-warning mx-2 text-dark"
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </Link>
        </div>

        <TextField
            label="Search"
            variant="outlined"
            size="small"
            className='my-3'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} />
                </InputAdornment>
              ),
            }}
          />

        <button 
          className="btn btn-outline-warning float-start my-3 mx-2 text-dark"
          onClick={handleHideTables}
        >
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Locations
        </button>

      </section>
          
          <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>
            
            <Table aria-label="sticky table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className='text-center table-cell'>Description</TableCell>
                  <TableCell className='text-center table-cell'>n.of Chairs</TableCell>
                  <TableCell className='text-center table-cell'>Max n.of Persons</TableCell>
                  <TableCell className='text-center table-cell'>Extra n.of Chairs</TableCell>
                  <TableCell className='text-center table-cell'>Price</TableCell>
                  <TableCell className='text-center table-cell'>Sale price</TableCell>
                  <TableCell className='text-center table-cell'> n.of childs chairs</TableCell>
                  <TableCell className='text-center table-cell'> child chair $</TableCell>
                  <TableCell className='text-center table-cell'>Status</TableCell>
                  <TableCell className='text-center table-cell'>images</TableCell>
                  <TableCell className='text-center table-cell'>Actions</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
              {filteredTables.map((table, index) => (
                  <TableRow key={table.id} hover={true} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    
                    <TableCell className='text-center'>{table.description}</TableCell>
                    <TableCell className='text-center'>{table.number_of_chairs}</TableCell>
                    <TableCell className='text-center'>{table.max_number_of_persons}</TableCell>
                    <TableCell className='text-center'>{table.extra_number_of_chairs}</TableCell>
                    <TableCell className='text-center'>{table.price}</TableCell>
                    <TableCell className='text-center'>{table.sale_price}</TableCell>
                    <TableCell className='text-center'>{table.extra_number_of_childs_chairs}</TableCell>
                    <TableCell className='text-center'>{table.extra_child_chair_price}</TableCell>
                    <TableCell className='text-center'>{table.status}</TableCell>
                    <TableCell className="d-flex align-items-center justify-content-center">
                     <section className="image-action-group">
                       <div className="btn-group">
                         <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handlePrevImage(table.id)}
                         >
                            <FontAwesomeIcon icon={faChevronLeft} />
                         </button>
      
                         <img
                         src={table.images[imageIndices[table.id] || 0]?.image}
                         alt="Table"
                         style={{ width: '100px', height: '100px', margin: '0 5px' }}
                         />
      
                         <button
                         className="btn btn-outline-secondary btn-sm"
                         onClick={() => handleNextImage(table.id)}
                         >
                          <FontAwesomeIcon icon={faChevronRight} />
                         </button>
                       </div>
    
                       <div className="btn-group mx-4  mt-2">
      
                        <Link
                         to={`/edit-table-image/${table.images[imageIndices[table.id] || 0]?.id}`}
                         className="btn btn-outline-primary btn-sm"
                        >
                          <FontAwesomeIcon icon={faEdit} />  
                        </Link>

                        <Link to={`/add-table-image/${table.id}`} className="btn btn-outline-warning ">
                         <FontAwesomeIcon icon={faPlus} /> 
                        </Link>

                        <button
                        className="btn btn-outline-danger btn-sm"
                       onClick={() => handleDeleteImage(table.images[imageIndices[table.id] || 0]?.id)}
                        >
                         <FontAwesomeIcon icon={faTrash}/> 
                        </button>
                         
                       </div>

                    </section>
                   </TableCell>


                    <TableCell>
                    <div className="btn-group">

                    <button
                        onClick={() => handleShowTableAvailability(table.id)}
                        className="btn btn-outline-warning btn-sm"
                      >
                        <FontAwesomeIcon icon={faEye} /> Availability
                      </button>


                      <Link
                       to={`/edit-table/${table.id}`}
                        className="btn btn-outline-primary btn-sm ps-3 pe-3"
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit 
                      </Link>

                      <button
                        className="btn btn-outline-danger btn-sm ps-2 pe-2"
                        onClick={() => handleDelete(table.id)}
                      >
                        <FontAwesomeIcon icon={faTrash}/> Delete
                      </button>
                     
                    </div>
                    </TableCell>
                  </TableRow>
                ))}



                {/* If no tables */}

                {restaurantTables.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No tables found for this location.
                    </TableCell>
                  </TableRow>
                )}
                
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}



       {/* Availability table */}

       {showAvailability && (
        <Paper sx={{ width: '100%', marginTop: '10px', display: showAvailability ? 'block' : 'none' }}>

          <section className="custom-header">
            <h3 className="text-center">Table Availability</h3>
            <div className="roof"></div>
          </section>

          <div className="float-start my-4" style={{ zIndex: 10, position: 'relative' }}>
            <button onClick={handleHideTables} className="btn btn-outline-warning mx-2 text-dark">
              <FontAwesomeIcon icon={faChevronLeft} /> Back 
            </button>
          </div>


          <div className="float-end my-4" style={{ zIndex: 10, position: 'relative' }}>
            <NavLink to={`/add-availability/${SelectedTableId}`}  className="btn btn-outline-warning mx-2 text-dark">
              <FontAwesomeIcon icon={faPlus} /> Add Availability
            </NavLink>
          </div>


          <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>

            <Table aria-label="sticky table">

              <TableHead className="table-head">
                <TableRow>
                  <TableCell className='text-center table-cell'>Start Time</TableCell>
                  <TableCell className='text-center table-cell'>End Time</TableCell>
                  <TableCell className='text-center table-cell'>Status</TableCell>
                  <TableCell className='text-center table-cell'>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
   
                {tablesAvailability && tablesAvailability.map((availability) => (
                  <TableRow key={availability.id} hover={true}>
                    <TableCell className='text-center'>{availability.start_time}</TableCell>
                    <TableCell className='text-center'>{availability.end_time}</TableCell>
                    <TableCell className='text-center'>{availability.status}</TableCell>
                    <TableCell className="d-flex align-items-center justify-content-center">
                      <div className="btn-group">
                        <NavLink to={`/edit-availability/${availability.id}`} className="btn btn-outline-primary btn-sm">
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </NavLink>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteTableAvailability(availability.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>

          </TableContainer>

        </Paper>
      )}

    </main>
  );
}
