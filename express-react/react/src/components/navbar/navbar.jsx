// import React from 'react';
import "./navbar.css"

import { Link } from "react-router-dom";

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (<>	
  <header>
			{/* <img src={} className="innologo"/> */}
    
			<nav ref={navRef} className="nav" id="navbar">
				<Link to="/">Home</Link>
				<a href="/compress">Compress</a>
				
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
    </>
	
	);
}

export default Navbar;