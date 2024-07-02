import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTableAvailability, deleteTableAvailability } from '../../../slices/restaurant/table/availabilitySlice';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

const TableAvailability = () => {
  const { tableId } = useParams();
  const dispatch = useDispatch();
  const { tableAvailability, loading, error } = useSelector((state) => state.tableAvailability);
  const [localAvailability, setLocalAvailability] = useState([]);

  useEffect(() => {
    if (tableId) {
      dispatch(getTableAvailability(tableId));
    }
  }, [tableId]);


  useEffect(() => {
    if (tableAvailability) {
      setLocalAvailability([...tableAvailability]);
    }
  }, [tableAvailability]);


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
            const updatedAvailability = localAvailability.filter(avail => avail.id !== availabilityId);
            setLocalAvailability(updatedAvailability);
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

  return (
    <main>

      <section className='restaurant-details my-5 container-fluid'>

        <Link to={`/add-availability/${tableId}`}>
          <FontAwesomeIcon icon={faPlus} className="text-warning mx-3 h2" />
        </Link>

        <h1 className='text-center text-light'>Table Availability</h1>
        
        <section className='row'>
  
          {localAvailability && localAvailability.length > 0 ? (
            <table className="locations my-3">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {localAvailability.map((avail) => (
                  <tr key={avail.id}>
                    <td>{avail.start_time}</td>
                    <td>{avail.end_time}</td>
                    <td>{avail.status}</td>
                    <td>
                      <Link to={`/user-dashboard/edit-availability/${avail.id}`}>
                        <FontAwesomeIcon icon={faEdit} className="text-success" />
                      </Link>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger mx-5"
                        onClick={() => handleDeleteTableAvailability(avail.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No availability data found.</p>
          )}
        </section>
      </section>
    </main>
  );
};

export default TableAvailability;
