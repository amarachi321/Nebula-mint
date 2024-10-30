import React from 'react';
import { ReactSVG } from 'react-svg';

const NFTCard = ({ image, title, author, price }) => (
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
            <p className="font-bold">{price} ETH</p>
            <p className="text-sm text-gray-400">($654,874.86)</p>
          </div>
        </div>
        {/* Centering the button */}
        <div className="flex justify-center mt-4">
          <button className="flex items-center justify-center">
            <ReactSVG
              src="/assets/bid.svg"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 220px; height: auto;");
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
  
  

const NFTsGrid = () => {
  const nfts = [
    { image: 'https://ik.imagekit.io/zjvk6l5gp/pexels-mnzoutfits-1598505.jpg?updatedAt=1720703777499', title: 'Monkey Ape', author: 'JSmith', price: '4.89' },
    { image: 'https://ik.imagekit.io/zjvk6l5gp/pexels-mnzoutfits-1598505.jpg?updatedAt=1720703777499', title: 'Moonfall', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image3.jpg', title: 'Wired Human', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image4.jpg', title: 'Racer-To-Go', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image5.jpg', title: 'Dark Witch', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image6.jpg', title: 'Silence and the Dark', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image7.jpg', title: 'One True Loves', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image8.jpg', title: 'The Genesis Wars', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image9.jpg', title: 'The Girl Who Fell Beneath the Sea', author: 'JSmith', price: '4.89' },
    { image: '/path-to-image10.jpg', title: 'Lakelore', author: 'JSmith', price: '4.89' },
  ];

  return (
    <div className="bg-black py-10" style={{background: '#140C1F'}}>
      <div className='flex justify-between'>
      <div className="text-left mb-12" style={{marginLeft: 80}}>
        {/* <p className="text-gray-400 text-sm">Most Loved NFTs Of The Time</p> */}
        <h1 className="text-white text-4xl font-bold" style={{background: "linear-gradient(to right, #FFFFFF, #F81DFB)",
          WebkitBackgroundClip: "text",
          color: "transparent", }}>Hot Trending NFTs</h1>
      </div>
      <div className="flex justify-end mb-4" style={{marginRight: 80}}>
          <button //className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full"
          >
          <ReactSVG src="/assets/viewAll.svg" beforeInjection={(svg) => {
        svg.setAttribute('style', 'width: 150px; height: auto;');
      }} />
          </button>
        </div>
      </div>

      <div className="container mx-auto">

        {/* <div 
        
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => (
            <NFTCard
              key={index}
              image={nft.image}
              title={nft.title}
              author={nft.author}
              price={nft.price}
            />
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {nfts.map((nft, index) => (
    <div key={index} className="w-full max-w-xs mx-auto">
      <NFTCard
        image={nft.image}
        title={nft.title}
        author={nft.author}
        price={nft.price}
      />
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default NFTsGrid;
