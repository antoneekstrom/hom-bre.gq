import { motion, MotionStyle, useAnimation, useMotionTemplate, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';
import React, { CSSProperties, PropsWithChildren, useEffect, useState } from 'react';
import { useScrollAnimation } from '../util';
import { coreProps } from './Common';
import PaperButton from './PaperButton';
import PaperStack from './PaperStack';
import './ScrollIndicator.scss';

export default function ScrollIndicator(props: {pages: number, pageHeight: number}) {
  const {pageHeight} = props;

  const scrollTo = useScrollAnimation();
  const { scrollY, scrollYProgress } = useViewportScroll();

  const y = useMotionValue('0%');
  const yp = useMotionValue('100%');

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  return (
    <PaperStack className="scroll-indicator">
      <PaperStack>
        <PaperStack>
          <ol>
            <Dot i={0}>
              <motion.div style={{ y } as MotionStyle} className="indicator">
                <motion.span />
              </motion.div>
            </Dot>
            {[...Array(props.pages - 1)].map((_, i) => <Dot key={i} i={i + 1} />)}
          </ol>
        </PaperStack>
      </PaperStack>
    </PaperStack>
  )

  function onScroll() {
    animate(window.scrollY);
  }
  
  function animate(scroll: number) {
    const i = Math.floor(scrollY.get() / pageHeight);
    
    y.set(`${i * 100}%`);
    
    const progressBetween = (scroll % pageHeight) / pageHeight;
    const h = (1 + progressBetween) * 50;

    yp.set(`${h}%`)
  }

  function Dot(props: PropsWithChildren<{i: number}>) {
    return (
      <li onClick={e => handleClick(e)}>
        {props.children}
        <div className="dot"/>
      </li>
    )

    function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
      e.stopPropagation();
      e.preventDefault();
      scrollTo(props.i * pageHeight + 10);
    }
  }
}