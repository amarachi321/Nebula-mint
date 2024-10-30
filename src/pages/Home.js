// pages/index.js
import Header from '../components/Header';
import Hero from '../components/Hero';
import HIW from '../components/HIWs';
import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"home"} />
      <Hero />
      
      <HIW />
      {/* <NFTsGrid /> */}
      <Footer />
    </div>
  );
}
