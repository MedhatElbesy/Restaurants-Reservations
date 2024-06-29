import { useState } from "react";
import { useSelector } from "react-redux";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { BranchAddress } from "./BranchAddress";
import { BranchOpening } from "./BranchOpening";
import { BranchTables } from "./BranchTables";

import Tables from "../tables/TablesCollection";
import "./Branches.css";

export default function Branches() {
  const { locations: branches } = useSelector((state) => state.restaurant);
  const [showTables, setShowTables] = useState(false);

  function handelShowTables(show) {
    setShowTables(() => show);
  }

  return (
    <section className="branches m-4">
      <Tabs
        defaultActiveKey={branches[0].id}
        onSelect={() => handelShowTables(false)}
        className="br-tabs border-0"
      >
        {branches.length > 0 ? (
          branches.map((branch) => {
            return (
              <Tab
                key={branch.id}
                eventKey={branch.id}
                title={branch.city.name}
              >
                <h2 className="text-sec text-center sec-font mt-4">
                  {branch.city.name} Branch
                </h2>
                {showTables ? (
                  <Tables tables={branch.tables} />
                ) : (
                  <BranchDetails
                    onShowTables={handelShowTables}
                    branch={branch}
                  />
                )}
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

function BranchDetails({ onShowTables, branch }) {
  return (
    <div className="row justify-content-md-between justify-content-center p-3">
      <BranchTables onShowTables={onShowTables} branch={branch} />
      <BranchOpening branch={branch} />
      <BranchAddress branch={branch} />
    </div>
  );
}
