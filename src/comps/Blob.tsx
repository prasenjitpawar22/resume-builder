import React, { useRef, useState } from 'react'
import { circIn, motion, useMotionValue, useMotionValueEvent } from 'framer-motion'

type TProps = {
}
const SVG_WIDTH = 200;
const SVG_HEIGHT = 200;
const ORIGSPEEDX = 20;
const ORIGSPEEDY = 110;
const width = window.innerWidth
const height = window.innerHeight

const INERTIA = 10

const Blob: React.FC<TProps> = () => {
  const mainConstraintRef = useRef(null)
  const [x, setX] = useState(width - SVG_WIDTH);
  const [speedX, setSpeedX] = useState(ORIGSPEEDX);
  const [y, setY] = useState(height - SVG_HEIGHT);
  const [speedY, setSpeedY] = useState(ORIGSPEEDY);


  const newX = useMotionValue(0)

  useMotionValueEvent(newX, "change", () => {
    console.log(newX, "change");
  })

  // useMotionValueEvent(newX, "animationStart", () => {
  //   console.log("animation started on x", newX)
  // })



  return (
    <>
      <div className='absolute overflow-hidden w-full h-full flex flex-wrap '>
        <motion.div className='w-full flex justify-center flex-wrap'
          ref={mainConstraintRef}>

          <motion.div className='flex absolute h-fit w-fit'
            // transition={{ ease: 'linear', repeat: Infinity, }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 8,
              ease: "linear",
            }}
            style={{ x: newX }}
            animate={{ x: [x, -x, x], y: [y, -y, y] }}
            onAnimationStart={() => {
              console.log(newX.get(), "asd");
              newX.set(newX.get() + INERTIA + 100)
              console.log(newX.get(), "asd1");
            }}
          // onAnimationComplete={() => {
          //   console.log(x);
          //   if (x >= width - SVG_WIDTH) {
          //     setX(-(width - SVG_WIDTH))
          //   }
          //   else {
          //     setX(width - SVG_WIDTH)
          //   }
          //   if (y >= height - SVG_HEIGHT) {
          //     setY(-(height - SVG_HEIGHT))
          //   }
          //   else {
          //     setY(height - SVG_HEIGHT)
          //   }
          // }}
          // onAnimationComplete={() => {
          //   console.log(y, window.innerHeight);
          //   setX(x + speedX);
          //   setY(y + speedY);
          //   if (x >= 0) {
          //     setSpeedX(-ORIGSPEEDX);
          //   }
          //   if (x <= -window.innerWidth + SVG_WIDTH) {
          //     setSpeedX(ORIGSPEEDX);
          //   }

          //   if (y >= window.innerHeight / 2) {
          //     setSpeedY(-ORIGSPEEDY);
          //   }

          //   if (y <= -window.innerHeight / 2) {
          //     setSpeedY(ORIGSPEEDY);
          //   }
          // }}

          >
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg" >
              <path fill="#FF0066" d="M28.1,-38C39.6,-23.8,54.4,-18,54.6,-10.6C54.8,-3.1,40.5,6,32.3,17.4C24.2,28.7,22.3,42.4,15.6,46.5C8.8,50.5,-2.7,44.9,-15.5,41C-28.2,37,-42,34.6,-46.4,26.9C-50.8,19.1,-45.7,6,-40.1,-3.9C-34.6,-13.7,-28.6,-20.3,-21.8,-35.4C-15.1,-50.5,-7.5,-74,0.4,-74.5C8.3,-74.9,16.6,-52.3,28.1,-38Z"
                transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M11.9,-9.7C20.9,-6.7,37.3,-8.1,48.1,-0.5C58.9,7,64.1,23.5,60.4,39.6C56.8,55.7,44.2,71.4,28.4,76.7C12.5,81.9,-6.8,76.7,-17.6,65.4C-28.4,54,-30.7,36.5,-42.6,21.7C-54.6,7,-76.2,-5.1,-79.1,-18.3C-81.9,-31.4,-65.9,-45.5,-49.6,-47.2C-33.3,-48.9,-16.7,-38.2,-7.6,-29.1C1.5,-20.1,3,-12.7,11.9,-9.7Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M54.4,-54.1C70.7,-51.2,84.1,-34.2,80.4,-19.4C76.7,-4.7,56,7.8,40.8,13.7C25.7,19.6,16.2,18.9,9.4,18C2.6,17.1,-1.4,15.9,-12.2,18.5C-23,21.1,-40.6,27.3,-53.7,22.4C-66.8,17.5,-75.4,1.3,-67.5,-6.4C-59.6,-14.2,-35.3,-13.6,-21.3,-16.9C-7.3,-20.2,-3.6,-27.4,7.7,-36.6C19.1,-45.8,38.2,-57,54.4,-54.1Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M22.4,-20C37.8,-13.7,65.1,-15,75.6,-5.9C86.1,3.2,79.7,22.8,65.5,28.9C51.3,35.1,29.4,27.8,12.3,34.3C-4.9,40.8,-17.2,61,-30.3,64.4C-43.3,67.8,-57,54.3,-58.9,39.6C-60.7,24.9,-50.6,8.9,-44.9,-5.3C-39.3,-19.4,-38,-31.6,-31.3,-39.4C-24.5,-47.2,-12.3,-50.6,-4.4,-45.4C3.5,-40.1,6.9,-26.3,22.4,-20Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M19.9,-29.2C28,-17,38.1,-12.7,44.7,-3.7C51.3,5.3,54.3,19.2,49.3,29C44.2,38.7,31.2,44.4,18.7,47.2C6.2,49.9,-5.9,49.7,-16.5,45.7C-27.1,41.7,-36.3,34,-37.6,24.9C-38.9,15.9,-32.4,5.7,-32,-7.2C-31.6,-20.1,-37.2,-35.5,-32.9,-48.4C-28.5,-61.3,-14.3,-71.5,-4.2,-66.5C5.9,-61.6,11.9,-41.4,19.9,-29.2Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M30.9,-32.6C40,-29.2,47.4,-19.4,54.7,-5.6C62,8.3,69.2,26.2,62.3,34C55.5,41.8,34.5,39.5,17.1,44.8C-0.2,50.2,-14,63.2,-28.3,64C-42.7,64.8,-57.6,53.3,-58.5,39.6C-59.4,26,-46.3,10.1,-37.8,-1.2C-29.3,-12.4,-25.4,-19,-19.9,-23.1C-14.3,-27.1,-7.2,-28.6,1.9,-30.9C10.9,-33.1,21.8,-36,30.9,-32.6Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M31.1,-40.4C42.6,-27.5,55.6,-19.8,56.3,-10.7C57,-1.5,45.4,9,37.3,20.2C29.2,31.4,24.6,43.2,14.8,51.6C4.9,59.9,-10.2,64.8,-21.3,60.1C-32.4,55.4,-39.5,41.2,-50.3,26.9C-61.1,12.6,-75.6,-1.6,-71.2,-10.1C-66.8,-18.6,-43.5,-21.3,-28.4,-33.6C-13.4,-45.9,-6.7,-67.8,1.6,-69.7C9.8,-71.6,19.7,-53.4,31.1,-40.4Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M28.4,-33.1C36.5,-27.1,42.5,-17.8,42.3,-8.9C42.2,0,35.9,8.6,31.4,19.7C26.9,30.8,24,44.5,16.3,49.3C8.6,54.1,-4.1,50,-11.8,42.7C-19.6,35.5,-22.5,25.1,-35.3,14.7C-48.1,4.3,-70.7,-6.1,-75.6,-19.4C-80.5,-32.8,-67.7,-49.1,-52.1,-53.7C-36.6,-58.3,-18.3,-51.3,-4.1,-46.5C10.2,-41.6,20.4,-39,28.4,-33.1Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M55,-60.9C69.1,-53.7,76.7,-34.3,72.5,-18.6C68.3,-3,52.2,8.9,42.8,24.1C33.3,39.2,30.5,57.6,22,60.9C13.6,64.1,-0.5,52.2,-9.2,41.8C-17.8,31.5,-21,22.7,-34.8,13.2C-48.6,3.6,-72.9,-6.8,-75.9,-17.5C-78.9,-28.2,-60.5,-39.2,-44.3,-46C-28.1,-52.8,-14.1,-55.3,3.2,-59.1C20.5,-62.9,40.9,-68,55,-60.9Z" transform="translate(100 100)" />
            </svg>
          </motion.div>

          <motion.div className='flex h-fit w-fit'
            drag dragConstraints={mainConstraintRef}>
            <svg viewBox="0 0 200 200" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M32.2,-33.4C41,-30.9,47.2,-20.1,52.2,-6.9C57.3,6.3,61.3,22,53.8,27.6C46.4,33.1,27.6,28.6,11.8,35.7C-3.9,42.8,-16.6,61.5,-25.9,62.1C-35.3,62.6,-41.3,45,-37.7,31.4C-34,17.8,-20.6,8.3,-14.5,1.5C-8.5,-5.3,-9.8,-9.2,-8.6,-13.2C-7.4,-17.1,-3.7,-21,4,-25.7C11.6,-30.4,23.3,-36,32.2,-33.4Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Blob