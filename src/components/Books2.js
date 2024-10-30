import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactSVG } from 'react-svg';
import Modal from "react-modal";
import { Rings } from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
import { useWriteContract, useWaitForTransactionReceipt,useReadContract, useAccount, } from 'wagmi';
import {abi} from './abi'
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'


const erc721Address = "0x55fa3b7CbeB3C99F8d0F601Ed3199a1A39135336"//"0x0C9c260a757c1527116c0F739600b3525B50fe9d" //'0xd7922657c561C51b8868CDEEBEC9816e861EE97c';
const contractConfig = {
  abi: abi.abi,
  address: erc721Address,
};


const Books2 = () => {
  // Sample data array
  const [post, setPost] = useState({});
  const { address } = useAccount();



  const  docName  = useParams()
  let stringId = docName.id
  const {
    data: owner,
   
  } = useReadContract({
    ...contractConfig,
    functionName: 'getOwnerByStringId',
    args: [
      stringId
    ],
  });

  const {data : balance } = useReadContract({
    ...contractConfig,
    functionName: 'getBalanceByStringId',
    args: [
      owner,
      stringId
    ],
  });
  const { data: hash, sendTransaction } = useSendTransaction()
  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({
  //     hash,
  //   });
  const {  writeContract, error,
    isPending,} = useWriteContract();







  const navigate = useNavigate()
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);

    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const categories = ['1', '20',"50", '100'];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [donateamt, setdonateamt] = useState(0);
    const [name, setname] = useState("");
    const [loading, setLoading] = useState(false);
    const [isapproved, setisapproved] = useState(false);
    const [isdoc, setisdoc] = useState(false);
    const [nftbalance, setnftbalance] = useState(0);
    const [rating, setRating] = useState(0);
    const [number, setnumber] = useState(0);
    const [quantity, setQuantity] = useState(1);





    useEffect(() => {
      


      const Getnfts = async () => {
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/nftid222', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Nftid: docName.id, userId: address}), // Move body here
          });
        
          const result = await response.json();
        
          if (response.ok) {
            setPost(result.nftdata);
            const bigIntValue = balance
            const intValue = Number(bigIntValue);
            setnftbalance(intValue)
          }
        } catch (error) {
          console.log('Error: ' + error.message);
        } 
        
      }

      const Getnfts2 = async () => {
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/nftcollection222', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId :address }),
          });
  
          const result = await response.json();
      
          if (response.ok) {
            const nftCollection = result.nftdata.NFTcollection;
            const targetId = docName.id; // The ID to match
            
            // Filter the array to find all objects that have the same 'Nftid' as 'docName.id'
            const matchingNFTs = nftCollection.filter(nft => nft.Nftid === targetId);
            
            // Get the count of matching objects
            const matchingCount = matchingNFTs.length;
            setnumber(matchingCount)
           console.log(result)
          
          }
        } catch (error) {
          console.log('Error: ' + error.message);
        } finally {
          setLoading(false);
        }
      };
  
      Getnfts()
      Getnfts2()

    },[])










      async function addComment() {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const hash = array[0].toString(36).slice(0, 7);
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/listitem2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId :address, userId2 :address, Nftid: docName.id ,Nftid2: hash,name : name, amount: donateamt}),
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const results = await response.json();
          console.log('Fetched Documents:', results);
          setModalIsOpen(true)
          setModalIsOpen3(false)
          setModalIsOpen4(false)
          setModalIsOpen2(true)
                  setLoading(false)
        } catch (error) {
          console.error('Error fetching documents:', error);
          return null;
        }
      }


      async function addComment2() {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const hash = array[0].toString(36).slice(0, 7);
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/unlistitem2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId :address, userId2 : address, Nftid: docName.id ,Nftid2: hash,}),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const results = await response.json();
          console.log('Fetched Documents:', results);
          setModalIsOpen(true)
          setModalIsOpen3(false)
          setModalIsOpen4(true)
          setModalIsOpen2(false)
                  setLoading(false)
        } catch (error) {
          console.error('Error fetching documents:', error);
          return null;
        }
      }


      async function addDownload() {
        try {
          const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/download22', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Nftid: docName.id , userId :address,  }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const results = await response.json();
          console.log('Fetched Documents:', results);
          setLoading(false)
          setModalIsOpen(true)
          setModalIsOpen3(false)
          setModalIsOpen4(true)
          setModalIsOpen2(false)
        //  // return results;
        } catch (error) {
          console.error('Error fetching documents:', error);
          return null;
        }
      }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && userId.trim()) {
      const updatedComments = [...post.comments, { comment: newComment, userId }];
      setPost({ ...post, comments: updatedComments });
      setNewComment(''); // Clear the input after adding
      setUserId('');     // Clear the user input
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // Update rating based on the clicked star index
  };



let totalRatings
let averageRating



if (Array.isArray(post.comment) && post.comment.length > 0) {
  totalRatings = post.comment.reduce((total, review) => total + review.rating, 0);
  averageRating = totalRatings / post.comment.length;
} else {
  // Handle case where post.comment is undefined or length is 0
  totalRatings = 0;
  averageRating = 0;
}
const handleIncrement = () => {
  setQuantity(prevQuantity => prevQuantity + 1);
};

