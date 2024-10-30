'use client';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom";

const HIW = () => {
  const navigate = useNavigate()
  return (
    <>
<section 
  style={{ 
    // backgroundImage: "url('/assets/sky.png')", 
    // backgroundRepeat: "no-repeat",          // Prevent background image from repeating
    // backgroundSize: "cover",  
    // position: "absolute", 
    // width: "100%", 
    // height: "45%" 
    background:  '#140C1F',
    marginTop: 100
    //marginTop: -100
  }} 
  className="hidden md:block text-white py-20 px-8"
>
  <div 
    style={{
   
    }}
  >


    <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
     //marginTop:-300,
     maxWidth: "100%",
     marginBottom: 70
    
       }}>
<p className="text-lg mb-3" style={{
          background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", 
          //width: 300, 
          fontSize: 40, 
          fontFamily: "Poppins", 
          fontWeight: 900, 
          lineHeight: 1.3 
        }}>
         How It Works
        </p>
    </div>

     
   
       <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
   
     maxWidth: "100%",
     marginLeft: 150
       }}>
        <ReactSVG src="/assets/Hiwdesk.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 85%; height: auto;');
      }} />
     
    </div>
  </div>

  <div 
    style={{
   marginTop: 230
    }}
  >


    <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
     //marginTop:-300,
     maxWidth: "100%",
     marginBottom: 70
    
       }}>
<p className="text-lg mb-3" style={{
          background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", 
          //width: 300, 
          fontSize: 40, 
          fontFamily: "Poppins", 
          fontWeight: 900, 
          lineHeight: 1.3 
        }}>
         Our Collection
        </p>
    </div>

     
   
       <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
   
     maxWidth: "100%",
     marginLeft: 150
       }}>
        <ReactSVG src="/assets/NFT.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 90%; height: auto;');
      }} />
     
    </div>
  </div>
</section>



{/* <div className="block md:hidden relative w-full h-full"> */}
<div 
  style={{ 
    // backgroundImage: "url('/assets/sky.png')", 
    // backgroundRepeat: "no-repeat",          // Prevent background image from repeating
    // backgroundSize: "cover",  
    // position: "relative", 
    // width: "100%", 
    // height: "25%" ,
 //marginTop: -120,
    background:  '#140C1F'

  }} 
  className="block md:hidden text-white py-20 px-8"
>
  <div 
    style={{
    }}
  >
     
    <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
     //marginTop:-300,
     maxWidth: "100%",
   
       }}>
<p className="text-lg mb-3" style={{
          background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", 
          //width: 300, 
          fontSize: 22, 
          fontFamily: "Poppins", 
          fontWeight: 900, 
          lineHeight: 1.3 
        }}>
         How It Works
        </p>
    </div>
     
   
       <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
   marginTop:30,
     maxWidth: "100%",
     marginLeft: 80
       }}>
      
      <ReactSVG src="/assets/Hiwmobile.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 80%; height: auto;');
      }} />
    </div>
  </div>

  <div 
    style={{
    }}
  >
     
    <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
     //marginTop:-300,
     maxWidth: "100%",
   
       }}>
<p className="text-lg mb-3" style={{
          background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", 
          //width: 300, 
          fontSize: 22, 
          fontFamily: "Poppins", 
          fontWeight: 900, 
          lineHeight: 1.3 
        }}>
        Our Collection
        </p>
    </div>
     
   
       <div style={{
     display: "flex",       // Add flexbox
    justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
   marginTop:30,
     maxWidth: "100%",
    // marginLeft: 80
       }}>
      
      <ReactSVG src="/assets/NFT.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 100%; height: auto;');
      }} />
    </div>
  </div>



</div>

</>
  
  );
};

export default HIW;
