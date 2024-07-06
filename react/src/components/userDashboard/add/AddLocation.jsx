import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationAsync } from '../../../slices/restaurant/location/locationSlice';
import { fetchCountriesAsync, selectCountries } from '../../../slices/address/countrySlice';
import { fetchGovernoratesAsync, selectGovernorates } from '../../../slices/address/governorateSlice';
import { fetchCitiesAsync, selectCities } from '../../../slices/address/citySlice';
import { fetchStatesAsync, selectStates } from '../../../slices/address/stateSlice';
import Loader from '../../../layouts/loader/loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate, useParams } from 'react-router-dom';

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
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const AddLocation = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const governorates = useSelector(selectGovernorates);
  const cities = useSelector(selectCities);
  const states = useSelector(selectStates);
  const locationStatus = useSelector((state) => state.location.status);
  const {error} = useSelector((state) => state.location);
  const navigate = useNavigate();

  const [position, setPosition] = useState(null);
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);
  const [images, setImages] = useState([]);


  

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
    status: 'Opened',
    country_id: '',
    governorate_id: '',
    city_id: '',
    state_id: '',
  });

  useEffect(() => {
    dispatch(fetchCountriesAsync())
    ;
  }, []);

  useEffect(() => {
    if (formData.country_id) {
      dispatch(fetchGovernoratesAsync(Number(formData.country_id)));
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.governorate_id) {
      dispatch(fetchCitiesAsync(Number(formData.governorate_id)));
    }
  }, [formData.governorate_id]);

  useEffect(() => {
    if (formData.city_id) {
      dispatch(fetchStatesAsync(Number(formData.city_id)));
    }
  }, [formData.city_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'zip' ? parseInt(value, 10) : value;
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
    const maxSizeInBytes = 2048 * 1024; 
  
    const isValidFiles = files.every(file => {
      const sizeInBytes = file.size;
      return sizeInBytes <= maxSizeInBytes;
    });
  
    if (!isValidFiles) {
      alert('Please upload images with size up to 2 MB.');
      return;
    }
  
   
    setImages(files);
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('address', formData.address);
    formDataToSend.append('zip', formData.zip);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('longitude', formData.longitude);
    formDataToSend.append('opening_time', formData.opening_time);
    formDataToSend.append('closed_time', formData.closed_time);
    formDataToSend.append('closed_days', JSON.stringify(formData.closed_days));
    formDataToSend.append('number_of_tables', formData.number_of_tables);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('mobile_number', formData.mobile_number);
    formDataToSend.append('status', capitalizeFirstLetter(formData.status));
    formDataToSend.append('restaurant_id', restaurantId);
    formDataToSend.append('country_id', formData.country_id);
    formDataToSend.append('governorate_id', formData.governorate_id);
    formDataToSend.append('city_id', formData.city_id);
    formDataToSend.append('state_id', formData.state_id);
    images.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });
  
    try {
      const resultAction = await dispatch(addLocationAsync(formDataToSend));
  
      if (resultAction.meta.requestStatus === 'fulfilled') {
        navigate(-1);
      } else {
          
         alert('An error occurred ,please enter unique number'); 
        
      }
    }  catch (error) {
      console.error('Error adding location:', error);
    }
    
  };
  
  if (locationStatus === 'loading') {
    return <Loader />;
  }

  return (
 <main className="container">

   <section className='formUserDashboard'>

      <h2 className='text-center my-5'>Add Location</h2>

      <form onSubmit={handleSubmit}>
        
        {countries && countries.length > 0 && (
          <div className="mb-3">

            <label
             htmlFor="country_id"
             className="form-label">
              Country
            </label>

            <select
              className="form-control"
              id="country_id"
              required
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option 
                  key={country.id}
                  value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}


        {governorates && (
          <div className="mb-3">

            <label 
             htmlFor="governorate_id" 
             className="form-label">
              Governorate
            </label>

            <select
              className="form-control"
              id="governorate_id"
              required
              name="governorate_id"
              value={formData.governorate_id}
              onChange={handleChange}
            >
              <option value="">Select Governorate</option>
              {governorates.map(governorate => (
                <option 
                 key={governorate.id} 
                 value={governorate.id}>
                  {governorate.name}
                </option>
              ))}
            </select>

          </div>
        )}


        {cities && (
          <div className="mb-3">

            <label 
             htmlFor="city_id" 
             className="form-label">
              City
            </label>

            <select
              className="form-control"
              id="city_id"
              required
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option 
                  key={city.id} 
                  value={city.id}>
                    {city.name}
                </option>
              ))}
            </select>

          </div>
        )}

        {states && (
          <div className="mb-3">

            <label 
             htmlFor="state_id" 
             className="form-label">
              State
            </label>

            <select
              className="form-control"
              id="state_id"
              name="state_id"
              required
              value={formData.state_id}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option 
                 key={state.id} 
                 value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zip" className="form-label">Zip Code</label>
          <input
            type="number"
            className="form-control"
            id="zip"
            name="zip"
            required
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="latitude" className="form-label">Latitude</label>
            <input
              type="text"
              className="form-control"
              id="latitude"
              required
              name="latitude"
              value={formData.latitude}
              onChange={handleLatLngChange}
            />
          </div>

          <div className="col">
            <label htmlFor="longitude" className="form-label">Longitude</label>
            <input
              type="text"
              className="form-control"
              id="longitude"
              name="longitude"
              required
              value={formData.longitude}
              onChange={handleLatLngChange}
            />
          </div>
        </div>

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
          <label htmlFor="closed_days" className="form-label">Closed Days</label>
          <select
            multiple
            required
            className="form-control"
            id="closed_days"
            name="closed_days"
            value={formData.closed_days}
            onChange={(e) => setFormData({
              ...formData,
              closed_days: [...e.target.selectedOptions].map(option => option.value),
            })}
          >
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
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
          <label htmlFor="opening_time" className="form-label">Opening Time</label>
          <DatePicker
            selected={openingTime}
            onChange={(time) => handleTimeChange(time, 'opening')}
            showTimeSelect
            required
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control mx-1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="closing_time" className="form-label">Closing Time</label>
          <DatePicker
            selected={closingTime}
            onChange={(time) => handleTimeChange(time, 'closing')}
            showTimeSelect
            required
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control mx-1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            name="phone_number"
            required
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
            name="mobile_number"
            required
            value={formData.mobile_number}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Opened">Opened</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

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

        <button type="submit" className="btn btn-warning col-12">Add Location</button>
      </form>

      </section>
    </main>
  );
};

export default AddLocation;
