const RestaurantDetials = ({restaurant, branch}) => {
  return (
    <article className="restaurant-checkout-details my-5 w-75 m-auto">
      <div className="details">
        <p>
          <span>Restaurant Name : </span> {restaurant.name}
        </p>
        <p>
          <span>Restaurant Category : </span>{" "}
          {restaurant.categories.map((category) => (
            <span key={category.id}>{category.name}, </span>
          ))}
        </p>
        <p>
          <span>Branch : </span> {branch.city.name} Branch.
        </p>
        <p>
          <span>Branch Address : </span> {branch.address}, {branch.city.name},{" "}
          {branch.governorate.name}, {branch.country.name}.
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
