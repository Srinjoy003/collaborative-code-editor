import React from "react";
import "./languages.css";
import { menu_list } from "@/public/assets/assets";
import Image from "next/image";

const ExploreMenu2 = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-list2">
        {menu_list.map((item, index) => {
          const isActive = category === item;
          return (
            <div
              onClick={() => setCategory((prev) => prev === item ? "All" : item)}
              key={index}
              className={`explore-menu-list-item ${isActive ? 'active' : ''}`}
            >
              <Image
                className={isActive ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
export default ExploreMenu2;
