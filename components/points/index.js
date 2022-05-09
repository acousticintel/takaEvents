import { useEffect } from 'react';
import { useRouter } from 'next/router';
//custom packs
import { motion } from 'framer-motion';
import { useData } from '../../context/dataContext';
import Title from '../elements/title';
import ImageLoader from '../elements/imageLoader';


const contVar = {
  hide: {
  },
  show: {
    transition: {
      delayChildren: .5,
      staggerChildren: .3,
    }
  }
}

const coinVar = {
  hide: {
    opacity: 0,
    x: -40,
    rotate: -180
  },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: .25
    }
  }
}

const textVar = {
  hide: {
    opacity: 0,
    x: -15,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: .25,
      ease: 'easeIn'
    }
  }
}

const btnVar = {
  hide: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: .5,
      duration: .3,
      ease: 'easeIn'
    }
  }
}

export default function PointsSection() {
  const router = useRouter();
  const { userPoints } = useData();

  useEffect(()=>{},[userPoints])

  const handleOffersClick = e => {
    e.preventDefault();
    router.push('/offers')
  }

  return (
    <div className="points-sec">
      <Title title="Earned Points" light/>
      <div className="main_cont">
        <motion.div
          variants={contVar}
          initial="hide"
          animate="show"
          className="content_cont"
        >
          <motion.div variants={coinVar} className="image_cont">
            <div
              className="abs-center glow"
            />
            <div className="image">
              <ImageLoader src="/assets/points.svg" alt="" />
            </div>
          </motion.div>
          <div className="content">
            <motion.span
              variants={textVar}
            >
              Your Points
            </motion.span>
            <motion.span
              variants={textVar}
            >
              {userPoints}
            </motion.span>
            <motion.span variants={textVar}>
              Ksh {userPoints * 15}
            </motion.span>
          </div>
        </motion.div>
        <motion.button
          variants={btnVar}
          initial="hide"
          animate="show"
          className="button"
          onClick={handleOffersClick}
        >
          Get Cash
        </motion.button>
      </div>
    </div>
  );
}
