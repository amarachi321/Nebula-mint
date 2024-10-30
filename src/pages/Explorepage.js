import Header from '../components/Header';
import Explore from '../components/Explore';
// import HIW from '../components/HIWs';
// import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Explorepage() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"create"} />
      <Explore />
      <Footer />

    </div>
  );
}
