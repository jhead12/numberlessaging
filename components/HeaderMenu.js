import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../services/api/catagories';
import HeaderMenu from './Menu';
import i from '@fortawesome/fontawesome-svg-core';
import Logo from "./Logo"

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    getCategories();
  }, []);

  return (
    <header className="bg-white shadow w-full">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div>
          <details className="relative">
            {/* <summary className="flex items-center cursor-pointer">
              <svg className="w-10 h-10 text-primary-cool-75 hover:text-primary-cool-50">
                <use href="/about"></use>
              </svg>
              <svg className="w-8 h-8 text-primary-cool-75 hover:text-primary-cool-50">
                <use href="#"></use>
              </svg>
            </summary> */}
            <div className="absolute top-0 right-0 z-10 w-48 py-2 mt-12 bg-white shadow-lg rounded-md">
              <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</Link>
              <Link href="/featured-products" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Featured Products</Link>
              <Link href="/community" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Community</Link>
              <Link href="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Register</Link>
              <Link href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">login</Link>


            </div>
          </details>
          {/* Subscribe Button */}
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded">SUBSCRIBE</button>
            <Link href="#" className="text-primary hover:text-primary-dark">
              {/* <svg className="w-6 h-6">
                <use href="#"></use>
              </svg> */}
            </Link>
            <Link href="#" className="text-primary hover:text-primary-dark">
              {/* <svg className="w-6 h-6">
                <use href="#"></use>
              </svg> */}
            </Link>
          </div>
          <Link href="/advertiserDiscloure" >
            <button className="bg-transparent text-primary underline">Advertiser Disclosure</button>
          </Link>
        </div>
        {/* <Logo /> */}
        
        {/* Centered Logo */}
        <Link href="/" className="flex-1 flex justify-center text-primary text-lg font-bold">
          <h1>Numberless Aging </h1> 
          <svg className="w-12 h-12">
            <use href="#"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
