import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import Image from "next/image";

//custom
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);

const contVar = {
  closed: {
    y: -10,
    scale: 0.95,
    opacity: 0,
  },
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      staggerChildren: 0.15,
    },
  },
};

const childVar = {
  closed: {
    scale: 0.95,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

function Navbar({ router }) {
  const { data: session, status } = useSession();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  if (router.pathname === "/landing") {
    return (
      <nav className="flex justify-around items-center text-teal-900 bg-lime-50 min-w-full h-20 pt-6">
        <div className="flex items-center">
          <div className="relative w-6 h-8 mr-2">
            <Image src="/assets/logo.png" alt="logo" layout="fill" />
          </div>
          <span
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            TAKA
          </span>
        </div>
        {status !== "loading" && status === "unauthenticated" && (
          <Link href="/auth/signin" passHref={true}>
            <button
              className={`bg-neutral
                    text-gray-800 font-bold rounded-full my-6 
                    py-2 px-4 shadow-md focus:outline-none 
                    focus:shadow-outline transform transition 
                    hover:scale-105 duration-300 ease-in-out`}
            >
              Login / SignUp
            </button>
          </Link>
        )}
      </nav>
    );
  } else if (router.pathname.indexOf("/auth/") === 0) {
    return (
      <nav className="flex justify-around items-center text-teal-900 bg-neutral min-w-full h-20 pt-6">
        <div className="flex items-center">
          <div className="relative w-6 h-8 mr-2">
            <Image src="/assets/logo.png" alt="logo" layout="fill" />
          </div>
          <span
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            TAKA
          </span>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-around items-center text-teal-900 min-w-full h-20 pt-6">
        <button className="btn btn-ghost btn-circle" onClick={handleClick}>
          <BiLeftArrow size="1.5em" />
        </button>
        <span className="uppercase font-medium">{router.pathname?.slice(1)}</span>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user && (
              <div className="relative h-7 w-7 rounded-full overflow-hidden">
                <Image src={session.user.image} layout="fill" alt="pp" />
              </div>
            )}
          </label>

          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
