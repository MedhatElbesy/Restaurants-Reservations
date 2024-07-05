import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserAddressAsync,
  updateUserAddressAsync
} from '../../../slices/user/userAddressSlice';
import {
  fetchCountriesAsync,
  selectCountries
} from '../../../slices/address/countrySlice';
import {
  fetchGovernoratesAsync,
  selectGovernorates
} from '../../../slices/address/governorateSlice';
import {
  fetchCitiesAsync,
  selectCities
} from '../../../slices/address/citySlice';
import {
  fetchStatesAsync,
  selectStates
} from '../../../slices/address/stateSlice';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const LocationMarker = ({ setFormData }) => {
  const [position, setPosition] = useState(null);

  const mapEvents = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setFormData(prevData => ({
        ...prevData,
        latitude: lat,
        longitude: lng,
      }));
    },
  });

  return position ? <Marker position={position} /> : null;
};

const EditUserAddress = () => {
  const { userId } = useSelector(state => state.auth);
  const { addressId } = useParams();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const governorates = useSelector(selectGovernorates);
  const cities = useSelector(selectCities);
  const states = useSelector(selectStates);
  const navigate = useNavigate();
  const userAddress = useSelector(state => state.userAddress.userAddress);

  const [formData, setFormData] = useState({
    address: '',
    country_id: '',
    governorate_id: '',
    city_id: '',
    state_id: '',
    zip: '',
    latitude: '',
    longitude: '',
    user_id: userId,
  });

  useEffect(() => {
    dispatch(fetchUserAddressAsync({ userId, addressId }));
    dispatch(fetchCountriesAsync());
  }, [userId, addressId]);

  useEffect(() => {
    if (userAddress) {
      setFormData(prevFormData => ({
        ...prevFormData,
        address: userAddress.address,
        country_id: userAddress.country_id,
        governorate_id: userAddress.governorate_id,
        city_id: userAddress.city_id,
        state_id: userAddress.state_id,
        zip: userAddress.zip,
        latitude: userAddress.latitude,
        longitude: userAddress.longitude,
        user_id: userId,
      }));
    }
  }, [userAddress, userId]);

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
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateUserAddressAsync({ userId, addressId, addressData: formData }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1); 
        }
      });
    
    } catch (error) {
      console.error('Error updating user address:', error);
    }
  };

  return (
    <main className="container">

    <section className='formUserDashboard'>

      <h2 className='text-center my-4'>Edit User Address</h2>

      <form onSubmit={handleSubmit}>
       
        <div className="mb-3">
          <label htmlFor="country_id" className="form-label">Country</label>
          <select
            className="form-control"
            id="country_id"
            name="country_id"
            value={formData.country_id}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries && countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-3">
          <label htmlFor="governorate_id" className="form-label">Governorate</label>
          <select
            className="form-control"
            id="governorate_id"
            name="governorate_id"
            value={formData.governorate_id}
            onChange={handleChange}
          >
            <option value="">Select Governorate</option>
            {governorates && governorates.map(governorate => (
              <option key={governorate.id} value={governorate.id}>{governorate.name}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-3">
          <label htmlFor="city_id" className="form-label">City</label>
          <select
            className="form-control"
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {cities && cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-3">
          <label htmlFor="state_id" className="form-label">State</label>
          <select
            className="form-control"
            id="state_id"
            name="state_id"
            value={formData.state_id}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states && states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>

       
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

       
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">Zip</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>

       
        <div className="mb-3">
          <label htmlFor="latitude" className="form-label">Latitude</label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>

       
        <div className="mb-3">
          <label htmlFor="longitude" className="form-label">Longitude</label>
          <input
            type="text"
            className="form-control"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

       
        <section className="mb-3">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setFormData={setFormData} />
            <ZoomControl position="bottomright" />
          </MapContainer>
        </section>

        <button type="submit" className="btn btn-warning my-4 col-12">Update Address</button>

      </form>

    </section>
    
  </main>
  );
};

export default EditUserAddress;
