import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    // Dot snaps instantly
    const dotX = useSpring(mouseX, { stiffness: 1200, damping: 60, mass: 0.1 });
    const dotY = useSpring(mouseY, { stiffness: 1200, damping: 60, mass: 0.1 });

    // Ring lags behind for the "kinetic" trail feel
    const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.4 });
    const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.4 });

    const isVisible = useRef(false);

    useEffect(() => {
        const onMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible.current) isVisible.current = true;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer ring — slow follow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary/50 mix-blend-screen"
                style={{
                    width: 36,
                    height: 36,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Inner dot — snaps to cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary mix-blend-screen"
                style={{
                    width: 7,
                    height: 7,
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    boxShadow: '0 0 10px rgba(255,143,115,0.7)',
                }}
            />
        </>
    );
}
