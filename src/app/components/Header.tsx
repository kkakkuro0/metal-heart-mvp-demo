"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faRightToBracket,
  faUserPlus,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect for client-side theme rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-1 transition-transform duration-200 transform group-hover:scale-[1.02]">
              <span className="text-red-600 text-3xl font-black group-hover:text-red-500 transition-colors">
                M
              </span>
              <div className="flex flex-col leading-none ml-[-2px]">
                <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Metal{" "}
                  <span className="text-red-600 group-hover:text-red-500 transition-colors">
                    Heart
                  </span>
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                  금속거래플랫폼
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/exchange" text="거래소" />
            <NavLink href="#" text="입출금" />
            <NavLink href="#" text="투자내역" />
            <NavLink href="#" text="시황정보" />
          </nav>

          {/* Auth & Theme Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="mr-1.5 h-4 w-4"
              />
              로그인
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 rounded-md transition-colors"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-1.5 h-4 w-4" />
              회원가입
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                className="h-4 w-4"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2 transition-colors"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                className="h-4 w-4"
              />
            </button>
            <button
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-slideDown">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <MobileNavLink href="/exchange" text="거래소" />
            <MobileNavLink href="#" text="입출금" />
            <MobileNavLink href="#" text="투자내역" />
            <MobileNavLink href="#" text="시황정보" />
            <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-3 grid grid-cols-2 gap-3">
              <Link
                href="#"
                className="flex items-center justify-center py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="mr-2 h-4 w-4"
                />{" "}
                로그인
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center py-2 px-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white rounded-md transition-colors"
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2 h-4 w-4" />{" "}
                회원가입
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, text }: { href: string; text: string }) => (
  <Link
    href={href}
    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    {text}
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({
  href,
  text,
  Icon,
}: {
  href: string;
  text: string;
  Icon?: React.ElementType;
}) => (
  <Link
    href={href}
    className="flex items-center py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
  >
    {Icon && <Icon className="mr-2 w-5 h-5" />}
    {text}
  </Link>
);

export default Header;
