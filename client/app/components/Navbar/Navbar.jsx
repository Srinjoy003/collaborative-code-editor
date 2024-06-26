import React, { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'

const Navbar = () => {
    
    const [menu,setMenu] = useState("Menu");
    return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo' />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</li>
            <li onClick={()=>setMenu("Mobile app")} className={menu==="Mobile app"?"active":""}>Mobile app</li>
            <li onClick={()=>setMenu("Contact us")} className={menu==="Contact us"?"active":""}>Contact us</li>
        </ul>
        <button>sign in</button>
       </div>  
  )
}

export default Navbar
