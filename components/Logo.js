import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import logo from './numberlessagaing_logo.png'; // Import the image file
import { motion } from "framer-motion";


export default function Logo() {
    return (
    
    <div className="flex flex-col items-center w-full h-15 mx-auto max-w-2xl">
      
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        // transition={{ duration: 0.2 }}
        initial={{ opacity: 0, rotate: -180 }} // Start rotated
        animate={{ opacity: 1, rotate: 0 }}   // Rotate to normal position
        exit={{ opacity: 0, rotate: 180 }}    // Rotate as it exits
        transition={{ duration: 1 }}  
>
    <Link href="/">
     <Image src={logo} alt="Numberless Aging Logo" width={100} height={100} />

    </Link> 
    </motion.button>
    </div>
)

}


