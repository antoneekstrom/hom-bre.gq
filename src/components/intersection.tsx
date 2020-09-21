import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

type UseIntersectionObserverProps = [selfRef: MutableRefObject<HTMLElement>, observer: IntersectionObserver];

type ObserverCallback = (self: IntersectionObserverEntry, entries?: IntersectionObserverEntry[]) => void;

export function useIntersectionObserver(callback: ObserverCallback, options?: IntersectionObserverInit): UseIntersectionObserverProps {
  
  const [observer] = useState(new IntersectionObserver(entries => callback(entries.filter(entry => entry.target == selfRef.current)?.[0], entries), options));
  const selfRef = useRef<HTMLElement>();
  
  useEffect(() => {
    observer.observe(selfRef.current);
    return observer.disconnect;
  }, [])

  return [selfRef, observer]
}
