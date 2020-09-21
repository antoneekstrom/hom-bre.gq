import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Header.scss';
import PaperStack from './PaperStack';

export default function Header() {
  const [clickAnimState, setClickAnimState] = React.useState(false);

  return (
    <CSSTransition in={clickAnimState} classNames="click" timeout={{enter: 100, exit: 200}} >
      <div className="header-outer-container">
        <div className="header-inner-container">
          <PaperStack className="hover" style={{ backgroundColor: "var(--secondary-0)" }}>
            <PaperStack className="hover" style={{ backgroundColor: "var(--primary-0)" }}>

              <header
                className="paper-stack hover"
                onMouseDown={() => setClickAnimState(true)}
                onMouseUp={() => setClickAnimState(false)}
                onMouseLeave={() => setClickAnimState(false)}>
                <nav>
                  <button>Home</button>
                  <button>Solutions</button>
                  <button>About</button>
                  <button>Contact</button>
                </nav>

                <h4>ANTON EKSTRÖM</h4>
              </header>

            </PaperStack>
          </PaperStack>
        </div>
      </div>
    </CSSTransition>
  )
}