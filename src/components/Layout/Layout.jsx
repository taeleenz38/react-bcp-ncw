import React from "react";
import Routers from "../../routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./layout.css";



const Layout = () => {
  return (
    <div className="wrap">
      <Header />
      <Routers />
    </div>
  );
};

export default Layout;
