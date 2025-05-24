import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import ShinyButton from "../magicui/shiny-button";
import Link from "next/link";
import { set } from "date-fns";

const Navbar = () => {
	const [menu, setMenu] = useState("home");
	const handleScroll = (section) => {
		document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="navbar">
			<Image src={assets.logo} className="logo" />
			<ul className="navbar-menu">
				<li
					onClick={() => {
						handleScroll("home");
						setMenu("home");
					}}
					className={menu === "home" ? "active" : ""}
				>
					Home
				</li>
				<li
					onClick={() => {
						handleScroll("explore-menu");
						setMenu("explore-menu");
					}}
					className={menu === "explore-menu" ? "active" : ""}
				>
					Menu
				</li>
				<li
					onClick={() => {
						handleScroll("footer");
						setMenu("footer");
					}}
					className={menu === "footer" ? "active" : ""}
				>
					Contact us
				</li>
			</ul>
			<Link
				href="/signup"
				className="opacity-0 pointer-events-none"
				onClick={(e) => e.preventDefault()}
			>
				<ShinyButton text="Sign up" />
			</Link>
		</div>
	);
};

export default Navbar;
