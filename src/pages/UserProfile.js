// pages/index.js
import Header from '../components/Header';
import UserProfileCard from '../components/Profile';
// import HIW from '../components/HIWs';
// import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Profile() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"create"} />
    
      <UserProfileCard />
      <Footer />
      {/* <Hero />
      
      <HIW />
      <NFTsGrid />
      <Footer /> */}
    </div>
  );
}




