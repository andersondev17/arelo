import { gsap } from 'gsap';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface VideoPreviewProps {
  children: ReactNode;
  onClick?: () => void;
}

const ANIMATION_CONFIG = {
  DURATION: 1,
  PERSPECTIVE: 500,
  ROTATION_FACTOR: 2,
  EASE: 'power1.out'
};

const VideoPreview: FC<VideoPreviewProps> = ({ children, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const resetAnimations = useCallback(() => {
    const resetParams = {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: ANIMATION_CONFIG.DURATION,
      ease: ANIMATION_CONFIG.EASE
    };

    if (sectionRef.current) gsap.to(sectionRef.current, resetParams);
    if (contentRef.current) gsap.to(contentRef.current, resetParams);
  }, []);

  const handleInteraction = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!sectionRef.current || !contentRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      const xOffset = clientX - (rect.left + rect.width / 2);
      const yOffset = clientY - (rect.top + rect.height / 2);

      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / ANIMATION_CONFIG.ROTATION_FACTOR,
        rotationX: -yOffset / ANIMATION_CONFIG.ROTATION_FACTOR,
        transformPerspective: ANIMATION_CONFIG.PERSPECTIVE,
        duration: ANIMATION_CONFIG.DURATION,
        ease: ANIMATION_CONFIG.EASE
      });

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: ANIMATION_CONFIG.DURATION,
        ease: ANIMATION_CONFIG.EASE
      });
    },
    []
  );

  useEffect(() => {
    if (!isHovering) resetAnimations();
  }, [isHovering, resetAnimations]);

  return (
    <section
      ref={sectionRef}
      role="button"
      tabIndex={0}
      aria-label="Interactive video preview"
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      onClick={onClick}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: ANIMATION_CONFIG.PERSPECTIVE }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;