// Function to handle quantity decrement
const handleDecrement = () => {
  if (quantity > 1) {
    setQuantity(prevQuantity => prevQuantity - 1);
  }
};
  
  return (
    <div style={{ background: '#140C1F' }}>
  
  {loading? <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
  <Rings
            visible={true}
            height="130"
            width="130"
            color="#F81DFB"
            ariaLabel="rings-loading"
          />
  {!address ?  <p className="text-md md:text-lg mb-4 mt-10" style={{fontSize: 15}}>Please ensure your wallet is connected.....</p> : <p className="text-md md:text-lg mb-4 mt-10" style={{fontSize: 15}}></p>}
        
    </div> :
  
  <div className="p-4 md:p-8 lg:p-16 max-w-screen-lg mx-auto" >
     
    
     {/* <div className="flex justify-center mb-4">
  <div className="rounded-lg overflow-hidden shadow-lg border border-gray-300">
    <img
      src={post.image}
      alt={post.title}
      className="object-contain w-full h-100"
    />
  </div>
</div> */}
<div className="flex justify-center mb-10">
  <div className="rounded-lg overflow-hidden shadow-lg border border-gray-300 w-full max-w-md h-64"> {/* Set fixed height here */}
    <img
      src={post.image}
      alt={post.title}
      className="object-cover w-full h-full" 
    />
  </div>
</div>


<div className="text-center mb-20">
       <h1 className="text-xl md:text-3xl font-bold mb-4" style={{ background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", }} >{post.title}</h1>
     </div>




     <div className="flex flex-row justify-between">
      <div className='flex flex-row gap-5'>

      <div className="overflow-hidden shadow-lg border border-gray-300 w-14 h-14 rounded-full">
  <img
    src={post.image}
    // src={`data:image/jpeg;base64,${post.image}`}
    alt={post.title}
    className="object-cover w-full h-full"
  />
</div>
       <p className="text-lg md:text-xl mb-4" style={{fontSize: 16}}><strong>Author</strong> <p className="text-lg md:text-xl mb-4" style={{fontSize: 13}}>{post.author}</p></p>
       <div
            
             // onClick={() => {setSelectedCategory(category); setdonateamt(category)}}
              className={`flex items-center justify-center w-32 h-10 m-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 focus:outline-none ring-pink-500`}
              style={{background:  "transparent", color: "#F81DFB", fontSize: 13, borderColor:  "#F81DFB", borderWidth: 1}}
            >
          Supply : {nftbalance}
            </div>
      </div>
      
      <div className='hidden md:block flex flex-col'>
      <p className="text-lg md:text-xl mb-4" style={{ fontSize: 20, fontFamily: "Oxanium", marginLeft: 20 }}>
  <strong>
    {post && post.amount !== undefined
      ? `$${post.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETH`
      : ""}
  </strong>
</p>

{
  number > 1  ?  <button

  onClick={() => { 
    setLoading(true)
    addComment2()
  }}
    className="flex items-center justify-center  text-white bg-violet-800 rounded-lg mb-5"
    style={{ background: "#F81DFB", height: 40, borderRadius: 50, fontFamily: "Oxanium", fontSize:14, width : 100, marginLeft: 40 }}
  >
  <strong>UnList</strong>
  </button> :  <button

onClick={() => { 
  setModalIsOpen3(true)
  setModalIsOpen(true)
  setModalIsOpen2(false)
  setModalIsOpen4(false)
}}
  className="flex items-center justify-center  text-white bg-violet-800 rounded-lg mb-5"
  style={{ background: "#F81DFB", height: 40, borderRadius: 50, fontFamily: "Oxanium", fontSize:14, width : 100, marginLeft: 40 }}
>
<strong>List</strong>
</button>
}
      
<a
 
 // style="background-color: #4CAF50; color: white;"
href={`${post.pdfdata}`}

 className="flex items-center justify-center  text-white bg-violet-800 rounded-lg"
 style={{ background: "#F81DFB", height: 40, borderRadius: 50, fontFamily: "Oxanium", fontSize:14, width: 150 }}
>
<strong>Download</strong>
</a>


      </div>

       {/* <p className="text-md md:text-lg mb-4">Medication: {post.medication}</p> */}
       {/* {!isapproved?  <div className="flex flex-row">
       <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="28px" height="28px"><polygon  stroke="#42a5f5"  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"/><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"/></svg>
       <p className="text-lg md:text-xl mb-4" style={{fontSize: 13, marginLeft: 5}}><strong>Not Doctor Approved</strong></p>
       </div>: 
        <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="28px" height="28px"><polygon  fill="#42a5f5"  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"/><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"/></svg>
        <p className="text-lg md:text-xl mb-4" style={{fontSize: 13, marginLeft: 5}}><strong>Doctor Approved</strong></p>
        </div>} */}
      

     </div>
     <div className='block md:hidden flex flex-col items-center justify-center'>
  <p className="text-lg md:text-xl mb-4 text-center" style={{ fontSize: 20, fontFamily: "Oxanium" }}>
    <strong>
      {post && post.amount !== undefined
        ? `$${post.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETH`
        : ""}
    </strong>
  </p>

  <button
    onClick={() => { 
      setModalIsOpen3(true)
      setModalIsOpen(true)
      setModalIsOpen2(false)
      setModalIsOpen4(false)
    }}
    className="flex items-center justify-center text-white bg-violet-800 rounded-lg mb-5"
    style={{
      background: "#F81DFB",
      height: 40,
      borderRadius: 50,
      fontFamily: "Oxanium",
      fontSize: 14,
      width: 150
    }}
  >
    <strong>List</strong>
  </button>

  <a
   href={`${post.pdfdata}`}
    className="flex items-center justify-center text-white bg-violet-800 rounded-lg"
    style={{
      background: "#F81DFB",
      height: 40,
      borderRadius: 50,
      fontFamily: "Oxanium",
      fontSize: 14,
      width: 150
    }}
  >
    <strong>Download</strong>
  </a>
</div>


     <div className="text-left">
       <p className="text-lg md:text-xl mb-4" style={{fontSize: 15}}>{post.description}</p>
       {/* <p className="text-md md:text-lg mb-1"><strong>Medication</strong></p>
       <p className="text-md md:text-lg mb-4" style={{fontSize: 15}}>{post.medication}</p>
       <p className="text-md md:text-lg mb-1"><strong>Procedures</strong></p>
       <p className="text-md md:text-lg mb-4" style={{fontSize: 15}}>{post.procedures}</p> */}
     </div>






<>
  

           </>




          <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="relative bg-darkBlue text-white p-6 rounded-lg w-full max-w-lg mx-auto text-center min-h-96"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        style={{background: "linear-gradient(to right,rgba(10, 54, 65, 1),rgba(12, 11, 21, 1))",  }}
      >
        {modalIsOpen2 &&
        <>

<div className="flex-col justify-center items-center">
  <div className="flex flex-col justify-center items-center mb-5">
  <ReactSVG src="/assets/tick.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 150px; height: auto;');
      }} />
   
  </div>
  <h2 className="text-xl font-semibold mb-4">Success</h2>
  <div className="flex-1 flex justify-center">You have successfully Listed this product</div>
  
</div>
        </> }

       {modalIsOpen3 && <>
        <h2 className="text-xl font-semibold mb-3" style={{fontFamily: "Oxanium",}}>List NFT</h2>
        {/* <p style={{ marginTop: 0,fontSize:14, marginBottom:20}}>Funds donated will be split between Author and Healthcare specialist</p> */}
        {/* <div className="flex items-center bg-gray-50 p-4 rounded-full shadow-sm mb-0" style={{ width: "100%", height: 60, background: "linear-gradient(to bottom, rgba(9, 23, 41, 0.5), #091729)",  }}> */}
        
        <div className="relative flex-grow">
      <p style={{ marginTop: 0,fontSize:15, marginBottom:10, fontWeight: 700}}>NFT Name</p>
          <input
            type="text"
            placeholder="e.g The peak jam"
            //value={donateamt}
        
            onChange={(e) => setname(e.target.value)} // update temporary state
            className="w-full px-4 py-2 bg-white  text-gray-500 focus:outline-none focus:ring-2 focus:ring-black-300"
            style={{ height: 40, fontSize: 13,  background:"linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))", marginTop: 0, textAlign: "center", color: "white", borderRadius: 10, width: "80%"}}
          />

        </div>

        <div className="relative flex-grow mb-6">
      <p style={{ marginTop: 10,fontSize:15, marginBottom:10, fontWeight: 700}}> New Price</p>
          <input
            type="text"
            placeholder="Enter amount e.g 4000"
            //value={donateamt}
        
            onChange={(e) => setdonateamt(e.target.value)} // update temporary state
            className="w-full px-4 py-2 bg-white  text-gray-500 focus:outline-none focus:ring-2 focus:ring-black-300"
            style={{ height: 40, fontSize: 13,  background:"linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))", marginTop: 0, textAlign: "center", color: "white", borderRadius: 10, width: "80%"}}
          />

        </div>
       
        <button
         onClick={() => {
            setLoading(true)
            addComment()}} // trigger the search on button click
          className="ml-4 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          style={{ background: "#F81DFB", height: 40, alignItems: "center", fontSize: 15,fontFamily: "Oxanium", width: 130 }}
        >
          Upload
        </button>
       

        </>
        }

{modalIsOpen4 &&
        <>

<div className="flex-col justify-center items-center">
  <div className="flex flex-col justify-center items-center mb-5">
  <ReactSVG src="/assets/tick.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 150px; height: auto;');
      }} />
   
  </div>
  <h2 className="text-xl font-semibold mb-4">Success</h2>
  <div className="flex-1 flex justify-center">You have successfully UnListed this NFT</div>
  
</div>
        </> }


      </Modal>
   </div>}
  
    </div>
  
  );
};

export default Books2;
