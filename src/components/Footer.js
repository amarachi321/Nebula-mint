'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
<footer 
  style={{ background: '#140C1F'}}
  className="hidden md:block text-white py-20 px-0" // Removed px-8 to avoid reducing the width
>
  <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <div style={{ width: "100%", marginTop: -250 }}> {/* Ensure the container div takes full width */}
      <ReactSVG 
        src="/assets/Ellipse.svg"  
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }} 
      />
    </div>
  </div>
<div className='flex flex-row justify-between'>

         <div className="flex flex-row" style={{marginLeft: 80}}>
        <p style={{fontSize: 40, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 600}}>
            Nebula
        </p>

          <p style={{fontSize: 40, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 900}}>
            Mint
        </p>

        </div>
    <div className='flex flex-row' style={{gap:62, marginRight: 200}}>
    <div className='flex flex-col'>

       <a href="/" className="text-lg mb-0" style={{  fontSize: 14, fontFamily:"Poppins" }}>
         Home
        </a>
        <a href="/create2" className="text-lg mb-1" style={{  fontSize: 14, fontFamily:"Poppins" }}>
         Create
        </a>
        <a href="/explore" className="text-lg mb-1" style={{  fontSize: 14, fontFamily:"Poppins" }}>
        Explore
        </a>
        <a href="/collection" className="text-lg mb-1" style={{  fontSize: 14, fontFamily:"Poppins" }}>
         Collection
        </a>



    </div>

    </div>

</div>
<div className='flex flex-col' style={{alignItems: "center", justifySelf:"center"}}>
    <p className="text-lg mb-0" style={{  fontSize: 15, fontFamily:"Poppins" , fontWeight: 700}}>
    © 2024 NebulaMint. All rights reserved
        </p> 
    </div>
</footer>


<footer 
 style={{ background: '#140C1F'}}
  className="block md:hidden text-white py-20 px-0" // Removed px-8 to avoid reducing the width
>
  <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <div style={{ width: "100%", marginTop: -150 }}> {/* Ensure the container div takes full width */}
      <ReactSVG 
        src="/assets/Ellipse.svg"  
        beforeInjection={(svg) => {
          svg.setAttribute('style', 'width: 100%; height: auto;');
        }} 
      />
    </div>
  </div>
<div className='flex flex-row justify-between'>
<div className="flex flex-row" style={{marginLeft: 30}}>
        <p style={{fontSize: 20, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 600}}>
            Nebula
        </p>
   
          <p style={{fontSize: 20, fontFamily: "Oxanium", color: "#AD1AAF", fontWeight: 900}}>
            Mint
        </p>

        </div>
    <div className='flex flex-row' style={{marginRight: 40}}>
    <div className='flex flex-col'>
    {/* <p  className="text-lg mb-0" style={{  fontSize: 10, fontFamily:"Poppins" , fontWeight: 900}}>
         Useful Link
        </p> */}
        <a href="/" className="text-lg mb-0" style={{  fontSize: 10, fontFamily:"Poppins" }}>
         Home
        </a>
        <a href="/create2" className="text-lg mb-1" style={{  fontSize: 10, fontFamily:"Poppins" }}>
         Create
        </a>
        <a href="/explore" className="text-lg mb-1" style={{  fontSize: 10, fontFamily:"Poppins" }}>
        Explore
        </a>
        <a href="/collection" className="text-lg mb-1" style={{  fontSize: 10, fontFamily:"Poppins" }}>
         Collection
        </a>
    </div>
   
    </div>
    

</div>
<div className='flex flex-col' style={{alignItems: "center", justifySelf:"center"}}>
    <p className="text-lg mb-0" style={{  fontSize: 12, fontFamily:"Poppins" , fontWeight: 900}}>
    © 2024 NebulaMint. All rights reserved
        </p> 
    </div>

</footer>

</>
  
  );
};

export default Footer;
