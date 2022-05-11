import { useData } from '../../context/dataContext';
import SidebarItem from '../elements/sidebarItem';
import { motion, AnimatePresence } from 'framer-motion';
import { routes } from '../../context/vars';

const dropVar = {
  hide: {
    opacity: 0,
    height: 0,
    transition: {
      ease: 'easeInOut',
      duration: .25,
    }
  },
  show: {
    opacity: 1,
    height: '100%',
    transition: {
      ease: 'easeInOut',
      duration: .25,
    }
  }
}

export default function SideMenu() {
  const { side } = useData();

  return (
    <AnimatePresence exitBeforeEnter>
      {side && (
        <motion.div
          exit='hide'
          animate='show'
          initial='hide'
          variants={dropVar}
          className='fixed top-0 left-0 flex flex-col flex-1 inset-0 z-40
          bg-emerald-900 text-lime-50 max-h-screen overflow-hidden pt-20'>
          {
            routes?.length > 0 && routes.map((r,i)=>(
              <SidebarItem route={r} key={i}/>
            ))
          }
        </motion.div>
      )}
    </AnimatePresence>
  )
};
