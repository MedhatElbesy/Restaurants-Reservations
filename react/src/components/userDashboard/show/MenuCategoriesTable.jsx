import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MenuCategoriesTable = ({ restaurant, handleDelete, handleDeleteItem }) => {
  return (
    <section className='restaurant-details row my-5'>

      <h2 className='text-light text-center'>
        Menu Categories
        <span>
          <Link to={`/user-dashboard/add-category/${restaurant.id}`}>
            <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
          </Link>
        </span>
      </h2>

      <table className="locations my-2">

        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
            <th>Menu Items</th>
          </tr>
        </thead>

        <tbody>
          {restaurant.menu_categories && restaurant.menu_categories.map((menuCategory) => (
            <tr key={menuCategory.id}>

              <td>{menuCategory.name}</td>

              <td>
                <Link to={`/user-dashboard/edit-menu-category/${menuCategory.id}`}>
                  <FontAwesomeIcon icon={faEdit} className="text-success" />
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(menuCategory.id)}
                  className="text-danger mx-5"
                />
              </td>

              <td>
              <Link to={`/user-dashboard/add-item/${menuCategory.id}`}>
                  <FontAwesomeIcon icon={faPlus} className="text-success h5" />
              </Link>
                {menuCategory.menu_items && menuCategory.menu_items.length > 0 ? (
                  <table className="locations my-4 col-12">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuCategory.menu_items.map((menuItem) => (
                        <tr key={menuItem.id}>
                          <td>{menuItem.name}</td>
                          <td>{menuItem.slug}</td>
                          <td>{menuItem.description}</td>
                          <td>{menuItem.price}</td>
                          <td>{menuItem.sale_price}</td>
                          <td>{menuItem.status}</td>
                          <td>
                            <Link to={`/user-dashboard/edit-menu-item/${menuItem.id}`}>
                              <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                            </Link>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDeleteItem(menuItem.id)}
                              className="text-danger mx-5"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>No menu items available</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MenuCategoriesTable;
