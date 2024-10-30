// pages/index.js
import Header from '../components/Header';
import Create2 from '../components/create2';
// import HIW from '../components/HIWs';
// import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"create"} />
      <Create2 />
      <Footer />

    </div>
  );
}
