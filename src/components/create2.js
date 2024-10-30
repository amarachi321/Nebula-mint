
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Rings } from 'react-loader-spinner'
import Modal from "react-modal";
import { ReactSVG } from "react-svg";
import { useParams } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import { FormEvent } from 'react';
import {abi} from './abi'
// import { ethers } from "ethers";


import { useWriteContract, useWaitForTransactionReceipt,useReadContract, useAccount, } from 'wagmi';
import { erc20Abi,erc721Abi } from 'viem';


const FormSchema = z.object({
  itemname: z.string().min(1),
  supply: z.string().min(1),
  author: z.string().min(1),
  amount: z.string().min(1),
  description: z.string().min(1),
 


});

const erc721Address = "0x55fa3b7CbeB3C99F8d0F601Ed3199a1A39135336"
const contractConfig = {
  abi: abi.abi,
  address: erc721Address,
};


const Create2 = () => {


const { address } = useAccount();

const { data: hash, writeContract, error, isPending } = useWriteContract();


  const [loading, setLoading] = useState(false); 
  const [modalIsOpen, setModalIsOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const  docName  = useParams()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        itemname: '',
        supply: '',
        author: '',
        amount: '',
      description: '',

    }
  });





     


const handleFilesAdded = (files) => {
  const file = files[0]; // Assuming single file upload
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result); // Set the full base64 string including data:image/...
    };
    reader.readAsDataURL(file); // Convert file to base64 format
  }
};

