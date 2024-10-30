import Header from '../components/Header';
import Collection from '../components/Collection';
// import HIW from '../components/HIWs';
// import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Collectionpage() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"create"} />
      <Collection />
      <Footer />

    </div>
  );
}
