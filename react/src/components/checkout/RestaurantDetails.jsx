const RestaurantDetials = ({branch}) => {
  const restaurant = JSON.parse(sessionStorage.getItem("restaurant"))
  return (
    <article className="restaurant-checkout-details my-5 w-75 m-auto">
      <div className="details">
        <p>
          <span>Restaurant Name : </span> {restaurant.name}
        </p>
        <p>
          <span>Restaurant Category : </span>{" "}
          {restaurant.title}
        </p>
        <p>
          <span>Branch : </span> {branch.cityId} Branch.
        </p>
        <p>
          <span>Branch Address : </span> {branch.address}, {branch.cityId},{" "}
          {branch.governorateId}, {branch.countryId}.
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
