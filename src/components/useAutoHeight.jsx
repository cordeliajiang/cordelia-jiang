import { useState, useRef, useEffect } from 'react';

// Custom hook to adjust the total height of a section based on its container and margins.
const useAutoHeight = () => {
    const [heightState, setHeightState] = useState('auto'); // Holds the calculated height
    const containerRef = useRef(null); // Ref for the container element

    // Updates the height based on container dimensions
    const updateHeights = () => {
        // Ensure ref is assigned to DOM elements before proceeding
        if (containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const containerStyles = getComputedStyle(containerRef.current);
            const marginHeight = parseFloat(containerStyles.marginTop) + parseFloat(containerStyles.marginBottom);

            // Calculate the total height considering container and margins
            const totalHeight = containerHeight + marginHeight;

            setHeightState(totalHeight);
        }
    };

    // Handle window resize events to update heights
    useEffect(() => {
        const handleResize = () => {
            requestAnimationFrame(updateHeights);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call on mount

        // Cleanup resize event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Schedules height update after DOM rendering
    useEffect(() => {
        requestAnimationFrame(() => {
            setTimeout(updateHeights, 50);
        });
    }, [heightState]);

    return { heightState, containerRef, updateHeights };

};

export default useAutoHeight;