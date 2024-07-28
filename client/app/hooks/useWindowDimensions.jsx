'use client'

import { useEffect, useState } from 'react';

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: null,
        height: null,
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function updateWindowDimensions() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setIsMobile(window.innerWidth < 768);
        }

        if (typeof window !== 'undefined') {
            updateWindowDimensions(); // Set initial dimensions
            window.addEventListener('resize', updateWindowDimensions);
            return () => window.removeEventListener('resize', updateWindowDimensions);
        }
    }, []);

    return { ...windowDimensions, isMobile };
}

export default useWindowDimensions;

