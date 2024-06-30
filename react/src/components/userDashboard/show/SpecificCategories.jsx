import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SpecificCategories = () => {
  return (
    <section className='restaurant-details row my-5'>

      <h2 className='text-light text-center'>
        Your Special Categories
      <span>
          <Link to={`/user-dashboard/add-special-category`}>
            <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
          </Link>
        </span>
      </h2>
      
      <table className="locations my-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cover</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
       
      </table>
    </section>
  );
};

export default SpecificCategories;
