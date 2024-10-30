'use client';
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom";


import Modal from "react-modal";

const Hero = () => {
  const navigate = useNavigate()
  const [connected2, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [availableWallets, setAvailableWallets] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);


  



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
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




  useEffect(() => {
    const storedConnected = localStorage.getItem("connected") === "true";
    const storedWalletAddress = localStorage.getItem("walletAddress");

    if (storedConnected && storedWalletAddress) {
      setConnected(true);
      setWalletAddress(storedWalletAddress);
    }
    // localStorage.removeItem("connected");
    // localStorage.removeItem("walletAddress");
  }, []);

  
  
  return (
    <>
    <section className="hidden md:block text-white  py-20 px-8" style={{ background: '#140C1F'}}>
    <div
  className="flex flex-wrap  justify-center items-center w-full gap-18"
  style={{ marginLeft: 0 }}
>
  <div
  className="flex flex-col text-left" // Removed items-center
  style={{ flexGrow: 1, minWidth: "300px", marginLeft: 100 }}
>
  <p
    className="text-lg mb-4"
    style={{
      width: 600,
      fontSize: 55,
      fontWeight: 600,
      lineHeight: 1.1,
      fontFamily: "Oxanium",
    }}
  >
    Discover, Create, and Trade Digital  <span
      className="text-lg"
      style={{
        background:  "linear-gradient(to right, #FFFFFF, #F81DFB)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontSize: 50,
        fontWeight: 800,
      }}
    >
      Stories
    </span> and {" "}
    <span
      className="text-lg"
      style={{
        background:  "linear-gradient(to right, #FFFFFF, #F81DFB)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontSize: 50,
        fontWeight: 800,
      }}
    >
      NFTs
    </span>
  </p>

  <p
    className="text-lg mb-4"
    style={{
      width: 600,
      fontSize: 20,
      fontWeight: 200,
      lineHeight: 1.4,
      color : "#A5A3A8"
    }}
  >
NebulaMint - Where Imagination Meets Innovation!
  </p>


   
<div className="flex flex-row gap-5 mb-20">
<button
    onClick={() => {
      navigate("/explore")
    }}
    // className="text-white py-3 px-6 rounded-lg text-lg font-medium self-start" // Added self-start
    style={{
      cursor: "pointer"
    }}
  >
    <ReactSVG
        src="/assets/Explore.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 180px; height: auto;");
        }}
      />
  </button>
  <button
    onClick={() => {
      navigate("/create2")
    }}
  >
    <ReactSVG
        src="/assets/Create.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 180px; height: auto;");
        }}
      />
  </button>
    
    </div> 


</div>
  <div className="flex items-center justify-end" style={{}}>
    {/* <ReactSVG src="/assets/NFTCards.svg" /> */}

    <ReactSVG 
      src="/assets/NFTCards.svg" 
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 500px; height: auto;');
      }} 
    />
  </div>
</div>

<div className="flex items-center" style={{}}>
    {/* <ReactSVG src="/assets/NFTCards.svg" /> */}

    <ReactSVG 
      src="/assets/MilkyWay.svg" 
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100%; height: auto;');
      }} 
    />
  </div>



  <div className="flex " style={{marginLeft: -30, marginTop:-150}}>
    {/* <ReactSVG src="/assets/NFTCards.svg" /> */}

    <ReactSVG 
      src="/assets/Eclipse.svg" 
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100%; height: auto;');
      }} 
    />
  </div>

  <div
  className="flex flex-col items-center justify-center"  
   style={{marginTop: -900}}
>
    
  <span
    className="text-lg"
    style={{
      background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontSize: 40,
      fontWeight: 800,
      height: 100
    }}
  >
  Trusted Partners
  </span>

  <div className="flex flex-wrap justify-center space-x-16 mb-8">
    <div style={{ }}>
      <ReactSVG
        src="/assets/Aurora.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 250px; height: auto;");
        }}
      />
    </div>

    <div style={{ }}>
      <ReactSVG
        src="/assets/Google.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 250px; height: auto;");
        }}
      />
    </div>

    <div style={{  }}>
      <ReactSVG
        src="/assets/vottun.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 250px; height: auto;");
        }}
      />
    </div>
  </div>





