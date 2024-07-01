# Restaurant Reservation System

A comprehensive restaurant reservation system built with Laravel for the backend and React for the frontend. This system allows users to manage restaurant reservations, view restaurant details, and handle various administrative tasks.

## Features

- [User Authentication and Authorization](#user-authentication-and-authorization)
- [Restaurant Management](#restaurant-management)
- [Reservation Management](#reservation-management)
- [Location Management](#location-management)
- [Menu and Category Management](#menu-and-category-management)
- [Responsive Frontend with React](#responsive-frontend-with-react)
- [RESTful API](#restful-api)

### User Authentication and Authorization
- **Registration and Login**: Users can register and log in to their accounts.
- **Role-based Access Control**: Different permissions for admin and regular users.

### Restaurant Management
- **CRUD Operations**: Create, read, update, and delete restaurant details.
- **Image Uploads**: Upload and manage images for restaurants and tables.
- **Category Management**: Assign and manage categories for each restaurant.

### Reservation Management
- **Reservation System**: Users can make reservations for tables at specific times.
- **Availability Check**: Check table availability before making a reservation.
- **Reservation History**: View past and upcoming reservations.

### Location Management
- **Location-Based Search**: Search for restaurants based on location.
- **Google Maps Integration**: Display restaurant locations on a map.

### Menu and Category Management
- **Menu Management**: Add and update restaurant menus.
- **Category Assignment**: Assign categories to menu items for better organization.

### Responsive Frontend with React
- **Responsive Design**: The frontend is designed to be responsive and user-friendly on all devices.
- **Real-time Updates**: Real-time updates for reservations and restaurant details.

### RESTful API
- **API Endpoints**: A set of RESTful API endpoints to manage all the features of the system.
here you can navigate the Api Postman documentation : https://documenter.getpostman.com/view/18989053/2sA3XQgMAK 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MedhatElbesy/Restaurants-Reservations.git
   cd Restaurants-Reservations

2. Install backend dependencies:
   ```bash
       composer install
   # Copy .env file
        cp .env.example .env
   # Generate an application key
        php artisan key:generate
   # Run the migrations and seed the database
        php artisan migrate --seed
   # Run the application
        php artisan serve

3. Install frontend dependencies     
    ```bash
       cd frontend
    # Install Dependancies
      npm install
   ```
4. Run the project
```bash
   npm run start
```
## Contributors

<div style="width: 100% align-items:center">
  <table style="width: 100%;">
    <thead>
      <tr>
        <th>Contributor</th>
        <th>Avatar</th>
        <th>Profile</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Medhat Elbesy</td>
        <td><img src="https://avatars.githubusercontent.com/u/152287116?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/MedhatElbesy">Medhat Elbesy</a></td>
      </tr>
      <tr>
        <td>Khaled Abdulbaset</td>
        <td><img src="https://avatars.githubusercontent.com/u/69148186?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/Khaled-Abdelbaset">Khaled Abdulbaset</a></td>
      </tr>
      <tr>
        <td>Mona Ali</td>
        <td><img src="https://avatars.githubusercontent.com/u/96702708?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/Mona-Ali-Mostafa98">Mona Ali</a></td>
      </tr>
      <tr>
        <td>Aya Adel</td>
        <td><img src="https://avatars.githubusercontent.com/u/156436119?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/ayaadel1346">Aya Adel</a></td>
      </tr>
      <tr>
        <td>Rehab Elsaied</td>
        <td><img src="https://avatars.githubusercontent.com/u/69490304?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/Rehab5">Rehab Elsaied</a></td>
      </tr>
      <tr>
        <td>Ahmed Nagy</td>
        <td><img src="https://avatars.githubusercontent.com/u/116142339?v=4" width="100" height="100"></td>
        <td><a href="https://github.com/Blitz576">Ahmed Nagy</a></td>
      </tr>
    </tbody>
  </table>
</div>


