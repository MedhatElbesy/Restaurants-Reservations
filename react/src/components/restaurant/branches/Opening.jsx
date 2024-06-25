import {openingDays} from "../../../utils"
export default function Opening() {
  return (
    <section className="row flex-column justify-content-between p-md-5 p-3">
      <h2 className="text-sec">Opening Hours</h2>
      <p className="text-main">
        You can make an order and reserve a table at our opening hours.
      </p>
      <div className="days">
        <span>{openingDays[0]}</span> -{" "}
        <span>{openingDays[openingDays.length - 1]}</span>: 
      </div>
    </section>
  );
}