</div>
    

      
  </section>

{/* <div className="block md:hidden relative w-full h-full"> */}
<section className="block md:hidden text-white bg-darkBlue py-20 px-8" style={{ background: '#140C1F'}}>
<div
  className="flex flex-wrap  justify-center items-center w-full gap-28"
  style={{ marginLeft: 0 }}
>
  <div
  className="flex flex-col text-left justify-center items-center" // Removed items-center
  style={{ flexGrow: 1, minWidth: "300px" }}
>
  <p
    className="text-lg mb-4"
    style={{
      width: 290,
      fontSize: 25,
      fontWeight: 600,
      lineHeight: 1.5,
      textAlign: "center",
      fontFamily: "Oxanium",
    }}
  >
    Discover, Create, and Trade Digital  <span
      className="text-lg"
      style={{
        background:  "linear-gradient(to right, #FFFFFF, #F81DFB)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontSize: 25,
        fontWeight: 800,
      }}
    >
      Stories
    </span> and {" "}
    <span
      className="text-lg"
      style={{
        background:  "linear-gradient(to right, #FFFFFF, #F81DFB)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontSize: 25,
        fontWeight: 800,
      }}
    >
      NFTs
    </span>
  </p>

  <p
    className="text-lg mb-0"
    style={{
      width: 280,
      fontSize: 16,
      fontWeight: 200,
      lineHeight: 1.4,
      color : "#A5A3A8",
      textAlign: "center"
    }}
  >
NebulaMint
  </p>

  <p
    className="text-lg mb-4"
    style={{
      width: 280,
      fontSize: 16,
      fontWeight: 200,
      lineHeight: 1.4,
      color : "#A5A3A8",
      textAlign: "center"
    }}
  >
 Where Imagination Meets Innovation!
  </p>


 
</div>
  <div className="flex items-center justify-end" style={{marginTop: -90}}>
  

    <ReactSVG src="/assets/NFTCards.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 290px; height: auto;');
      }} />
  </div>
  <div className="flex flex-row gap-8" style={{marginTop: -80}}>
<button
    onClick={() => {
      navigate("/explore")
    }}
  
    style={{
      cursor: "pointer"
    }}
  >
    <ReactSVG
        src="/assets/Explore.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 140px; height: auto;");
        }}
      />
  </button>
  <button
    onClick={() => {
      navigate("/create2")
    }}

  >
    <ReactSVG
        src="/assets/Create.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 140px; height: auto;");
        }}
      />
  </button>
    
    </div> 
</div>
<div className="flex items-center" style={{}}>
    {/* <ReactSVG src="/assets/NFTCards.svg" /> */}

    <ReactSVG 
      src="/assets/MilkyWay.svg" 
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100%; height: auto;');
      }} 
    />
  </div>


  <div className="flex " style={{marginLeft: -30, marginTop:-150}}>
    {/* <ReactSVG src="/assets/NFTCards.svg" /> */}

    <ReactSVG 
      src="/assets/Eclipse.svg" 
      beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100%; height: auto;');
      }} 
    />
  </div>

  <div
  className="flex flex-col items-center justify-center"  
   style={{marginTop: -600}}
>
    
  <span
    className="text-lg"
    style={{
      background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      fontSize: 20,
      fontWeight: 800,
      height: 40,
      marginBottom: 10
    }}
  >
  Trusted Partners
  </span>

  <div className="flex flex-wrap justify-center  mb-8">
    <div style={{ }}>
      <ReactSVG
        src="/assets/Aurora.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 150px; height: auto;");
        }}
      />
    </div>

    <div style={{ }}>
      <ReactSVG
        src="/assets/Google.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 150px; height: auto;");
        }}
      />
    </div>

    <div style={{  }}>
      <ReactSVG
        src="/assets/vottun.svg"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 150px; height: auto;");
        }}
      />
    </div>
  </div>





</div>
    
      
  </section>

  
</>
  
  );
};

export default Hero;
