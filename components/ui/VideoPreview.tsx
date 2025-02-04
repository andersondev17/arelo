import { gsap } from 'gsap';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface VideoPreviewProps {
    children: ReactNode;
}

const VideoPreview = ({ children }: VideoPreviewProps) => {
    // State for tracking hover
    const [isHovering, setIsHovering] = useState(false);

    // Typed refs for DOM elements
    const sectionRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Animation constants
    const ANIMATION_DURATION = 1;
    const PERSPECTIVE = 500;
    const ROTATION_FACTOR = 2;

    // Handles mouse movement with proper typing
    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY, currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect();

        // Calculate offsets from center
        const xOffset = clientX - (rect.left + rect.width / 2);
        const yOffset = clientY - (rect.top + rect.height / 2);

        if (!isHovering || !sectionRef.current || !contentRef.current) return;

        // Container animation
        gsap.to(sectionRef.current, {
            x: xOffset,
            y: yOffset,
            rotationY: xOffset / ROTATION_FACTOR,
            rotationX: -yOffset / ROTATION_FACTOR,
            transformPerspective: PERSPECTIVE,
            duration: ANIMATION_DURATION,
            ease: 'power1.out',
        });

        // Content parallax animation
        gsap.to(contentRef.current, {
            x: -xOffset,
            y: -yOffset,
            duration: ANIMATION_DURATION,
            ease: 'power1.out',
        });
    };

    // Reset animations when hover ends
    useEffect(() => {
        if (!isHovering && sectionRef.current && contentRef.current) {
            const resetAnimation = {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                duration: ANIMATION_DURATION,
                ease: 'power1.out',
            };

            gsap.to(sectionRef.current, resetAnimation);
            gsap.to(contentRef.current, resetAnimation);
        }
    }, [isHovering]);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="absolute z-50 size-full overflow-hidden rounded-lg"
            style={{
                perspective: `${PERSPECTIVE}px`,
            }}
        >
            <div
                ref={contentRef}
                className="origin-center rounded-lg"
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </div>
        </section>
    );
};

export default VideoPreview;