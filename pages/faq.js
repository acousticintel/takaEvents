//custom packs
import { motion } from "framer-motion";
//custom components
import Title from "../components/elements/title";
import { AuthGuard } from "../components/elements/authGuard";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
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
  return (
    <AuthGuard>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="fag__page"
      >
        <Title title="Frequently asked Questions" />
        <motion.section variants={contVar}>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              What items are recyleable with taka
            </div>
            <div className="collapse-content">
              <p>
                You can recyle by disposing with us your plastic cups and
                bottles, glass bottles, aluminium cans and electronics.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              Why I do get awarded points?
            </div>
            <div className="collapse-content">
              <p>
                You earn points when you dispose plastic, glass, aluminium or
                electronics waste with TakaEarth.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              What do I do with the points?
            </div>
            <div className="collapse-content">
              <p>
                You redeem the points to get cashbacks or offers where
                applicable with our partner brands.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              How do I redeem my points?
            </div>
            <div className="collapse-content">
              <p>
                You redeem by clicking on the (Get Cash) button which will
                prompt you to either get cashback or choose offers for your
                future purchases.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              How do I get cashback?
            </div>
            <div className="collapse-content">
              <p>
                You choose the cashback option and enter the number to which
                your money will be sent to in reference to the applicable mobile
                money wallet in your region (partner restrictions apply).
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              Who is FlexiPay?
            </div>
            <div className="collapse-content">
              <p>
                Its a mobile money wallet by Stanbic Bank that allows you to to
                live free by making financial transactions convenient, safe,
                quick, secure, affordable and easy way. You can send and receive
                money from other FlexiPay users at no charge, pay bills, shop
                and pay merchants and deposit or withdraw cash between the App,
                mobile networks and your bank at applicable costs.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              How do I find your nearest partner store?
            </div>
            <div className="collapse-content">
              <p>
                If you are at an event, we will notify you of our presence
                through the app notification and if its a drop off we will
                indicate all the available partner stores near you in the app.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              How comes my favourite brand is not available on your list of
              products?
            </div>
            <div className="collapse-content">
              <p>
                If your favourite brand is not available, we will work to make
                it available. Kindly let us know what brand it is through the
                feedback text below.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              How much is 1 point equivalent to?
            </div>
            <div className="collapse-content">
              <p>
                The value of 1 point varies depending on the brand that you are
                recyling since different brands attach different value to
                sustainability.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              Can I redeem more than one item?
            </div>
            <div className="collapse-content">
              <p>
                Yes. You are welcome to redeem more than one item. However
                please note that the cashbacks and offers may be limited within
                timelines and they may be offered interchangeably.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={riseVar}
            tabIndex="0"
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              What do you do with the waste?
            </div>
            <div className="collapse-content">
              <p>
                We have waste management partners who we hand over the waste for
                disposal and recycling. You can check out how much impact you
                have saved on the environment by recycling with TakaEarth here.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </AuthGuard>
  );
}
