import Link from "next/link";
import Image from "next/image";
//custom packs
import { motion } from "framer-motion";
import { IoMdArrowDroprightCircle } from "react-icons/io";
//custom
import { useData } from "../../context/dataContext";
import Title from "../elements/title";

const contVar = {
  hide: {},
  show: {
    transition: {
      delayChildren: 1,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: -10,
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

export default function EventSelection() {
  const { onSetEvent } = useData();

  const handleClick = (e) => {
    onSetEvent(e);
  };

  const events = [
    {
      name: "Amapiano Tour",
      img: "/assets/event1.jpeg",
    },
    {
      name: "Sunday Siesta",
      img: "/assets/event2.jpeg",
    },
  ];

  return (
    <div className="events__section">
      <Title title="Events" />
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className={`events__list ${events.length === 1 && "single"}`}
      >
        {events.map((e, i) => (
          <motion.label
            key={i}
            variants={riseVar}
            htmlFor="event_modal"
            className="event modal-button modal-open"
            onClick={() => handleClick(e.name)}
          >
            <div className="image__cont">
              <Image
                src={e.img}
                objectFit="cover"
                objectPosition="top"
                layout="fill"
                alt=""
                placeholder="blur"
                blurDataURL="/assets/load.svg"
              />
            </div>
            <h1>{e.name}</h1>
          </motion.label>
        ))}
      </motion.div>
      <div className="w-full text-right pr-16">
        <Link href="/events">
          <button className="btn btn-xs btn-ghost gap-1">
            See All
            <IoMdArrowDroprightCircle size="1.5em" />
          </button>
        </Link>
      </div>
    </div>
  );
}
