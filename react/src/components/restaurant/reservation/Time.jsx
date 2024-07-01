import { useEffect, useState } from "react"; // Import useState for managing selected time
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useBranch } from "../branches/BranchContext";
import { getTableAvailability } from "../../../slices/restaurant/table/availabilitySlice";

const TimeAndAdditional = ({ onSelectTime }) => {
  const dispatch = useDispatch();
  const { branch } = useBranch();
  const { tableId } = useParams();
  const { tableAvailability } = useSelector((state) => state.tableAvailability);
  const [selectedId, setSelectedId] = useState(null); // State to store selected time id
  const table = branch.tables.find((table) => table.id == tableId);

  useEffect(() => {
    dispatch(getTableAvailability(tableId));
  }, [dispatch, tableId]);

  const handleSelectTime = (id) => {
    setSelectedId(id);
    onSelectTime(id); // Pass selected id to parent component
  };

  return (
    <article>
      <div className="additional">
        {tableAvailability ? (
          <div className="time">
            <h4 className="text-center fs-5">Time</h4>
            <div className=" d-flex flex-wrap justify-content-center">
              {tableAvailability.map((available) => (
                <p
                  key={available.id}
                  onClick={() => handleSelectTime(available.id)}
                  className={selectedId === available.id ? "selected" : ""}
                >
                  {available.start_time}-{available.end_time}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p>No times available</p>
        )}
        {table.extra_number_of_chairs ? (
          <div className="time d-flex flex-wrap justify-content-center">
            {tableAvailability.map((available) => (
              <p
                key={available.id}
                onClick={() => handleSelectTime(available.id)}
                className={selectedId === available.id ? "selected" : ""}
              >
                {available.start_time}-{available.end_time}
              </p>
            ))}
          </div>
        ) : (
          <p>No extra seats for this table</p>
        )}
      </div>
    </article>
  );
};

export default TimeAndAdditional;
