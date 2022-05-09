//custom packs
import { motion } from "framer-motion";
//context
import { useData } from "../context/dataContext";
//custom components
import Promo from "../components/elements/promo";
import Title from "../components/elements/title";
import { AuthGuard } from "../components/elements/authGuard";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    x: -50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.95,
      duration: 0.25,
    },
  },
};

export default function Offers() {
  const { offers } = useData();

  return (
    <AuthGuard>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="offers-page"
      >
        <motion.div variants={riseVar} className="buttons-sec">
          <h1>CashBack</h1>
          <p>
            Cash back refers to a credit card that refunds a small percentage of
            money spent on purchases.
          </p>
          <div className="float-right">
            <button className="btn btn-accent">Send to Mpesa</button>
          </div>
        </motion.div>
        <Title title="Offers" />
        <section>
          <motion.div variants={contVar} className="promo-section">
            {offers?.length > 0 &&
              offers.map((v, i) => <Promo p={v} key={i} index={i} />)}
          </motion.div>
          {offers?.length < 1 && (
            <div className="text-gray-400 text-center w-full font-light text-lg">
              <p>No promotions currently.</p>
              <p>Please check at a later date.</p>
            </div>
          )}
        </section>
      </motion.div>
    </AuthGuard>
  );
}
