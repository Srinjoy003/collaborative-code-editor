"use client";
import React from "react";
import Link from "next/link";
import "./Header.css";
import { CardWithForm } from "../CreateRepel/createrepel";
import { PopoverDemo } from "./clicktoopen";

function Header() {
	return (
		<div className="header z-50 flex flex-col gap-10" id='home'>
			<div className="header-contents">
				<h1>Collaborative Coding</h1>
			</div>
			<div className="header-card"></div>
			<div className="codenowbutton" >
				<PopoverDemo />
				
			</div>
		</div>
	);
}

export default Header;
