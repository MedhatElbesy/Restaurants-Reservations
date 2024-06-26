import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTableAvailabilityById, updateTableAvailability } from '../../../slices/restaurant/table/availabilitySlice';
import Loader from '../../../layouts/loader/loader';

const EditTableAvailability = () => {
  const { availableId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availabilityTable, loading, error } = useSelector((state) => state.tableAvailability);

  const [availabilityData, setAvailabilityData] = useState([]);

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
          navigate(-1); 
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
    return <Loader/>;
  }


  if (error) {
    return <p>Error loading availability data</p>;
  }

  return (
    <section className='formUserDashboard'>

     <form onSubmit={handleSubmit}>
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

          <label>End Time:</label>
          <input
            className="form-control"
            type="time"
            value={availability.end_time || ''}
            onChange={(e) => handleAvailabilityChange(e, index, 'end_time')}
            required
          />

          <label>Status:</label>
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

      <button className="btn btn-primary col-12 my-4" type="submit">Update All Availabilities</button>

    </form>
    
    </section>
  );
};

export default EditTableAvailability;
