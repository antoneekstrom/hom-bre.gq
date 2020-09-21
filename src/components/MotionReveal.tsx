import { AnimationControls, motion, TargetAndTransition, Transition } from 'framer-motion';
import React, { PropsWithChildren, useState } from 'react';
import { useIntersectionObserver } from './intersection';

type TwoStateValue<T = any> = [a: T, b: T]

export type MotionRevealProps = PropsWithChildren<{
  hidden: TargetAndTransition
  visible: TargetAndTransition
  once?: boolean
}>

const spring: Transition = {
  type: 'spring',
  damping: 6,
  stiffness: 150
}

export default function MotionReveal(props: MotionRevealProps) {
  const motionProps = useMotionReveal(props);

  return (
    <motion.div {...motionProps}>{props.children}</motion.div>
  )
}

export function useMotionReveal(props: MotionRevealProps, observerOptions: IntersectionObserverInit = {}, transition: Transition = spring) {
  const [visible, setVisible] = useState(false);
  const [ref] = useIntersectionObserver(self => {
    if (self.isIntersecting || (!props.once)) {
      setVisible(self.isIntersecting);
    }
  }, observerOptions);

  return {
    ref: (el: HTMLElement) => ref.current = el,
    animate: visible ? props.visible : props.hidden,
    transition
  }
}

export function makeMotionRevealProps(values: {[property: string]: TwoStateValue}): MotionRevealProps {
  return Object.keys(values).reduce((r, key, i) => {
    r.hidden[key] = values[key][0];
    r.visible[key] = values[key][1];
    return r;
  }, {hidden: {}, visible: {}} as MotionRevealProps)
}