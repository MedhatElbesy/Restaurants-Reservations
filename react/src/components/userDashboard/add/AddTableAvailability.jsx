import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTableAvailability } from '../../../slices/restaurant/table/availabilitySlice';

const AddAvailabilityForm = () => {
  const { tableId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = (e) => {
    e.preventDefault();
    const availableData = {table_id:tableId, start_time: startTime, end_time: endTime, status };
    console.log('Submitting availability data:', { tableId, availableData });
    dispatch(addTableAvailability( availableData))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };

  return (

    <section className='formUserDashboard'>

     <form onSubmit={handleSubmit}>

      <div>
        <label>Start Time:</label>
        <input
          className="form-control"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          className="form-control"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Status:</label>
        <select 
         className="form-control" 
         value={status} 
         onChange={(e) => setStatus(e.target.value)} 
         required
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
          
        </select>
      </div>

      <button className="btn btn-primary col-12 my-4" type="submit">Add Availability</button>
    </form>
    </section>
  );
};

export default AddAvailabilityForm;
