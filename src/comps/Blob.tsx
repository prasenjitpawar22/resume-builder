import React, { useRef, } from 'react'
import { AnimationControls, motion, } from 'framer-motion'

type TProps = {
  animationBolobLeft: AnimationControls
  animationBolobRight: AnimationControls
}

const Blob: React.FC<TProps> = (props: TProps) => {
  const { animationBolobLeft, animationBolobRight } = props
  const mainConstraintRef = useRef(null)

  return (
    <>
      <motion.div className='absolute overflow-hidden w-full h-full flex flex-wrap  '>
        <motion.div className=''
          ref={mainConstraintRef}>

          <motion.div animate={animationBolobLeft}
            className='absolute top-0 h-fit w-fit tablet:-top-48 tablet:-left-20 phone:-top-56 phone: -left-56'>
            <svg viewBox="0 0 200 200"
              className='tablet:w-[40rem] tablet:h-[50rem] phone:w-[37rem] phone:h-[45rem] ' xmlns="http://www.w3.org/2000/svg" >
              <path fill="#FF0066" d="M28.1,-38C39.6,-23.8,54.4,-18,54.6,-10.6C54.8,-3.1,40.5,6,32.3,17.4C24.2,28.7,22.3,42.4,15.6,46.5C8.8,50.5,-2.7,44.9,-15.5,41C-28.2,37,-42,34.6,-46.4,26.9C-50.8,19.1,-45.7,6,-40.1,-3.9C-34.6,-13.7,-28.6,-20.3,-21.8,-35.4C-15.1,-50.5,-7.5,-74,0.4,-74.5C8.3,-74.9,16.6,-52.3,28.1,-38Z"
                transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div animate={animationBolobRight}
            className='absolute bottom-0 right-0 tablet:-bottom-48 tablet:-right-20 phone:-bottom-24 phone:-right-32 h-fit w-fit'
          >
            <svg viewBox="0 0 200 200"
              className='tablet:w-[40rem] tablet:h-[50rem] phone:w-[27rem] phone:h-[30rem]' xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M11.9,-9.7C20.9,-6.7,37.3,-8.1,48.1,-0.5C58.9,7,64.1,23.5,60.4,39.6C56.8,55.7,44.2,71.4,28.4,76.7C12.5,81.9,-6.8,76.7,-17.6,65.4C-28.4,54,-30.7,36.5,-42.6,21.7C-54.6,7,-76.2,-5.1,-79.1,-18.3C-81.9,-31.4,-65.9,-45.5,-49.6,-47.2C-33.3,-48.9,-16.7,-38.2,-7.6,-29.1C1.5,-20.1,3,-12.7,11.9,-9.7Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Blob