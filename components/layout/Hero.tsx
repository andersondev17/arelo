'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from '../ui/button';
import VideoPreview from '../ui/VideoPreview';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_VIDEOS = 1;

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const nextVdRef = useRef<HTMLVideoElement>(null);
    // 0 % 4 = 0 + 1 => 1
    // 1 % 4 = 1 + 1 => 2
    // 2 % 4 = 2 + 1 => 3
    // 3 % 4 = 3 + 1 => 4
    // 4 % 4 = 0 + 1 => 1

    // Mejorado el manejo de carga de videos
    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1);
    };
    useEffect(() => {
        if (loadedVideos === TOTAL_VIDEOS - 1) {
            setLoading(false);
        }
    }, [loadedVideos]);


    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(prevIndex => (prevIndex % TOTAL_VIDEOS) + 1);
    };

    // Frame animation
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
            borderRadius: '0% 0% 40% 10%'
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0% 0% 0% 0%',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true
            }
        });
    });

    const getVideoSrc = (index: number): string => `/videos/hero-${index}.mp4`;


    const renderVideoFrame = () => (
        <div>
            <div className={`mask-clip-path absolute-center items-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg ${hasClicked ? 'transition-transform duration-300' : ''
                }`}>                <VideoPreview>
                    <div
                        onClick={handleMiniVdClick}
                        className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                    >
                        <video
                            ref={nextVdRef}
                            src={getVideoSrc((currentIndex % TOTAL_VIDEOS) + 1)}
                            loop
                            muted
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </VideoPreview>
            </div>

            <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                onLoadedData={handleVideoLoad}
            />
            <video
                src={getVideoSrc(currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex)}
                autoPlay
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoadedData={handleVideoLoad}
            />
        </div>
    );

    const renderContent = () => (
        <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
                <h1 className="hero-heading  buttom-5 z-40 text-blue-100">
                    ARE<b>L</b>O
                </h1>

                <p className="mb-5 max-w-64 font-sans text-blue-100">
                    Transformamos tus ideas en  <br /> Soluciones tecnologicas
                </p>

                <Button
                    id="watch-trailer"
                    title="Ver mas"
                    leftIcon={<TiLocationArrow />}
                    containerClass="bg-yellow-300 flex-center gap-1"
                />
            </div>
        </div>
    );
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                {renderVideoFrame()}
                {renderContent()}
                <h1 className="special-font uppercase font-zentry font-black text-xl sm:right-10 sm:text-xl md:text-xl lg:text-[5rem] absolute bottom-5 right-5 z-40 text-blue-75">
                    Innovacion en software
                </h1>
            </div>

            <h1 className="special-font uppercase font-zentry font-black text-xl sm:right-10 sm:text-xl md:text-xl lg:text-[5rem] absolute bottom-5 right-5 text-black">
                Innovacion en softw<b>a</b>re
            </h1>
        </div>
    );
};

export default Hero;