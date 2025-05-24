import React from "react";
import "./Footer.css";
import { assets } from "@/public/assets/assets";
import Image from "next/image";

const Footer = () => {
	return (
		<div className="footer" id="footer">
			<div className="footer-content">
				<div className="footer-content-left">
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<Image src={assets.logo1} alt="logo" width="100" height="80" />
					<div className="footer-divider "></div>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<p>
						Revolutionizes software development by enabling real-time,
						collaborative coding, empowering teams globally to build innovative
						applications with integrated live editing and instant feedback.
					</p>
					<div className="footer-social-icons gap-5">
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0"
						/>
						<Image src={assets.facebook_icon} alt="Facebook" />
						<Image src={assets.linkedin_icon} alt="LinkedIn" />
						<Image src={assets.twitter_icon} alt="Twitter" />
					</div>
				</div>
				<div className="footer-content-center">
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<h2>COMPANY</h2>
					<ul>
						<li>Home</li>
						<li>About</li>
						<li>Services</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div className="footer-content-right">
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<h2>GET IN TOUCH</h2>
					<ul>
						<li>
							<a href="tel:+8100500855">8100500855</a>
						</li>
						<li>
							<a href="mailto:noobdrawsdoodlet@gmail.com">
								collaborativeCoding@gmail.com
							</a>
						</li>
					</ul>
				</div>
			</div>
			<hr />
			<p>&copy; 2025 CollaborativeCoding. All Rights Reserved.</p>
		</div>
	);
};

export default Footer;
