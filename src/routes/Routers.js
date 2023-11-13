import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import WallOfFame from "../pages/Kudos";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import MyItems from "../pages/MyItems";
import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import Details from "../components/ui/DetailSection";
import Landing from "../pages/Landing";
// import WallofFame from "../pages/WallOfFame";
import Play from "../pages/Play";
import Kudos from "../pages/Kudos";


const Routers = () => {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/marketplace" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/myitems" element={<MyItems />} />
      <Route path="/create" element={<Create />} />
      {/* <Route path="/kudos" element={<Kudos />} /> */}
      <Route path="/WallOfFame" element={<Kudos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/market/:id" element={<NftDetails />} />
      <Route path="/detail/:id" element={<Details />} />
      {/* <Route path="/wallOfFame" element={<WallofFame />} /> */}
      <Route path="/play" element={<Play />} />
    </Routes>
  );
};

export default Routers;
