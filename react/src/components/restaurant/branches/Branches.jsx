import { useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Branches.css";
import Branch from "./Branch";
import {BranchOpening} from "./BranchOpening";
import { BranchTables } from "./BranchTables";

export default function Branches() {
  const { locations: branches } = useSelector((state) => state.restaurant);
  return (
    <section className="branches d-flex justify-content-between m-4">
      <Tabs defaultActiveKey={branches[0].id} className="br-tabs border-0">
        {branches.length > 0 ? (
          branches.map((branch) => {
            return (
              <Tab
                key={branch.id}
                eventKey={branch.id}
                title={branch.city.name}
              >
                <h2 className="text-sec sec-font my-4">
                  {branch.city.name} Branch
                </h2>
                <div className="row justify-content-md-between justify-content-center p-3">
                  <Branch key={branch.id} branch={branch} />
                  <BranchOpening key={branch.id} branch={branch} />
                  <BranchTables key={branch.id} branch={branch} />
                </div>
              </Tab>
            );
          })
        ) : (
          <p className="text-center text-color">
            No Branches For this Restaurant
          </p>
        )}
      </Tabs>
    </section>
  );
}
