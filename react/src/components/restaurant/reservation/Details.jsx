
function Details({ table, branch, restaurant }) {
  return (
    <>
      <p>
        <span>Restaurant :</span> {restaurant.name}
      </p>
      <p>
        <span>Branch:</span> {branch.city_name}
      </p>
      <p>
        <span>Rating :</span> {Number(branch.average_rating).toFixed(0)} Stars
      </p>
      <p>
        <span>Table No. :</span> {table.id}
      </p>
      <p>
        <span>Seats :</span> up to {table.max_number_of_persons} guests
      </p>
      {table.extra_number_of_chairs > 0 && (
        <p title="(extra charge)">
          <span>Extra Seats :</span> up to {table.extra_number_of_chairs} seat
          {table.extra_number_of_chairs > 1 && "s"}{" "}
        </p>
      )}
      {table.extra_number_of_childs_chairs > 0 && (
        <p title="(extra charge)">
          <span>Kiddy Seats :</span> {table.extra_number_of_childs_chairs}{" "}
          available{" "}
        </p>
      )}
    </>
  );
}

export default Details;
