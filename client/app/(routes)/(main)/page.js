"use client";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import ExploreMenu from "@/app/components/ExploreMenu/ExploreMenu";
import { CardWithForm } from "@/app/components/CreateRepel/createrepel";
import { CardWithForm1 } from "@/app/components/CreateRepel/createrepe1";
import './index.css';
import Image from "next/image";
const App = () => {
    const [category, setCategory] = useState('all');

    return (
        <>
            <div className="app">
                <Navbar />
                <Header />
                <ExploreMenu category={category} setCategory={setCategory} />
                <div className="container">
                    <div>
                        <div className="create-repel">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <h1>Everything you need to build software in one place</h1>
                        </div>
                        <div className="content flex -z-50">
                            <Image
                                src="/assets/collab.png"
                                width={700}
                                height={70}
                                className="hero-image"
    
                            />
                            <p><strong>Collaborative Coding:</strong> collaboration is as simple as writing together in a shared document. Work in parallel, pair program, and debug as a team to share context and build efficiently.</p>

                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default App;