const handleFilesAdded2 = (files) => {
  const file = files[0]; // Assuming single file upload
  if (file) {
    Resizer.imageFileResizer(
      file,
      800, // maxWidth
      800, // maxHeight
      'JPEG', // format
      70, // quality
      0, // rotation
      (uri) => {
        setSelectedFile(uri); // Set resized image
      },
      'base64', // Output format
    );
  }
};



  const onSubmit = async (formData) => {
    if (!selectedFile) {
      alert('Upload an image file to proceed');
      return;
    }

    setLoading(true);
    if (true) {
    
      const data = {
        data: selectedFile.split(',')[1], 
        itemname: formData.itemname,
        supply: formData.supply,
        author: formData.author,
        description: formData.description,
        amount : formData.amount,
        userwallet:address,
        Nftid: docName.id
      };

      try {
        const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/dataupload22', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          await handleUpload(docName.id,result.ipfsHash,formData.itemname,formData.supply,formData.description, )
          console.log('Product ID:', result);
        } else {
          toast.error('Error: ' + result.error);
        }
      } catch (error) {
        toast.error('Error: ' + error.message);
      } 
    } else {
      alert('Please ensure you have an account balance above 100 ETH');

      
    }
  };

  const handleSelect =async() => {
    let stringId = "stringId"
    let uri = "uri"
    let description = "description"
    let tokenName = "tokenName"
    let quantity = 2
 writeContract({
      ...contractConfig,
      functionName: 'mint',
      args: [
        address, // Recipient address
        stringId, // Unique ID
        uri, // Token URI
        description, // Description
        tokenName, // Token Name
        quantity, // Quantity
      ],
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFilesAdded,
    accept: 'image/*', // Only accept image files
    multiple: false,
  });




const handleUpload = async (tokenid,imgurl,tokenName,supply,description) => {

    setLoading(true);


   
    try {

          let to = address
          let  stringId = tokenid
          let uri = imgurl
          let quantity = supply

        
         await writeContract({
            ...contractConfig,
            functionName: 'mint',
            args: [
              address, // Recipient address
              stringId, // Unique ID
              uri, // Token URI
              description, // Description
              tokenName, // Token Name
              quantity, // Quantity
            ],
          });
      
       console.log('Product uploaded successfully!')
    } catch (error) {
        console.error('Error uploading product:', error);
        // setMessage(`${error}`);
    } finally {
      setLoading(false)
      setModalIsOpen(true)
    }
};

  return (
    <>
    {loading? <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
    <Rings
            visible={true}
            height="130"
            width="130"
            color="#F81DFB"
            ariaLabel="rings-loading"
          />
    </div> : 
     
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120" style={{ background: "linear-gradient(to bottom,rgba(10, 54, 65, 1),rgba(12, 11, 21, 0.95),rgba(12, 11, 18, 1))" }}>
      <section className="flex flex-col justify-center items-center px-5 py-8 max-md:max-w-full md:px-20 text-white" style={{ background:  '#140C1F',}}>
     
        <header style={{ marginBottom: 50}}  className="hidden md:block flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl text-white justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl leading-normal font-semibold text-slate-800 text-white" style={{background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent",fontFamily: "Oxanium",fontSize: 50, width : 900  }}>Create Your Own Masterpiece</h2>
            <p className="mt-2 text-sm font-medium text-gray-400" style={{fontSize: 15,fontFamily: "Oxanium"}}>Get onboard and tell your story</p>
          </div>
        </header>

        <header style={{ marginBottom: 50}}  className="block md:hidden flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl text-white justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl leading-normal font-semibold text-slate-800 text-white" style={{background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent",fontFamily: "Oxanium",fontSize: 28,   }}>Create Your Own Masterpiece</h2>
            <p className="mt-2 text-sm font-medium text-gray-400" style={{fontSize: 15,fontFamily: "Oxanium"}}>Get onboard and tell your story</p>
          </div>
        </header>
    
        <form className="flex flex-col w-full max-w-2xl  text-white" onSubmit={handleSubmit(onSubmit)}>
        <div
            {...getRootProps()}
            className="flex justify-center items-center text-center px-4 py-2 mt-1 w-full text-sm rounded-lg border-2 border-dashed border-gray-300  text-white"
            style={{ cursor: 'pointer', height: 200, }}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <img src={selectedFile} alt="Uploaded" className="max-h-full max-w-full object-contain" />
            // <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="max-h-full max-w-full object-contain" />
            ) : (
                
                <span
                className="text-gray-400"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <ReactSVG
                  src="/assets/Group.svg"
                  beforeInjection={(svg) => {
                    svg.setAttribute('style', 'width: 40px; height: auto;');
                  }}
                />
                Drag and Drop files here or{' '}
                <span className="text-gray-400" style={{ color: '#F81DFB', cursor: 'pointer' }}>
                  Browse
                </span>
              </span>
              
            )}
          </div>
          <div className='flex flex-row w-full'>

            <div className='flex flex-col w-full'>
            <label htmlFor="Item Name" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span  className="text-slate-800 text-white">Item Name</span>
           
          </label>
          <input
            type="text"
            id="Item Name"
            className="justify-center items-start p-3.5 mt-1 text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Item Name"
            aria-label="Item Name"
            style={{fontSize: 13, background: '#140C1F',color: "white", width : "95%"}}
            {...register('itemname')}
          />
          {errors.itemname && <span className="text-red-600">{errors.itemname.message}</span>}
            </div>


            <div className='flex flex-col w-full'>
            <label htmlFor="title" className="mt-8 text-sm font-bold text-gray-400 text-white">
                        <span  className="text-slate-800 text-white">Supply</span>
                    
                    </label>
                    <input
                        type="text"
                        id="supply"
                        className="justify-center items-start p-3.5 mt-1 text-xs font-medium bg-white rounded-lg border text-black"
                        placeholder="How many copies"
                        aria-label="name"
                        style={{fontSize: 13, background: '#140C1F',color: "white", width : "95%"}}
                        {...register('supply')}
                    />
                    {errors.supply && <span className="text-red-600">{errors.supply.message}</span>}
            </div>

          </div>







          <div className='flex flex-row w-full'>

<div className='flex flex-col w-full'>
<label htmlFor="author" className="mt-8 text-sm font-bold text-gray-400 text-white">
<span  className="text-slate-800 text-white">Author</span>

</label>
<input
type="text"
id="author"
className="justify-center items-start p-3.5 mt-1 text-xs font-medium bg-white rounded-lg border text-black"
placeholder="Author"
aria-label="author"
style={{fontSize: 13, background: '#140C1F',color: "white", width : "95%"}}
{...register('author')}
/>
{errors.author && <span className="text-red-600">{errors.author.message}</span>}
</div>


<div className='flex flex-col w-full'>
<label htmlFor="title" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span  className="text-slate-800 text-white">Price</span>
        
        </label>
        <input
            type="text"
            id="amount"
            className="justify-center items-start p-3.5 mt-1 text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Enter price per copy in ETH e.g 1500"
            aria-label="amount"
            style={{fontSize: 13, background: '#140C1F',color: "white", width : "95%"}}
            {...register('amount')}
        />
        {errors.amount && <span className="text-red-600">{errors.amount.message}</span>}
</div>

</div>











          {/* <label htmlFor="name" className="mt-8 text-sm font-bold text-gray-400 text-white">
            <span className="text-slate-800 text-white">Author</span>
          
          </label>
          <input
            type="text"
            id="author"
            className="justify-center items-start p-3.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Enter your name"
            aria-label="author"
            style={{fontSize: 13,background: '#140C1F',   color: "white"}}
            {...register('author')}
          />
          {errors.author && <span className="text-red-600">{errors.author.message}</span>} */}
          <label htmlFor="description" className="mt-4 text-sm font-bold text-gray-400">
            <span className="text-slate-800 text-white">Description</span>
            {/* <span className="text-gray-400" style={{ fontSize: 11 }}> (Describe what your brand, product or service does)</span> */}
          </label>
          <textarea
            id="description"
            className="justify-center items-start p-3.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border text-black"
            placeholder="Enter description here"
            aria-label="description"
            rows={5}
            style={{fontSize: 13, background:  '#140C1F',   color: "white"}}
            {...register('description')}
          ></textarea>
          {errors.description && <span className="text-red-600">{errors.description.message}</span>}
         
          
         

          <div className="flex gap-4 mt-7 text-sm font-medium flex-wrap" style={{ width: "90%", alignSelf: "center",}}>
            <button
            
              type="submit"
              className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
              style={{ background: "#F81DFB", width: "100%", height: 50, borderRadius: 50,  marginTop: 32  }}
              
            >
              Upload Post
            </button>

         
       
          </div>
        </form>
        <div style={{height: 100}}></div>

      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="relative  bg-darkBlue text-white p-6 rounded-lg w-full max-w-lg mx-auto text-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
                <>

<div className="flex-col justify-center items-center">
  <div className="flex flex-col justify-center items-center mb-5">
  {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="98px" height="98px"><polygon  fill="#42a5f5"  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"/><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"/></svg> */}
  
  <ReactSVG
                  src="/assets/book.svg"
                  beforeInjection={(svg) => {
                    svg.setAttribute('style', 'width: 100px; height: auto;');
                  }}
                />
  </div>
  <h2 className="text-xl font-semibold mb-4">Upload Successful</h2>
  <div className="flex-1 flex justify-center">Your NFT book has been successfully uploaded to the marketplace</div>
  
</div>
        </> 
      </Modal>
    </div>
    }
    
    </>

  );
};

export default Create2;


