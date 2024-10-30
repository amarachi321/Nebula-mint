"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link,NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useWriteContract, useWaitForTransactionReceipt,useReadContract, useAccount, } from 'wagmi';
import Modal from "react-modal";

const Header = ({ page }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [modalIsOpen, setModalIsOpen] = useState(false);
 const [connected2, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [availableWallets, setAvailableWallets] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const { address } = useAccount();






  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false);
  };

  const linkStyle = (path) => (path === activeLink ? "text-pink-500" : "hover:text-pink-500");


  useEffect(() => {
    const storedConnected = localStorage.getItem("connected") === "true";
    const storedWalletAddress = localStorage.getItem("walletAddress");

    if (storedConnected && storedWalletAddress) {
      setConnected(true);
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  return (
    <header className="py-6 px-8 bg-darkBlue text-white">
    <div className="flex justify-between items-center relative">

                 
        
        <Link  to="/" className="flex flex-row">
        <p style={{fontSize: 30, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 600}}>
            Nebula
        </p>
        {/* <ReactSVG
          src="/assets/S.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 40px; height: auto;");
          }}
        /> */}
          <p style={{fontSize: 30, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 900}}>
            Mint
        </p>

        </Link>
       
        {isMobile ? (
          <div className="relative" ref={menuRef}>
            {/* <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl focus:outline-none"
            >
              &#9776;
            </button> */}
            <button
                onClick={() => {
                  //setModalIsOpen(true);
                  setMenuOpen(!menuOpen)
                }}
                //className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                 <ReactSVG
          src="/assets/avatar.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 40px; height: auto;");
          }}
        />
              </button>
            {menuOpen && (
              <nav style={{background: '#140C1F'}} className="absolute right-0 mt-2 py-2 w-48 bg-white text-white rounded-lg shadow-lg ">
               
                <Link
                  to="/"
                  className={`block px-4 py-2 ${linkStyle("/")} flex justify-center`}
                  onClick={() => {handleNavClick("/"); navigate("/")}}
                >
                  Home
                </Link>
           <Link
                  //href="/product"
                  to="/create2"
                  className={`block px-4 py-2 ${linkStyle("/create")} flex justify-center`}
                  onClick={() => {handleNavClick("/create"); navigate("/create")}}
                >
                  Create
                </Link>

                <Link
                  //href="/product"
                  to="/explore"
                  className={`block px-4 py-2 ${linkStyle("/explore")} flex justify-center`}
                  onClick={() => {handleNavClick("/explore"); navigate("/explore")}}
                >
                  Explore
                </Link>

                <Link
                  //href="/upload"
                  to="/collection"
                  className={`block px-4 py-2 ${linkStyle("/collection")} flex justify-center`}
                  onClick={() => {handleNavClick("/collection"); navigate("/collection")}}
                >
                  Collection
                </Link>
                
                {/* <Link
                  //href="/upload"
                  to="/profile"
                  className={`block px-4 py-2 ${linkStyle("/profile")} flex justify-center`}
                  onClick={() => {handleNavClick("/profile"); navigate("/profile")}}
                >
                  User profile
                </Link> */}
                <div className="flex justify-center">
                {/* <button
                onClick={() => {
                  setModalIsOpen(true);

                }}
                //className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                 <ReactSVG
          src="/assets/Connect.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 140px; height: auto;");
          }}
        />
              </button> */}
              <ConnectButton />
                </div>
              </nav>
            )}
          </div>
        ) : (
          <>
           
          
            <div className="flex flex-row justify-end gap-5">
              {/* <button
                onClick={() => {
                  setModalIsOpen(true);

                }}
                //className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >

                {connected ?  <ReactSVG
          src="/assets/DisConnect.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 150px; height: auto;");
          }}
        /> :  <ReactSVG
        src="/assets/Connect.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 150px; height: auto;");
        }}
      />}
                
              </button> */}
              <ConnectButton />
              <button
                onClick={() => {
                    setMenuOpen(!menuOpen)

                }}
                //className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                 <ReactSVG
          src="/assets/avatar.svg"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 40px; height: auto;");
          }}
        />
              </button>
              <div  className="relative" ref={menuRef}>
           
           
            {menuOpen && (
              <nav  className="absolute right-0 mt-12 py-2 w-48 bg-darkBlue text-white rounded-lg shadow-lg">
               
                <Link
                  to="/"
                  className={`block px-4 py-2 ${linkStyle("/")} flex justify-center`}
                  onClick={() => {handleNavClick("/"); navigate("/")}}
                >
                  Home
                </Link>
           <Link
                  //href="/product"
                  to="/create2"
                  className={`block px-4 py-2 ${linkStyle("/create")} flex justify-center`}
                  onClick={() => {handleNavClick("/create"); navigate("/product")}}
                >
                 Create
                </Link>

                <Link
                  //href="/product"
                  to="/explore"
                  className={`block px-4 py-2 ${linkStyle("/explore")} flex justify-center`}
                  onClick={() => {handleNavClick("/explore"); navigate("/explore")}}
                >
                 Explore
                </Link>
                
                <Link
                
                  to="/collection"
                  className={`block px-4 py-2 ${linkStyle("/collection")} flex justify-center`}
                  onClick={() => {handleNavClick("/collection"); navigate("/collection")}}
                >
                  Collection
                </Link>
               
               
              </nav>
            )}
          </div>
            </div>
            
          </>
        )}

        














      </div>
      
    </header>
  );
};

export default Header;




