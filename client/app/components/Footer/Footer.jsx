import React from "react";
import "./Footer.css";
import { assets } from "@/public/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Image src={assets.logo1} alt="logo" width="100" height="80"/>
          <p>Revolutionizes software development by enabling real-time, collaborative coding, empowering teams globally to build innovative applications with integrated live editing and instant feedback.</p>
          <div className="footer-social-icons">
            <Image src={assets.facebook_icon} alt="" />
            <Image src={assets.linkedin_icon} alt="" />
            <Image src={assets.twitter_icon} alt="" />
          </div>
        </div> 
        <div className="footer-content-center">
       <ul>
        <h2>COMPANY</h2>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Privacy Policy</li>
       </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH </h2>
          <ul>
            <li>8100500855</li>
            <li>noobdrawsdoodlet@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer_copyright">
      Copyright
      </p>
    </div>
  );
};

export default Footer;
