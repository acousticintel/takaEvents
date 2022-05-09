import Image from "next/image";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//custom pack
import { useSession } from "next-auth/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
//custom func
import { AuthGuard } from "../components/elements/authGuard";
//custom
import EventSelection from "../components/eventSelection";
import ImageLoader from "../components/elements/imageLoader";
//dynamic
const PointsSection = dynamic(() => import("../components/points"));
const EventModal = dynamic(() => import("../components/modals/eventModal"));

const contVar = {
  hide: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Profile() {
  const router = useRouter();
  const pageControl = useAnimation();
  const [pageRef, pageInView] = useInView();
  const { data: session } = useSession();

  useEffect(() => {
    Loaded();
  }, []);

  //start animation when in view
  useEffect(() => {
    if (pageInView) {
      pageControl.start("show");
    }
  }, [pageControl, pageInView]);

  function Loaded() {
    var element = document.getElementById("loader");
    if (element) {
      element.classList.add("loaded");
    }
  }

  const handleFaqClick = (e) => {
    e.preventDefault();
    router.push("/faq");
  };

  return (
    <AuthGuard>
      <EventModal />
      <motion.div
        className="profile-page"
        variants={contVar}
        initial="hide"
        ref={pageRef}
        animate={pageControl}
      >
        <motion.div
          variants={riseVar}
          className="flex items-center justify-start"
        >
          {session?.user && (
            <div className="relative h-14 w-14 mr-4 rounded-full overflow-hidden">
              <ImageLoader
                src={session.user.image}
                alt="pp"
              />
            </div>
          )}
          <div>
            <h4>Welcome</h4>
            <h5>{session?.user.name}</h5>
          </div>
        </motion.div>
        <motion.div variants={riseVar} className="prof__card">
          <h1 className="text-xl text-gray-400 font-semibold">
            Dispose your waste with us. Earn Points. Convert those points to{" "}
            <br />
            <span className="text-emerald-500 font-bold">Cash </span>
            or <span className="text-sky-500 font-bold">Discounts</span>.
          </h1>
          <div className="relative -mt-4 max-w-fit float-right">
            <ImageLoader src="/assets/bin.png" width={130} height={160} alt="" />
          </div>
        </motion.div>
        <></>
        <EventSelection />
        <motion.section className="points__sec" variants={riseVar}>
          <PointsSection />
        </motion.section>
        <div
          className="bg-cyan-200 bg-opacity-60 rounded-xl w-full 
          p-4 overflow-hidden max-h-52 shadow-lg"
          onClick={handleFaqClick}
        >
          <h1 className="text-2xl font-semibold text-emerald-900 w-4/5">
            Frequently asked Questions
          </h1>
          <p className="text-gray-400 font-light">
            Look through it. You might find the answer your looking for.
          </p>
          <div className="relative -mt-2 max-w-fit float-right">
            <ImageLoader src="/assets/faq.webp" width={130} height={120} alt="" />
          </div>
        </div>
      </motion.div>
    </AuthGuard>
  );
}
