import { useState } from 'preact/hooks'


import Home from "./pages/Home/Home";
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
export function App() {


  return (
    <>
    <Navbar/>
<Home/>
<Footer/>
    </>
  )
}
