import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";

const contVar = {
  hide: { opacity: 1 },
  show: { opacity: 1 },
};

const revealVar = {
  normal: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    y: -10,
    scale: 1.4,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

const iconVar = {
  normal: {
    color: "#9ca3af",
    backgroundColor: "#fff",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    color: "#fff",
    backgroundColor: "#059669",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

const textVar = {
  normal: {
    color: "#9ca3af",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
  show: {
    color: "#059669",
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  },
};

export default function NavTab({ icon, href, text }) {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    if (router.pathname === href) {
      controls.set("show");
    } else {
      controls.set("normal");
    }
  }, [router]);

  return (
    <div className="w-full">
      <Link href={href}>
        <motion.a
          variants={contVar}
          animate={controls}
          className="selected"
        >
          <motion.div variants={revealVar} className="icon__cont__out">
            <motion.div variants={iconVar} className="icon__cont__in">
              {icon}
            </motion.div>
          </motion.div>
          <motion.span variants={textVar}>{text}</motion.span>
        </motion.a>
      </Link>
    </div>
  );
}
