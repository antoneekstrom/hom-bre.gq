import React from 'react';
import './PaperButton.scss';

export default function PaperButton(props: React.PropsWithChildren<{primary?: boolean}>) {
  return (
    <div className={`paper-button${props.primary && ' primary' || ''}`}>
      <button>
        <span className="fill"></span>
        <span className="text">{props.children}</span>
      </button>
    </div>
  )
}