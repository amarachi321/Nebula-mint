import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import Create from "./pages/Create"
import Profile from "./pages/UserProfile"
import Explorepage from "./pages/Explorepage"
import Collectionpage from "./pages/Collectionpage"
import Bookpage from "./pages/Bookpage"
import Createpdf from "./pages/Createpdf"
import Bookpage2 from "./pages/Bookpage2"
import Bookpage3 from "./pages/Bookpage3"
import '@rainbow-me/rainbowkit/styles.css';
// import { http, createConfig } from 'wagmi';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider,http, createConfig,   } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  auroraTestnet,
  aurora
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import './App.css';
const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'NebulaMint',
  projectId: '3fbb6bba6f1de962d911bb5b5c9dba88',
  chains: [auroraTestnet,aurora, polygon, optimism, arbitrum, base],

});

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/:id" element={<Create />} />
        <Route path="/create2" element={<Createpdf/>} />

        <Route path="/explore" element={<Explorepage />} />
        <Route path="/collection" element={<Collectionpage />} />
        <Route path="/nftbook/:id" element={<Bookpage />} />
        <Route path="/nftbook2/:id" element={<Bookpage2 />} />
        <Route path="/resalebook" element={<Bookpage3 />} />
       
      </Routes>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
