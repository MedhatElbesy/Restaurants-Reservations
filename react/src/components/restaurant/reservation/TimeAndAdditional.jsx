import { useSelector } from "react-redux";
import { formatTime } from "../../../helpers/utils";
import { useEffect } from "react";

const TimeAndAdditional = ({ table, selectedData, setSelectedData }) => {
  const { tableAvailability } = useSelector((state) => state.tableAvailability);

  useEffect(() => {
    const savedData = sessionStorage.getItem("selectedData");
    if (savedData) {
      setSelectedData(JSON.parse(savedData));
    }
  }, [setSelectedData]);

  useEffect(() => {
    if (
      !JSON.parse(sessionStorage.getItem("selectedData"))?.availabilityId ||
      !JSON.parse(sessionStorage.getItem("selectedData"))?.childSeats ||
      !JSON.parse(sessionStorage.getItem("selectedData"))?.extraSeats
    ) {
      sessionStorage.setItem("selectedData", JSON.stringify(selectedData));
    }
  }, [selectedData]);

  const handleSelectTime = (id) => {
    const updatedData = {
      ...selectedData,
      availabilityId: selectedData.availabilityId === id ? null : id,
    };
    setSelectedData(updatedData);
  };

  const handleSelectSeats = (extraSeats) => {
    const updatedData = {
      ...selectedData,
      extraSeats: selectedData.extraSeats === extraSeats ? null : extraSeats,
    };
    setSelectedData(updatedData);
  };

  const handleSelectChildSeats = (childSeats) => {
    const updatedData = {
      ...selectedData,
      childSeats: selectedData.childSeats === childSeats ? null : childSeats,
    };  
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
                className={`${
                  selectedData.availabilityId === available.id ? "selected" : ""
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
                  className={`${
                    selectedData.childSeats === i + 1 ? "selected" : ""
                  }`}
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
