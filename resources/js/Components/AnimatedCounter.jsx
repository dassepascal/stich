import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target = 40, suffix = '%', duration = 1.5 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const steps = 60;
        const increment = target / steps;
        const intervalMs = (duration * 1000) / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.round(start));
            }
        }, intervalMs);

        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}
