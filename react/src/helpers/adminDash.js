// Save cities to local storage
const saveCitiesToLocalStorage = (cities) => {
    localStorage.setItem('cities', JSON.stringify(cities));
  };
  
  // Load cities from local storage
  const loadCitiesFromLocalStorage = () => {
    const cities = localStorage.getItem('cities');
    return cities ? JSON.parse(cities) : [];
  };
  
  // Add or update city in local storage
  const addOrUpdateCityInLocalStorage = (city) => {
    let cities = loadCitiesFromLocalStorage();
    if (city.id) {
      // Update existing city
      cities = cities.map(c => c.id === city.id ? city : c);
    } else {
      // Add new city
      city.id = Date.now(); // simple unique ID
      cities.push(city);
    }
    saveCitiesToLocalStorage(cities);
  };
  
  // Delete city from local storage
  const deleteCityFromLocalStorage = (id) => {
    const cities = loadCitiesFromLocalStorage().filter(city => city.id !== id);
    saveCitiesToLocalStorage(cities);
  };
  