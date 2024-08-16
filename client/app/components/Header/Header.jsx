"use client";
import React from "react";
import Link from "next/link";
import "./Header.css";
import { CardWithForm } from "../CreateRepel/createrepel";
import { PopoverDemo } from "./clicktoopen";

function Header() {
  return (
    <div className="header">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="header-contents">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <h1>Collaborative Coding</h1>
      </div>
      <div className="header-card">
      </div>
      <div className="codenowbutton">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <PopoverDemo />
      </div>
    </div>
  );
}

export default Header;
