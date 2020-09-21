import React from 'react';
import './Watermark.scss';

export function WatermarkContainer(props: React.PropsWithChildren<{dark?: boolean, rotate?: number}>) {

  const style: React.CSSProperties = {
    transform: `rotateZ(${props.rotate | 0}deg)`
  }

  return (
    <div className={`watermarks${props.dark && ' dark' || ''}`} style={props.rotate && style}>
      {props.children}
    </div>
  )
}

export function Watermark(props: React.PropsWithChildren<{left: number, top: number}>) {
  return (
    <h1 style={{ left: `${props.left}rem`, top: `${props.top}rem` }}>{props.children}</h1>
  )
}