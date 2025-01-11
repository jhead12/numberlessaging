import Link from 'next/link';
// import Image from 'next/image'; // Import the Next.js Image component
// import logo from 'components/numberlessagaing_logo.png'; // Import the image file
// import { motion } from "framer-motion";
import Logo from './Logo';

export default function Header({ name }) {

  return (
    

    <header className="pt-20 pb-10">

      <Logo />
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>


    </header>
    
  )}
