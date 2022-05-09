import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import ImageLoader from "../elements/imageLoader";
//custom
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);
const FaRegUserCircle = dynamic(
  async () => (await import("react-icons/bi")).FaRegUserCircle
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
      when:"beforeChildren",
      duration: 0.5,
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
      duration: 0.25,
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
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-teal-900 bg-lime-50 min-w-full h-20 pt-6"
      >
        <Link href="/">
        <motion.div variants={childVar} className="flex items-center">
          <div className="relative w-6 h-8 mr-2">
            <Image src="/assets/logo.png" alt="logo" layout="fill" />
          </div>
          <span
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            TAKA
          </span>
        </motion.div>
        </Link>
        {status !== "loading" && status === "unauthenticated" && (
          <Link href="/auth/signin" passHref={true}>
            <motion.button variants={childVar}
              className={`bg-neutral
                    text-gray-800 font-bold rounded-full my-6 
                    py-2 px-4 shadow-md focus:outline-none 
                    focus:shadow-outline transform transition 
                    hover:scale-105 duration-300 ease-in-out`}
            >
              Login / SignUp
            </motion.button>
          </Link>
        )}
      </motion.nav>
    );
  } else if (router.pathname.indexOf("/auth/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-teal-900 min-w-full h-20 pt-6"
      >
        <motion.div variants={childVar} className="flex items-center">
          <div className="relative w-6 h-8 mr-2">
            <Image src="/assets/logo.png" alt="logo" layout="fill" />
          </div>
          <span
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            TAKA
          </span>
        </motion.div>
      </motion.nav>
    );
  } else {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-teal-900 min-w-full h-20 pt-6"
      >
        <motion.button variants={childVar} className="btn btn-ghost btn-circle" onClick={handleClick}>
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.span variants={childVar} className="uppercase font-medium">
          {router.pathname?.slice(1)}
        </motion.span>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="relative h-7 w-7 rounded-full overflow-hidden">
                <ImageLoader src={session.user.image} alt="pp" />
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
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
        </motion.div>
      </motion.nav>
    );
  }
}

export default withRouter(Navbar);
