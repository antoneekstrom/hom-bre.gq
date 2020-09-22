import React from 'react';
import { motion, useAnimation, Transition, useViewportScroll, useTransform, createMotionComponent } from "framer-motion";
import { useSpring } from 'react-spring';
import { Brush, Database, Email, Github, LinkedIn, Stack, Twitter } from './icons';
import PaperButton from './components/PaperButton';
import { Watermark, WatermarkContainer } from './components/Watermark';
import Card, { CardContainer } from './components/Card';
import Header from './components/Header';
import './style/HomeLayout.scss';
import { useMotionReveal, MotionRevealProps } from './components/MotionReveal';
import { randrange } from './util';
import ScrollIndicator from './components/ScrollIndicator';

const revealProps: MotionRevealProps = {hidden: {x: '-10rem', opacity: 0}, visible: {x: '0rem', opacity: 1}, once: true};

export default function App() {

  return (
    <div className="wrapper">

      <Header/>

      <main>

        <HeroSection/>

        <BigSmellyFartSection/>

        <CardSection/>

      </main>

      <ScrollSuggestion/>
      <ScrollIndicator pages={4} pageHeight={450} />

      <Footer/>
    </div >
  )
}

function Epic(props: React.PropsWithChildren<{}>) {
  const [offset, setOffset] = React.useState([{x: 0, y: 0}, {x: 0, y: 0}]);
  const [handle, setHandle] = React.useState<number>();

  const strength = 2;
  const spring: Transition = {}

  React.useEffect(() => {
    start();
    return () => stop();
  }, [])

  return (
    <span className="epic" onClick={() => handle ? stop() : start()}>
      <span>{props.children}</span>
      <motion.span transition={spring} animate={makeStyle(offset[0])}>{props.children}</motion.span>
      <motion.span transition={spring} animate={makeStyle(offset[1])}>{props.children}</motion.span>
    </span>
  )

  function getOffset() {
    return {x: Math.random() * strength * (Math.random() < 0.5 ? -1 : 1), y: Math.random() * strength * (Math.random() < 0.5 ? -1 : 1)};
  }

  function start() {
    const interval = setInterval(() => {
      setOffset([getOffset(), getOffset()])
    }, 80);
    setHandle(interval);
  }

  function stop() {
    setOffset([{x: 0, y: 0}, {x: 0, y: 0}]);
    if (handle) {
      clearInterval(handle);
      setHandle(undefined);
    }
  }

  function makeStyle(offset) {
    return {
      transform: `translate(${offset.x}rem, ${offset.y}rem)`
    }
  }
}

