import Head from "next/head";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
//custom
const Navbar = dynamic(() => import("./navbar"));
const SideMenu = dynamic(() => import("../layout/sideMenu"));
const Banner = dynamic(() => import("./banner"));
const BottomNav = dynamic(() => import("./bottomNav"));
const EventModal = dynamic(() => import("../modals/eventModal"));

const variants = {
  hide: { opacity: 1 },
  enter: { opacity: 1 },
};

export default function Layout({ children, path }) {
  //console.log(router.route)
  return (
    <>
      <Head>
        <title>Taka. Earn as you throw waste.</title>
      </Head>
      <Banner />
      <SideMenu/>
      <Navbar />
      <EventModal />
      <AnimatePresence
        exitBeforeEnter
        initial="hide"
        //onExitComplete={() => console.log("done")}
      >
        <motion.main
          key={path}
          initial="hide"
          animate="enter"
          exit="hide"
          variants={variants}
          transition={{ type: "easeInOut", duration: 0.25 }}
          className="page-content"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </>
  );
}
