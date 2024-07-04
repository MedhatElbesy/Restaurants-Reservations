import { useSelector } from "react-redux";
import { formatTime } from "../../../utils";

const TimeAndAdditional = ({ table, selectedData, setSelectedData }) => {
  const { tableAvailability } = useSelector((state) => state.tableAvailability);
  const handleSelectTime = (id) => {
    const updatedData = { ...selectedData, availabilityId: id };
    setSelectedData(updatedData);
  };

  const handleSelectSeats = (extraSeats) => {
    const updatedData = { ...selectedData, extraSeats };
    setSelectedData(updatedData);
  };

  const handleSelectChildSeats = (childSeats) => {
    const updatedData = { ...selectedData, childSeats };
    setSelectedData(updatedData);
  };

  return (
    <article className="additional">
      {tableAvailability ? (
        <div className="time">
          <h4 className="text-center fs-5">Time</h4>
          <div className="d-flex flex-wrap">
            {tableAvailability.map((available) => (
              <p
                key={available.id}
                onClick={() => handleSelectTime(available.id)}
                className={`
                    ${
                      selectedData.availabilityId === available.id
                        ? "selected"
                        : ""
                    }`}
              >
                {`${formatTime(available.start_time)} `}-
                {`${formatTime(available.end_time)} `}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="not-available">No times available</p>
      )}

      {table.extra_number_of_chairs ? (
        <div className="extra-seats">
          <h4 className="text-center fs-5">Extra Seats</h4>
          <div className="d-flex flex-wrap justify-content-center">
            {Array.from({ length: table.extra_number_of_chairs }, (_, i) => (
              <p
                key={i}
                onClick={() => handleSelectSeats(i + 1)}
                className={`${
                  selectedData.extraSeats === i + 1 ? "selected" : ""
                }`}
              >
                {i + 1}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="not-available">No extra seats for this table</p>
      )}

      {table.extra_number_of_childs_chairs ? (
        <div className="child-seats mb-0">
          <h4 className="text-center fs-5">Extra Child Seats</h4>
          <div className="d-flex flex-wrap justify-content-center">
            {Array.from(
              { length: table.extra_number_of_childs_chairs },
              (_, i) => (
                <p
                  key={i}
                  onClick={() => handleSelectChildSeats(i + 1)}
                  className={`
                    ${selectedData.childSeats === i + 1 ? "selected" : ""} `}
                >
                  {i + 1}
                </p>
              )
            )}
          </div>
        </div>
      ) : (
        <p className="not-available">No extra child seats for this table</p>
      )}
    </article>
  );
};

export default TimeAndAdditional;
