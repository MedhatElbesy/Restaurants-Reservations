import { useBranch } from "./BranchContext";
import Image from "react-bootstrap/Image";
export function BranchTables({ onShowTables }) {
  const { branch } = useBranch();
  return (
    <article className=" py-5 border-bottom">
      <div className="opening mx-0 d-flex justify-content-between">
        <div className="image col-6">
          <Image
            src="https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg"
            style={{ height: "350px", width: "100%" }}
            thumbnail
          />
        </div>
        <div className="col-5 d-flex flex-column justify-content-between">
          <h3 className="text-center fs-1 text-sec mb-3 p-3">
            Avialable Tables
          </h3>
          <p className="text-color">
            Reserve a table for your dining experience at our restaurant and
            enjoy a delightful meal in an elegant and cozy atmosphere
          </p>
          <p className="text-main fs-4">
            <span className="text-sec fs-2">{branch.number_of_tables}</span>{" "}
            Avilable Tables
          </p>
          <div>
            <button
              onClick={() => onShowTables(true)}
              className="reserver-button px-3 py-2 fs-6 mt-3"
            >
              Reserve Table Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
