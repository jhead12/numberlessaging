import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import logo from 'components/numberlessagaing_logo.png'; // Import the image file
import { motion } from "framer-motion";

export default function Header({ name }) {

  return (
    

    <header className="pt-20 pb-12">

      <div className="block w-20 h-12 mx-auto mb-5">
      
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  // transition={{ duration: 0.2 }}
  initial={{ opacity: 0, rotate: -180 }} // Start rotated
  animate={{ opacity: 1, rotate: 0 }}   // Rotate to normal position
  exit={{ opacity: 0, rotate: 180 }}    // Rotate as it exits
  transition={{ duration: 1 }}  
>
      <Link href="/"><Image src={logo} alt="Numberless Aging Logo" width={100} height={100} /></Link> 
      </motion.button>
      </div>
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
    </header>
  )}
