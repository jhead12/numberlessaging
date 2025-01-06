import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import logo from 'components/numberlessagaing_logo.png'; // Import the image file

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="block w-20 h-12 mx-auto mb-5">
      <Link href="/"><Image src={logo} alt="Numberless Aging Logo" width={100} height={100} /></Link> 
      </div>
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
    </header>
  );
}