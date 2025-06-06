import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "@/public/assets/assets";
import Image from "next/image";
import { BorderBeam } from "../magicui/border-beam";

const ExploreMenu = ({ category, setCategory }) => {
	return (
		<div className="explore-menu" id="explore-menu">
			<h1 className="font-bold">Languages supported</h1>
			<p className="explore-menu-text">codes with your buddies in real time</p>
			<div className="explore-menu-list">
				{menu_list.map((item, index) => {
					return (
						<div
							onClick={() =>
								setCategory((prev) =>
									prev == item.menu_name ? "All" : item.menu_name
								)
							}
							key={index}
							className="explore-menu-list-item"
						>
							<Image
								className={category === item.menu_name ? "active" : ""}
								src={item.menu_image}
								alt=""
							/>
							<p>{item.menu_name}</p>
						</div>
					);
				})}
			</div>
			<hr />
			<codenow />
		</div>
	);
};
export default ExploreMenu;
