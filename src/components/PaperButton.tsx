import React, { forwardRef, FunctionComponent, MutableRefObject, PropsWithChildren } from 'react';
import { classNames, coreProps, ICoreProps } from './Common';
import './PaperButton.scss';

export type PaperButtonProps = PropsWithChildren<ICoreProps<HTMLButtonElement> & {primary?: boolean}>

const PaperButtonInner = (props: PaperButtonProps & {forwardRef: MutableRefObject<HTMLButtonElement>}) => {
  const cprops = coreProps(props, classNames({primary: props.primary}, 'paper-button'));
  
  return (
    <div {...cprops}>
      <button ref={props.forwardRef} onClick={e => cprops.onClick?.(e)} onAuxClick={e => cprops.onAuxClick?.(e)}>
        <span className="fill"></span>
        <span className="text">{props.children}</span>
      </button>
    </div>
  )
}

const PaperButtonForward: FunctionComponent<PaperButtonProps> = forwardRef((props: PaperButtonProps, ref: MutableRefObject<HTMLButtonElement>) => <PaperButtonInner {...{...props, forwardRef: ref}} />);
export default PaperButtonForward;