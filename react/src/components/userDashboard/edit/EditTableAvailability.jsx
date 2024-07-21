import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTableAvailabilityById, updateTableAvailability } from '../../../slices/restaurant/table/availabilitySlice';
import Loader from '../../../layouts/loader/loader';
import Swal from 'sweetalert2';

const EditTableAvailability = () => {
  const { availableId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availabilityTable, loading, error } = useSelector((state) => state.tableAvailability);

  const [availabilityData, setAvailabilityData] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (availableId) {
      dispatch(getTableAvailabilityById(availableId));
    }
  }, [availableId]);

  useEffect(() => {
    if (availabilityTable) {
      setAvailabilityData(availabilityTable); 
    }
  }, [availabilityTable]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = availabilityData.every(availability => {
      const startTime = new Date(`1970-01-01T${availability.start_time}`);
      const endTime = new Date(`1970-01-01T${availability.end_time}`);
      return startTime < endTime;
    });

    if (!isValid) {
      setFormError('Start time must be before End time for all availabilities.');
      return;
    }

    const updatedAvailabilityData = availabilityData.map((availability) => ({
      ...availability,
      start_time: formatTime(availability.start_time),
      end_time: formatTime(availability.end_time),
      status: capitalizeFirstLetter(availability.status) || '',
    }));

    updatedAvailabilityData.forEach((updatedAvailability) => {
      dispatch(updateTableAvailability({ availabilityId: updatedAvailability.id, availableData: updatedAvailability }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: true,
            timer: 9000,
          }).then((result) => {
              navigate(-1); 
          });
        }
      });
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const handleAvailabilityChange = (e, index, fieldName) => {
    const { value } = e.target;

    const updatedAvailabilityData = availabilityData.map((availability, idx) => {
      if (idx === index) {
        return {
          ...availability,
          [fieldName]: value,
        };
      }
      return availability; 
    });

    setAvailabilityData(updatedAvailabilityData);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className='availability col-6 offset-3'>

      <form onSubmit={handleSubmit}>
        <h1 className='text-center my-4'>Edit Table Availability</h1>
        {availabilityData.map((availability, index) => (
          <div key={index}>
            <label>Start Time:</label>
            <input
              className="form-control"
              type="time"
              value={availability.start_time || ''}
              onChange={(e) => handleAvailabilityChange(e, index, 'start_time')}
              required
            />

            <label className='my-2'>End Time:</label>
            <input
              className="form-control"
              type="time"
              value={availability.end_time || ''}
              onChange={(e) => handleAvailabilityChange(e, index, 'end_time')}
              required
            />

            <label className='my-2'>Status:</label>
            <select
              className="form-control"
              value={availability.status || ''}
              onChange={(e) => handleAvailabilityChange(e, index, 'status')}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        ))}

        {formError && <div className="alert alert-danger my-3">{formError}</div>}

        <button className="custom-button col-12 my-5" type="submit">Update Availability</button>
      </form>
    </main>
  );
};

export default EditTableAvailability;
