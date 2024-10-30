import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useNavigate } from "react-router-dom";
import { Link,NavLink } from "react-router-dom";
import { Rings } from 'react-loader-spinner'

  

const Explore = () => {


    const navigate = useNavigate()
    const [nfts, setnfts] = useState([]);
    const [nfts2, setnfts2] = useState([]);
    const [rate, setrate] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [isdownloaded, setisdownloaded] = useState(false); 

  useEffect(() => {
    const Getnfts = async () => {
      try {
        const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/nftcollection22', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
       
        if (response.ok) {
          const resaleCollection = result.nftdata.NFTcollection;

// Filter the array to keep only the objects with 'listed' set to true
const listedItems = resaleCollection.filter(item => item.listed === true);
const listedItems2 = resaleCollection.filter(item => item.amount);
         setnfts(listedItems2);
         setnfts2(listedItems);
        //  console.log(result.nftdata.NFTcollection);
        }
      } catch (error) {
        console.log('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

const Getnfts2 = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const result = await response.json();

    setrate(result.ethereum.usd);
  } catch (error) {
    console.log('Error: ' + error.message);
  }
};


    Getnfts();
    Getnfts2();
  }, []);  // The empty array makes it run only once when the component mounts



  
  const NFTCard = ({ image, title, author, price, id, id2 }) => {
   
    const balanceInUsd = price * rate;
    
  return(
    
    <div
      className="bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-lg p-4 shadow-md"
      style={{
        background:
          "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
      }}
    >
      <img src={image} alt={title} className="rounded-lg w-full mb-4" />
      <div className="text-white">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-400">By {author}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            On Sale <span role="img" aria-label="fire">🔥</span>
          </p>
          {/* Align this div to the far right */}
          <div className="flex flex-col justify-end ml-auto">
            <p className="font-bold">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETH</p>
            <p className="text-sm text-gray-400">${balanceInUsd.toFixed(2)}</p>
          </div>
        </div>
        {/* Centering the button */}
        <div className="flex justify-center mt-4">
 
        {isdownloaded?  <Link  to={`/resalebook?nftId=${id}&nftId2=${id2}`} className="flex items-center justify-center">
            <ReactSVG
              src="/assets/bid.svg"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 220px; height: auto;");
              }}
            />
         
          </Link>:  <Link  to={`/nftbook/${id}`} className="flex items-center justify-center">
            <ReactSVG
              src="/assets/bid.svg"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 220px; height: auto;");
              }}
            />
         
          </Link>}
       
        </div>
      </div>
    </div>
  )}
  

  return (
    <div className="  py-10" style={{background: '#140C1F'}}>
         {loading? <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
    <Rings
            visible={true}
            height="130"
            width="130"
            color="#F81DFB"
            ariaLabel="rings-loading"
          />
    </div> :
       
       <>
       <div className="text-center " style={{marginBottom: 80}}>
        {/* <p className="text-gray-400 text-sm">Most Loved NFTs Of The Time</p> */}
        <h1 className="text-white text-3xl sm:text-3xl lg:text-5xl font-bold" 
     style={{
       background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
       WebkitBackgroundClip: "text",
       color: "transparent"
     }}>
  NFT Bookstore
</h1>

      </div>
      <div className="flex items-center justify-center">
  <div
    className="flex items-center justify-between space-x-6 w-full"
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      height: 60,
      width: "90%",
      alignSelf: "center",
    borderRadius: 10
    }}
  >
    <button
      className="flex-1 flex items-center justify-center text-white bg-violet-800 rounded-lg"
      style={{
        background: "#F81DFB",
        height: 45,
        borderRadius: 10,
        fontFamily: "Oxanium",
        fontSize: 15,
      }}
      onClick={() => {
        setisdownloaded(false)
      }}
    >
      <strong>On Sale (NEW!) </strong>
    </button>

    <button
      className="flex-1 flex items-center justify-center text-white bg-violet-800 rounded-lg"
      style={{
        background: "#F81DFB",
        height: 45,
        borderRadius: 10,
        fontFamily: "Oxanium",
        fontSize: 15,
      }}
      onClick={() => {
        setisdownloaded(true)
      }}
    >
      <strong>Resale  </strong>
    </button>
  </div>
</div>

{isdownloaded ? (
  <>
    {(!nfts2 || nfts2.length === 0) ? (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg" style={{marginTop: -400, fontSize: 24}}>No NFTs Yet!</p>
      </div>
    ) : (
      <div className="container mx-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts2.map((nft, index) => (
            <div onClick={() => { }} key={index} className="w-full max-w-xs mx-auto">
              <NFTCard
                image={nft.image}
                title={nft.itemname}
                author={nft.author}
                price={nft.amount}
                id={nft.Nftid}
                id2={nft.Nftid2}
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </>
) : (
  <>
    {(!nfts || nfts.length === 0) ? (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg" style={{marginTop: -400, fontSize: 24}}>No NFTs Yet!</p>
      </div>
    ) : (
      <div className="container mx-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => (
            <div onClick={() => { }} key={index} className="w-full max-w-xs mx-auto">
              <NFTCard
                image={nft.image}
                title={nft.itemname}
                author={nft.author}
                price={nft.amount}
                id={nft.Nftid}
                id2={nft.Nftid2}
              />
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}
{/* {nfts.length === 0 ? <>

<div className="flex justify-center items-center h-screen">
  <p className="text-gray-400 text-lg" style={{marginTop: -400, fontSize: 24}}>No NFTs Yet!</p>
</div>
</> : <div className="container mx-auto pt-20">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {nfts.map((nft, index) => (
    <div onClick={() => { }} key={index} className="w-full max-w-xs mx-auto">
      <NFTCard
        image={nft.image}
        title={nft.title}
        author={nft.author}
        price={nft.amount}
        id={nft.Nftid}
      />
    </div>
  ))}
</div>
</div>} */}
</>
}

    </div>
  );
};

export default Explore;