function CardSection() {
  const { scrollYProgress } = useViewportScroll();
  const watermarkOffset = useTransform(scrollYProgress, [0, 1], ['-40vw', '15vw']);

  return (
    <section className="card-section">

      <motion.div style={{x: watermarkOffset, zIndex: -1, position: 'absolute', left: 0, top: 0}}>
        <WatermarkContainer>
          <Watermark left={0} top={0}>EPIC</Watermark>
        </WatermarkContainer>
      </motion.div>

      <div className="section-inner">
        <h2 style={{justifySelf: 'start'}}><Epic>EPIC</Epic> experiences you will NOT forget.</h2>
        <p style={{width: '70%', justifySelf: 'start'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat proin felis turpis risus. Cursus vestibulum neque, ante enim, ac diam lorem nulla sit. Elementum rhoncus ut sed mattis.
        </p>

        <CardContainer>
          <Card icon={Brush} title="Front-End">Beautifully crafted experiences for your front-end users.</Card>
          <Card icon={Database} title="Back-End">Incredibly performant servers and databases.</Card>
          <Card icon={Stack} title="Full-Stack">I can practically create anything you could imagine.</Card>
        </CardContainer>

      </div>

    </section>
  )
}

function BigSmellyFartSection() {
  const { scrollYProgress } = useViewportScroll();
  const watermarkOffset = useTransform(scrollYProgress, [0, 1], ['-10rem', '50rem']);

  // {[...Array(10)].map((_, i) => <Watermark key={i} left={randrange(-150, 50)} top={randrange(-100, 100)}>ANTON EKSTRÖM</Watermark>)}

  return (
    <section className="background dark">
      <motion.div style={{y: watermarkOffset, zIndex: -1, position: 'absolute', left: 0, top: 0}}>
        <WatermarkContainer dark>
          <Watermark left={60} top={-15}>ANTON EKSTRÖM</Watermark>
          <Watermark left={-20} top={0}>ANTON EKSTRÖM</Watermark>
          <Watermark left={-70} top={15}>ANTON EKSTRÖM</Watermark>
          <Watermark left={100} top={20}>ANTON EKSTRÖM</Watermark>
          <Watermark left={-35} top={33}>ANTON EKSTRÖM</Watermark>
          <Watermark left={130} top={38}>ANTON EKSTRÖM</Watermark>
          <Watermark left={-10} top={50}>ANTON EKSTRÖM</Watermark>
        </WatermarkContainer>
      </motion.div>

      <div className="section-inner split">
        <motion.h1 {...useMotionReveal(revealProps, {threshold: 0.7})}>Big.<br />Smelly.<br />Fart.</motion.h1>
        <div>
          <p className="centered">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo mauris maecenas lacus, venenatis. Habitant ipsum accumsan sit risus sapien malesuada. Suscipit habitant blandit porttitor lectus. Pellentesque dolor sit urna purus pulvinar.
          </p>
          <PaperButton>LEARN MORE</PaperButton>
        </div>
      </div>
    </section>
  )
}

function HeroSection() {
  return (
    <section className="hero-section">
      <WatermarkContainer>
        <Watermark left={-50} top={0}>ANTON EKSTRÖM</Watermark>
        <Watermark left={70} top={10}>ANTON EKSTRÖM</Watermark>
        <Watermark left={-100} top={20}>ANTON EKSTRÖM</Watermark>
        <Watermark left={30} top={30}>ANTON EKSTRÖM</Watermark>
      </WatermarkContainer>
      <div className="section-inner split">
        <Hero/>
        <KeySkills/>
      </div>
    </section>
  )
}

function Hero() {

  return (
    <div>
      <motion.h1 {...useMotionReveal(revealProps, {threshold: 1})}>ANTON<br />EKSTRÖM</motion.h1>
      <p>
        It is I who am Anton Ekström. I am a very great person who excels in everything I do. 
      </p>
    </div>
  )
}

function KeySkills() {
  return (
    <div>
      <h3>Key Skills</h3>
      <ul className="dashed" style={{ marginBottom: "5rem" }}>
        <li><p>Can type quickly (around 100 WPM)</p></li>
        <li><p>Studies at Chalmers</p></li>
        <li><p>Has a cat named Vincent</p></li>
        <li><p>Does not play League of Legends</p></li>
      </ul>
      <PaperButton primary>HIRE ME</PaperButton>
    </div>
  )
}

function ContactMe() {
  return (
    <section className="contact-section">
      <div className="section-inner split">
        <div>
          <h2>Contact Me</h2>
          <p>You should definitely contact me regarding your enquiries which you most certainly possess several of.</p>
        </div>
        <div className="links">
          <div><Email/><p>anton.e.ekstrom@gmail.com</p></div>
          <div><Github/><p>zimbosaurus</p></div>
          <div><LinkedIn/><p>Anton Ekström</p></div>
          <div><Twitter/><p>@e_zimba01</p></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <ContactMe/>
    </footer>
  )
}

function ScrollSuggestion() {
  /* Animate appearance of arrow icon */
  const controls = useAnimation();
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, [])

  /* Animate scrolling when clicking arrow */
  const [, setY] = useSpring(() => ({
    y: window.scrollY, // initial value (?)
    from: { y: window.scrollY }, // animate FROM this value
    reset: true, // always start from-value on trigger

    onRest: () => { // when animation is done
      isStopped = false;
      window.removeEventListener('wheel', onWheel)
    },

    onFrame: ({y}: {y: number}) => { // called when value is updated
      if (!isStopped) {
        window.scroll(0, y)
      }
    }
  }))
  // stop scrolling animation when user scrolls
  let isStopped = false;
  const onWheel = () => {
    isStopped = true
    window.removeEventListener('wheel', onWheel)
  }

  return (
    <motion.div className="scroll-suggestion" animate={controls} initial={{y: getPosition()}} onClick={e => scrollTo(650)}>
      <i className="im im-angle-down"></i>
    </motion.div>
  )

  function scrollTo(y: number) {
    window.addEventListener('wheel', onWheel);
    setY({y});
  }

  function getPosition() {
    return window.scrollY < 50 ? '0rem' : '10rem';
  }

  function onScroll() {
    controls.start({y: getPosition()});
    window.removeEventListener('scroll', onscroll);
  }
}