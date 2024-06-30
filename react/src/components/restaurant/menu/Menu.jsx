import { useSelector } from "react-redux";
import Items from "./Items";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./menu.css"

export default function Menu() {
  const { menuCategories } = useSelector((state) => state.restaurant);

  return (
    <section className="">
      <Tabs
        defaultActiveKey={menuCategories[0].id}
        className="menu mb-3"
      >
        {menuCategories.length > 0 &&
          menuCategories.map((category) => {
            return (
              <Tab
                key={category.id}
                eventKey={category.id}
                title={category.name}
              >
                <h2 className="text-sec sec-font text-center my-4">
                  {category.name}
                </h2>
                <img src={category} alt="" />
                <div className="row justify-content-md-between justify-content-center py-3 px-5">
                  {category.menu_items.length == 0 ? (
                    <p className="text-center text-color">No items for this category</p>
                  ) : (
                    category.menu_items.map((item) => (
                      <Items key={item.id} item={item} />
                    ))
                  )}
                </div>
              </Tab>
            );
          })}
      </Tabs>
    </section>
  );
}
