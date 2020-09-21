import React, { FunctionComponent, PropsWithChildren } from 'react';
import './Card.scss';

type CardProps = PropsWithChildren<{
  icon?: FunctionComponent;
  title?: string;
}>

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="icon">{props.icon && <props.icon/>}</div>
      <div>
        {props.title && <h4>{props.title}</h4>}
        {props.children && <p>{props.children}</p>}
      </div>
    </div>
  )
}

export function CardContainer(props: PropsWithChildren<{}>) {
  return (
    <div className="card-container">
      {props.children}
    </div>
  )
}