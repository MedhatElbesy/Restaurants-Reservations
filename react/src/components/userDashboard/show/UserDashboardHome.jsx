import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Loader from '../../../layouts/loader/loader';

export default function UserDashboardHome() {
  const { restaurant } = useOutletContext();
  const status = restaurant ? 'succeeded' : 'loading';

  
  const chartData = {
    labels: ['Locations', 'Average Rating', 'Comments'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          restaurant?.locations ? restaurant.locations.length : 0,
          restaurant?.average_rating || 0,
          restaurant?.total_comments_count || 0
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 159, 64, 0.2)', 
          'rgba(153, 102, 255, 0.2)' 
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };


  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <main className="my-5 mx-5">

      {status === 'succeeded' && restaurant ? (
        <section className=" my-5">

          <div className="row mx-1">

              <section className="userdashboard-card col-md-3 col-12 my-3 text-white ">
                
                  <h5 className="card-title text-dark">Comments</h5>
                  <p className="card-text   my-2 text-dark">{restaurant.total_comments_count || 0}</p>
               
              </section>

            
              <section className="userdashboard-card mx-md-5 mx-1 my-3 col-md-3 col-12 text-white ">
                
                  <h5 className="card-title text-dark">Locations</h5>
                  <p className="card-text my-2 text-dark">{restaurant.locations ? restaurant.locations.length : 0}</p>
              
              </section>
           
           
              <section className="userdashboard-card  mx-1 my-3 col-md-3 col-12  text-white">
                
                  <h5 className="card-title text-dark">Average Rating</h5>
                  <p className="card-text my-2 text-dark">{restaurant.average_rating || 0}</p>
               
              </section>


            </div>
         
          <div className=" row my-5">
            <Bar className='col-12' data={chartData} options={chartOptions} />
          </div>

        </section>
      ) : (
        <p>No restaurant data found.</p>
      )}
    </main>
  );
}
