import { useAnimation } from "framer-motion";
import { useSpring } from "react-spring";

export function randrange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useScrollAnimation() {
    /* Animate scrolling when clicking arrow */
    const [, setY] = useSpring(() => ({
        y: window.scrollY, // initial value (?)
        from: { y: window.scrollY }, // animate FROM this value
        reset: false, // always start from-value on trigger

        onRest: () => { // when animation is done
            isStopped = false;
            window.removeEventListener('wheel', onWheel)
        },

        onFrame: ({ y }: { y: number }) => { // called when value is updated
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

    function scrollTo(y: number) {
        window.addEventListener('wheel', onWheel);
        setY({ y, from: {y: window.scrollY} });
    }

    return scrollTo;
}