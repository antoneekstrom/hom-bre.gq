import { motion, useAnimation, useMotionValue } from 'framer-motion';
import React, { CSSProperties, PropsWithChildren, useState } from 'react';
import { useScrollAnimation } from '../util';
import { coreProps } from './Common';
import PaperStack from './PaperStack';
import './ScrollIndicator.scss';

export default function ScrollIndicator(props: {pages: number}) {
  const y = useMotionValue('0rem');

  const scrollTo = useScrollAnimation();

  return (
    <PaperStack style={{backgroundColor: 'var(--secondary-0)'}} className="scroll-indicator">
      <PaperStack style={{backgroundColor: 'var(--primary-0)'}}>
        <PaperStack style={{backgroundColor: 'var(--contrast-1)'}}>
          <ol>
            <Dot i={0}>
              <motion.div style={{y}} className="indicator"/>
            </Dot>
            <Dot i={1} />
            <Dot i={2}/>
            <Dot i={3}/>
          </ol>
        </PaperStack>
      </PaperStack>
    </PaperStack>
  )

  function animate(index: number) {
    y.set(`${3.5 * index}rem`);
    scrollTo(index* 500);
  }

  function Dot(props: PropsWithChildren<{i: number}>) {
    return (
      <li className="dot"><div onClick={handleClick}>{props.children}</div></li>
    )

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.stopPropagation();
      e.preventDefault();
      animate(props.i);
    }
  }
}