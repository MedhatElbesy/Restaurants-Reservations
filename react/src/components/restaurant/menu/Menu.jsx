import { useSelector } from "react-redux";
import Items from "./Items";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./menu.css";

export default function Menu() {
  const { menuCategories } = useSelector((state) => state.restaurant);
  console.log(menuCategories);

  return (
    <section className="full">
      {menuCategories.length > 0 ? (
        <Tabs defaultActiveKey={menuCategories[0].id} className="menu mb-3">
          {menuCategories.map((category) => (
            <Tab key={category.id} eventKey={category.id} title={category.name}>
              <div className="text-center my-4">
                <h2 className="text-sec sec-font">{category.name}</h2>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                )}
              </div>
              <div className="row justify-content-md-between justify-content-center py-3 px-5">
                {category.menu_items.length === 0 ? (
                  <p className="text-center text-color">
                    No items for this category
                  </p>
                ) : (
                  category.menu_items.map((item) => (
                    <Items key={item.id} item={item} />
                  ))
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <p className="text-center text-color fw-bold fs-4">No Menu Available</p>
      )}
    </section>
  );
}
