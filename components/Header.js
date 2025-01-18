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
 
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
    </header>
  );
}
