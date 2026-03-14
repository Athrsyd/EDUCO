import { useState, useEffect, useRef } from "react";

export default function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStart(true);
                } else {
                    setStart(false);
                    setCount(0); // Reset count ketika keluar dari viewport
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0 },
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!start) return;

        const step = Math.ceil(target / 100);

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= target) {
                    clearInterval(interval);
                    return target;
                }
                return prev + step;
            });
        }, 8);

        return () => clearInterval(interval);
    }, [start, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}