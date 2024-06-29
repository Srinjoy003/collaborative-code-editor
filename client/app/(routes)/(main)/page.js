"use client";

import { useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import ExploreMenu from "@/app/components/ExploreMenu/ExploreMenu";
import './index.css'

const App = () => {
  const[category,setCategory] = useState('all')

	return (
		<>
			<div className="app">
				<Navbar />
				<div>
					<Header />
					<ExploreMenu category={category} setCategory={setCategory} />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default App;
