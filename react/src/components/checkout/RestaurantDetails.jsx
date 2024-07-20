const RestaurantDetials = ({branch}) => {
  const restaurant = JSON.parse(sessionStorage.getItem("restaurant"))
  console.log(restaurant)
  return (
    <article className="restaurant-checkout-details my-5 w-75 m-auto">
      <div className="details">
        <p>
          <span>Restaurant Name : </span> {restaurant.name}
        </p>
        <p>
          <span>Restaurant Category : </span> {restaurant.categories[0]}
        </p>
        <p>
          <span>Branch : </span> {branch.city_name}.
        </p>
        <p>
          <span>Branch Address : </span> {branch.address}, {branch.city_name},{" "}
          {branch.governorate_name}.
        </p>
        <p>
          <span>Contact Number : </span>
          {branch.phone_number}
        </p>
      </div>
    </article>
  );
};

export default RestaurantDetials;
