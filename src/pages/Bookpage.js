import Header from '../components/Header';
import Books from '../components/Books';
// import HIW from '../components/HIWs';
// import NFTsGrid from '../components/Nfts';
import Footer from '../components/Footer';


export default function Bookpage() {
  return (
    <div className=" text-white bg-darkBlue ">
      <Header page={"create"} />
      <Books />
      <Footer />

    </div>
  );
}
