import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTableAsync, selectDeleteTableStatus, selectDeleteTableError } from '../../../slices/restaurant/table/deleteTableSlice';
import { deleteTableImageAsync } from '../../../slices/restaurant/tableImage/tableImage'; 
import Swal from 'sweetalert2';

const LocationTablesTable = ({ restaurant }) => {
  const dispatch = useDispatch();
  const deleteStatus = useSelector(selectDeleteTableStatus);
  const deleteError = useSelector(selectDeleteTableError);

  const handleDelete = (tableId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this table!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableAsync(tableId));
        Swal.fire('Deleted!', 'The table has been deleted.', 'success');
      }
    });
  };

  const handleImageDelete = (imageId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableImageAsync(imageId));
        Swal.fire('Deleted!', 'The image has been deleted.', 'success');
      }
    });
  };

  return (
    <section className='restaurant-details row my-5'>
      <h2 className='text-light text-center'>LocationsTables</h2>
      <table className="locations">
        <thead>
          <tr>
            <th>Address</th>
            <th>Tables</th>
            <th>Add Table</th>
          </tr>
        </thead>
        <tbody>
          {restaurant.locations && Array.isArray(restaurant.locations) && restaurant.locations.map((location) => (
            <tr key={location.id}>
              <td>{location.address}</td>
              <td>
                {location.tables && location.tables.length > 0 ? (
                  <table className="locations my-5">
                    <thead>
                      <tr>
                        <th>Number of Chairs</th>
                        <th>Cover</th>
                        <th>Max Number Of Persons</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Extra number of chairs</th>
                        <th>Extra childs chairs</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>images</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {location.tables.map((table) => (
                        <tr key={table.id}>
                          <td>{table.number_of_chairs}</td>
                          <td>{table.cover ? <img src={table.cover} alt="Table Cover" width="100" /> : 'N/A'}</td>
                          <td>{table.max_number_of_persons}</td>
                          <td>{table.price}</td>
                          <td>{table.sale_price}</td>
                          <td>{table.extra_number_of_chairs}</td>
                          <td>{table.extra_number_of_childs_chairs}</td>
                          <td>{table.description}</td>
                          <td>{table.status}</td>
                          <td>
                            <Link to={`/user-dashboard/add-table-image/${table.id}`}>
                              <FontAwesomeIcon icon={faPlus} className="text-warning mx-3 h5 my-2" />
                            </Link>
                            {table.images && table.images.length > 0 ? (
                              <div>
                                <table className="locations my-5">
                                  <thead>
                                    <tr></tr>
                                    <tr>
                                      <th>images</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {table.images.map((image) => (
                                      <tr key={image.id}>
                                        <td>
                                          <img src={image.image} alt="Table Image" style={{ marginRight: '10px' }} width="80" />
                                        </td>
                                        <td>
                                          <Link to={`/user-dashboard/edit-table-image/${image.id}`}>
                                            <FontAwesomeIcon icon={faEdit} className="text-success" />
                                          </Link>
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-danger mx-5"
                                            onClick={() => handleImageDelete(image.id)}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p>No Image</p>
                            )}
                          </td>
                          <td>  
                            <Link to={`/availability/${table.id}`}>
                              <FontAwesomeIcon icon={faEye} className="text-warning h4" />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/user-dashboard/edit-table/${table.id}`}>
                              <FontAwesomeIcon icon={faEdit} className="text-success" />
                            </Link>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-danger mx-5"
                              onClick={() => handleDelete(table.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No tables available</p>
                )}
              </td>
              <td>
                <Link to={`/user-dashboard/add-table/${location.id}`}>
                  <FontAwesomeIcon icon={faPlus} className="text-warning mx-3 h5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteStatus === 'loading' && <p>Deleting...</p>}
      {deleteError && <p>Error when deleting table</p>}
    </section>
  );
};

export default LocationTablesTable;
