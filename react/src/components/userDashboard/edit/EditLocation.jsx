import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLocationByIdAsync, updateLocationAsync } from '../../../slices/restaurant/location/locationSlice';
import Loader from '../../../layouts/loader/loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Alert } from 'react-bootstrap';


const LocationMarker = ({ position, setPosition, setFormData }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setFormData(prevData => ({
        ...prevData,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return position ? <Marker position={position} /> : null;
};


const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string' || string.length === 0) return ''; 
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


const EditLocation = () => {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useSelector((state) => state.location.location);
  const status = useSelector((state) => state.location.status);
  const error = useSelector((state) => state.location.error);
  const [position, setPosition] = useState(null);
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);

  const [formData, setFormData] = useState({
    address: '',
    zip: '',
    latitude: '',
    longitude: '',
    opening_time: '',
    closed_time: '',
    closed_days: [],
    number_of_tables: '',
    phone_number: '',
    mobile_number: '',
    status: '',
    country_id: 0,
    governorate_id: 0,
    city_id: 0,
    state_id: 0,
    images: [], 
  });

 

  useEffect(() => {
    if (locationId) {
      dispatch(fetchLocationByIdAsync(locationId))
        .then((result) => {
          console.log('Location fetched:', result);
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }
  }, [locationId]);


  useEffect(() => {
    if (location) {
      setFormData({
        address: location.address || '',
        zip: String(location.zip) || '',
        latitude: location.latitude || '',
        longitude: location.longitude || '',
        opening_time: location.opening_time || '',
        closed_time: location.closed_time || '',
        closed_days: location.closed_days || [],
        number_of_tables: location.number_of_tables || '',
        phone_number: location.phone_number || '',
        mobile_number: location.mobile_number || '',
        status: capitalizeFirstLetter(location.status) || '',
        country_id: location.country_id || 2,
        governorate_id: location.governorate_id || 1,
        city_id: location.city_id || 3,
        state_id: location.state_id || 1,
      });


      if (location.opening_time) {
        const openingTimeParts = location.opening_time.split(':');
        const openingDate = new Date();
        openingDate.setHours(parseInt(openingTimeParts[0], 10));
        openingDate.setMinutes(parseInt(openingTimeParts[1], 10));
        openingDate.setSeconds(parseInt(openingTimeParts[2], 10));
        setOpeningTime(openingDate);
      } else {
        setOpeningTime(null);
      }

      if (location.closed_time) {
        const closingTimeParts = location.closed_time.split(':');
        const closingDate = new Date();
        closingDate.setHours(parseInt(closingTimeParts[0], 10));
        closingDate.setMinutes(parseInt(closingTimeParts[1], 10));
        closingDate.setSeconds(parseInt(closingTimeParts[2], 10));
        setClosingTime(closingDate);
      } else {
        setClosingTime(null);
      }

      if (location.latitude && location.longitude) {
        setPosition({ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) });
      } else {
        setPosition(null);
      }
    }
  }, [location]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'zip' ? String(value) : value;
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };


  const handleLatLngChange = (e) => {
    const { name, value } = e.target;
    const newPosition = { ...position, [name]: parseFloat(value) };
    setPosition(newPosition);
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleTimeChange = (time, type) => {
    const formattedTime = time.toISOString().substr(11, 8);
    if (type === 'opening') {
      setOpeningTime(time);
      setFormData({
        ...formData,
        opening_time: formattedTime,
      });
    } else {
      setClosingTime(time);
      setFormData({
        ...formData,
        closed_time: formattedTime,
      });
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
  
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'svg'];
  
    files.forEach((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      if (file.size <= 2 * 1024 * 1024 && allowedExtensions.includes(extension)) {
        validFiles.push(file);
      } else {
        alert(`img is not valid. Ensure it is an image with extension 'jpeg', 'jpg', 'png', 'gif', 'svg'  and does not exceed 2MB.`);
      }
    });
  
    setFormData({
      ...formData,
      images: validFiles,
    });
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImages = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData[key].forEach((file, index) => {
          formDataWithImages.append(`images[${index}]`, file);
        });
      } else {
        formDataWithImages.append(key, formData[key]);
      }
    });

    formDataWithImages.append('restaurant_id', location.restaurant_id);
    formDataWithImages.append('status', capitalizeFirstLetter(formData.status));

    dispatch(updateLocationAsync({ locationId, data: formDataWithImages }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };


  if (status === 'loading') {
    return <Loader />;
  }



  return location ? (
  <main className="container">

   <section className='formUserDashboard'>

      <h2  className='text-center my-4'>Edit Location</h2>

      <form onSubmit={handleSubmit}>
      {status === 'failed' && (
          <Alert variant="danger">
            <p>please enter unique number</p>
          </Alert>
        )}

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input 
            type="text" 
            required
            className="form-control" 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zip" className="form-label">Zip Code</label>
          <input 
            type="number" 
            required
            className="form-control" 
            id="zip" 
            name="zip" 
            value={formData.zip} 
            onChange={handleChange} 
          />
        </div>

        <section className="row mb-3">

          <div className="col">
            <label htmlFor="latitude" className="form-label">Latitude</label>
            <input 
              type="text" 
              required
              readOnly
              className="form-control" 
              id="latitude" 
              name="latitude" 
              value={formData.latitude} 
              onChange={handleLatLngChange} 
            />
          </div>

          <div className="col">
            <label htmlFor="longitude" className="form-label">Longitude</label>
            <input 
              type="text" 
              readOnly
              className="form-control" 
              id="longitude" 
              name="longitude" 
              value={formData.longitude} 
              onChange={handleLatLngChange} 
            />
          </div>

        </section>

        <section className="row mb-3">
          <div className="col">
            <MapContainer center={position || [51.505, -0.09]} zoom={13} style={{ height: '200px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker position={position} setPosition={setPosition} setFormData={setFormData} />
            </MapContainer>
          </div>
        </section>
        
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Images</label>
          <input 
            type="file" 
            className="form-control" 
            id="images" 
            name="images" 
            accept="image/*"
            multiple 
            onChange={handleFileChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="closed_days" className="form-label">Closed Days</label>
          <select 
            multiple
            className="form-control" 
            id="closed_days" 
            name="closed_days" 
            value={formData.closed_days} 
            onChange={(e) => setFormData({
              ...formData,
              closed_days: [...e.target.selectedOptions].map(option => option.value),
            })}
          >
           <option value="Sunday" selected={formData.closed_days.includes("Sunday")}>Sunday</option>
           <option value="Monday" selected={formData.closed_days.includes("Monday")}>Monday</option>
           <option value="Tuesday" selected={formData.closed_days.includes("Tuesday")}>Tuesday</option>
           <option value="Wednesday" selected={formData.closed_days.includes("Wednesday")}>Wednesday</option>
           <option value="Thursday" selected={formData.closed_days.includes("Thursday")}>Thursday</option>
           <option value="Friday" selected={formData.closed_days.includes("Friday")}>Friday</option>
           <option value="Saturday" selected={formData.closed_days.includes("Saturday")}>Saturday</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="number_of_tables" className="form-label">Number of Tables</label>
          <input 
            type="number" 
            required
            className="form-control" 
            id="number_of_tables" 
            name="number_of_tables" 
            value={formData.number_of_tables} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="opening_time" className="form-label mx-3">Opening Time</label>
          <DatePicker
            selected={openingTime}
            onChange={(time) => handleTimeChange(time, 'opening')}
            showTimeSelect
            showTimeSelectOnly
            required
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="closed_time" className="form-label mx-3">Closing Time</label>
          <DatePicker
            selected={closingTime}
            onChange={(time) => handleTimeChange(time, 'closing')}
            showTimeSelect
            required
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input 
            type="tel" 
            required
            className="form-control" 
            id="phone_number" 
            name="phone_number" 
            value={formData.phone_number} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
          <input 
            type="tel" 
            className="form-control" 
            id="mobile_number" 
            required
            name="mobile_number" 
            value={formData.mobile_number} 
            onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select 
            className="form-control" 
            id="status" 
            required
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="Opened">Opened</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning my-4 col-12">Update</button>

      </form>
      </section>
    </main>
  ) : (
    <Loader />
  );
};

export default EditLocation;
