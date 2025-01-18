import Link from 'next/link';
import React from 'react';
import Logo from './Logo';

export default function Header({ name, setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="pt-20 pb-10">
      <Logo />
      {/* <h1>{name}</h1> */}
      {/* <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="w-full p-2 mt-4 mb-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
    </header>
  );
}
