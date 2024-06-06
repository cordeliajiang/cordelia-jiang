import { useState, useRef, useEffect } from 'react';

// Custom hook to adjust the height of a container based on its content and margins.
const useAutoHeight = () => {
    const [heightState, setHeightState] = useState('auto'); // Holds the calculated height
    const contentRef = useRef(null); // Ref for the content element
    const containerRef = useRef(null); // Ref for the container element

    // Updates the height based on content and container dimensions
    const updateHeights = () => {
        // Ensure both refs are assigned to DOM elements before proceeding
        if (contentRef.current && containerRef.current) {
            const contentHeight = contentRef.current.clientHeight;
            const containerHeight = containerRef.current.clientHeight;
            const containerStyles = getComputedStyle(containerRef.current);
            const marginHeight = parseFloat(containerStyles.marginTop) + parseFloat(containerStyles.marginBottom);

            // Calculate the total height considering content, container, and margins
            const totalHeight = Math.max(contentHeight, containerHeight) + marginHeight;
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

    return { heightState, contentRef, containerRef, updateHeights };
};

export default useAutoHeight;