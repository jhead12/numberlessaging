import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../services/api/catagories';
import HeaderMenu from '../components/menu';
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
            <summary className="flex items-center cursor-pointer">
              <svg className="w-10 h-10 text-primary-cool-75 hover:text-primary-cool-50">
                <use href="#"></use>
              </svg>
              <svg className="w-8 h-8 text-primary-cool-75 hover:text-primary-cool-50">
                <use href="#"></use>
              </svg>
            </summary>
            {/* {/* <Link categories={categories} /> */}
          </details>
          {/* Subscribe Button */}
          <div className="flex items-center space-x-4">
      
            {/* <button className="bg-primary text-white px-4 py-2 rounded">SUBSCRIBE</button> */}
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
        
        <Link href="#" className="flex-1 flex justify-center text-primary text-lg font-bold">
     
                Numberless Aging
        {/* <h1>Numberless Aging </h1> */}
{/* 
          <svg className="w-12 h-12">
            <use href="#"></use>
          </svg> */}
        </Link>
        
        {/* Search Button */}
        {/* <div className="relative">
          <form method="get" action="#" className="flex items-center">
            <input
              id="header-search"
              type="text"
              name="s"
              className="border border-gray-300 rounded-l px-4 py-2"
              placeholder="Search"
              aria-label="search"
            />
            <button type="submit" aria-label="search" className="bg-primary text-white px-4 py-2 rounded-r">
              <svg className="w-6 h-6">
                <use href="#"></use>
              </svg>
            </button>
          </form>
        </div> */}
        {/* Mobile Search */}
        {/* <details className="relative">
          <summary className="flex items-center cursor-pointer">
            <svg className="w-10 h-10 text-primary-cool-75 hover:text-primary-cool-50">
              <use href="#"></use>
            </svg>
            <svg className="w-5 h-5 text-primary-cool-75 hover:text-primary-cool-50">
              <use href="#"></use>
            </svg>
          </summary>
          <div className="absolute top-full left-0 right-0 bg-white shadow-md mt-2">
            <form method="get" action="#" className="flex items-center p-4">
              <input
                id="header-mobile-search"
                type="text"
                name="s"
                className="border border-gray-300 rounded-l px-4 py-2"
                placeholder="Search"
                aria-label="search"
              />
              <button type="submit" aria-label="search" className="bg-primary text-white px-4 py-2 rounded-r">
                <svg className="w-6 h-6">
                  <use href="#"></use>
                </svg>
              </button>
            </form>
          </div>
        </details> */}
      </div>
    </header>
  );
};


export default Header;
