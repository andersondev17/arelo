'use client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsSpeaker, BsSpeakerFill } from "react-icons/bs";
import { TiLocationArrow, TiThMenu } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "../ui/button";

const navItems = ["Inicio", "Portafolio", "Quienes Somos", "Servicios", "Unete a nosotros", "Contacto"] as const;

interface AudioElementRefType extends HTMLAudioElement {
    play(): Promise<void>;
    pause(): void;
}

const NavBar: React.FC = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    const audioElementRef = useRef<AudioElementRefType>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    const toggleAudioIndicator = (): void => {
        setIsAudioPlaying(prev => !prev);
    };

    useEffect(() => {
        if (audioElementRef.current) {
            if (isAudioPlaying) {
                audioElementRef.current.play();
            } else {
                audioElementRef.current.pause();
            }
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (!navContainerRef.current) return;

        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        if (navContainerRef.current) {
            gsap.to(navContainerRef.current, {
                y: isNavVisible ? 0 : -100,
                opacity: isNavVisible ? 1 : 0,
                duration: 0.2,
            });
        }
    }, [isNavVisible]);

    const handleNavClick = (href: string): void => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <Image src="/img/logo.png" alt="logo" className="w-10" width={50} height={50} />
                        <Button
                            id="product-button"
                            title="Portafolio"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    <div className="flex h-full items-center">
                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(`#${item.toLowerCase()}`);
                                    }}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Audio Indicator */}
                        <div className="relative ml-10">
                            <button
                                onClick={toggleAudioIndicator}
                                className="flex items-center space-x-0.5 p-2 group"
                                aria-label={isAudioPlaying ? 'Pausar audio' : 'Reproducir audio'}
                            >
                                <div className="text-white transition-transform duration-300 hover:scale-110">
                                    {isAudioPlaying ? (
                                        <BsSpeakerFill className="w-5 h-5" />
                                    ) : (
                                        <BsSpeaker className="w-5 h-5" />
                                    )}
                                </div>
                            </button>
                            <audio
                                ref={audioElementRef}
                                src="/audio/loop.mp3"
                                loop
                                className="hidden"
                            />
                        </div>
                        {/* Mobile Navigation */}
                        <div className="block md:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        title=""
                                        rightIcon={<TiThMenu className="h-6 w-6 text-white" />}
                                        containerClass="bg-transparent hover:bg-blue-50/10"
                                    />
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] bg-black p-0">
                                    <div className="flex flex-col space-y-4 p-6">
                                        {navItems.map((item) => (
                                            <a
                                                key={item}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavClick(`#${item.toLowerCase()}`);
                                                }}
                                                className="nav-hover-btn"
                                            >
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>


                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;