// components/Menu.js
import Link from 'next/link';

const Menu = ({ categories }) => {
  return (
    <nav className="menu-primary-menu-container" aria-label="main menu">
      <ul id="menu-primary-menu" className="main-menu">
        {categories.map((category) => (
          <li key={category.id} className="menu-item">
            <Link href={category.href}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
