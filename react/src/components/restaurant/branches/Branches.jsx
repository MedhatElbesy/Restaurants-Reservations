import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Loader from "../../../layouts/loader/loader";
import { useBranch } from "./BranchContext";
import { BranchAddress } from "./BranchAddress";
import { BranchOpening } from "./BranchOpening";
import { BranchTables } from "./BranchTables";
import BranchComments from "../../review/comments/BranchComments";
import Tables from "../tables/TablesCollection";
import StarRating from "../../review/rating/Rating";
import { getRestaurantLocations } from "../../../slices/restaurant/location/locationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faUtensils, faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./Branches.css";
// import { fetchLocationByIdAsync } from "../../../slices/restaurant/location/locationSlice";

const Branches = () => {
  const dispatch = useDispatch();
  const [showTables, setShowTables] = useState([]);
  const { branch, setBranch } = useBranch();
  sessionStorage.setItem("branch", JSON.stringify(branch));
  const { restaurant } = useSelector((state) => state.restaurant);
  const { restaurantLocations: branches, status: branchStatus } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    dispatch(getRestaurantLocations(restaurant.id)).unwrap();
  }, [dispatch, restaurant.id]);

  useEffect(() => {
    if (branches.length > 0 && !branch) {
      setBranch(branches[0]);
    }
  }, [branches, branch, setBranch]);

  const handleShowTables = (show) => {
    setShowTables(show);
  };

  const handleSelect = (key) => {
    const selectedBranch = branches.find((branch) => branch.id == key);
    setBranch(selectedBranch);
    sessionStorage.setItem("branch", JSON.stringify(branch));
    setShowTables(false);
  };

  if (branchStatus === "loading" && !branch) {
    return <Loader />;
  }

  return (
    <section className="branches m-4">
      <Tabs
        activeKey={branch?.id}
        onSelect={handleSelect}
        className="br-tabs border-0"
      >
        {branches.length > 0 ? (
          branches.map((branch) => (
            <Tab key={branch.id} eventKey={branch.id} title={branch.city_name}>
              <h2 className="text-sec text-center sec-font mt-4">
                {branch.city_name}
              </h2>
              <div className="review py-4 flex-column flex-md-row d-flex justify-content-center align-items-center">
                <StarRating
                  readOnly={true}
                  initialRating={Number(branch.average_rating).toFixed(0)}
                  size={20}
                  rate={Number(branch.average_rating).toFixed(0)}
                />
                <p className="mx-2 m-2">
                  <FontAwesomeIcon icon={faMessage} /> {branch.comments_count}{" "}
                  Reviews
                </p>
                <p className="mx-2 m-2">
                  <FontAwesomeIcon icon={faUtensils} /> {restaurant.name}
                </p>
                <p className="mx-2 m-2">
                  <FontAwesomeIcon icon={faBookmark} />
                  <strong style={{ marginLeft: ".4rem" }}>
                    {branch.number_of_tables}
                  </strong>{" "}
                  Available Tables
                </p>
              </div>
              {showTables.length > 0 ? (
                <Tables tables={showTables} />
              ) : (
                <BranchDetails onShowTables={handleShowTables} />
              )}
            </Tab>
          ))
        ) : (
          <p className="text-center text-color">
            No Branches For this Restaurant
          </p>
        )}
      </Tabs>
    </section>
  );
};

const BranchDetails = ({ onShowTables }) => {
  const { branch } = useBranch();

  if (!branch) {
    return <Loader />;
  }

  return (
    <div className="row justify-content-md-between justify-content-center p-3">
      <BranchTables onShowTables={onShowTables} />
      <BranchOpening />
      <BranchAddress />
      <BranchComments />
    </div>
  );
};

export default Branches;
