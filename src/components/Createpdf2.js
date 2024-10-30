import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { Rings } from 'react-loader-spinner';
import Modal from 'react-modal';
import { ReactSVG } from 'react-svg';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useWriteContract, useWaitForTransactionReceipt,useReadContract, useAccount, } from 'wagmi';
const Create2 = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Defi');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);




  const { address } = useAccount();

  const { data: hash, writeContract, error, isPending } = useWriteContract();

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle file upload
  const handleFilesAdded = (files) => {
    const file = files[0]; // Assuming single file upload
    if (file && file.type === 'application/pdf') {
      setPdfFile(file); // Store the file object in state
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  

const onSubmit = async (formData) => {
    if (!pdfFile) {
      alert('Upload a PDF file to proceed');
      return;
    }
  
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const hash = array[0].toString(36).slice(0, 7);
    
    setLoading(true);
  
    const formDataObj = new FormData();
    formDataObj.append('pdf', pdfFile);
    formDataObj.append('Nftid', hash);
    formDataObj.append('userwallet',address);
    // formDataObj.append('data', JSON.stringify({Nftid : hash, pdfdata : pdfurl})); // Make sure 'data' is correctly defined.
  
    try {
      const response = await fetch('https://us-central1-almond-1b205.cloudfunctions.net/tronstorydapp/upload2', {
        method: 'POST',
        body: formDataObj,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Product ID:', result);
        navigate(`/create/${hash}`)
      } else {
        toast.error('Error: ' + result.error);
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFilesAdded,
    accept: 'application/pdf', // Only accept PDF files
    multiple: false,
  });



  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue text-white">
          <Rings
            visible={true}
            height="130"
            width="130"
            color="#F81DFB"
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div
          className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120"
          style={{
            background: "linear-gradient(to bottom,rgba(10, 54, 65, 1),rgba(12, 11, 21, 0.95),rgba(12, 11, 18, 1))",
          }}
        >
          <section
            className="flex flex-col justify-center items-center px-5 py-8 max-md:max-w-full md:px-20 text-white"
            style={{ background: '#140C1F' }}
          >
            <header
              style={{ marginBottom: 50 }}
              className="hidden md:block flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl text-white justify-center"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <h2
                  className="text-2xl leading-normal font-semibold text-slate-800 text-white"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF, #F81DFB)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontFamily: 'Oxanium',
                    fontSize: 50,
                    width: 900,
                  }}
                >
                  Upload your Story
                </h2>
                <p
                  className="mt-2 text-sm font-medium text-gray-400"
                  style={{ fontSize: 15, fontFamily: 'Oxanium' }}
                >
                  Ensure it's in PDF format
                </p>
              </div>
            </header>

            <form className="flex flex-col w-full max-w-2xl text-white"  onSubmit={handleSubmit(onSubmit)}
  encType="multipart/form-data" >
              <div
                {...getRootProps()}
                className="flex justify-center items-center text-center px-4 py-2 mt-1 w-full text-sm rounded-lg border-2 border-dashed border-gray-300 text-white"
                style={{ cursor: 'pointer', height: 400 }}
              >
                <input {...getInputProps()} />
                {pdfFile ? (
                  <p>Selected File: {pdfFile.name}</p>
                ) : (
                  <span
                    className="text-gray-400"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
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
              {/* <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button> */}
                <div className="flex gap-4 mt-7 text-sm font-medium flex-wrap" style={{ width: "90%", alignSelf: "center",}}>
            <button
              type="submit"
              className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
              style={{ background: "#F81DFB", width: "100%", height: 50, borderRadius: 50,  marginTop: 32  }}
            >
              Continue
            </button>

         
       
          </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default Create2;
