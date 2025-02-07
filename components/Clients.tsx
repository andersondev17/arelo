'use client';
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const clients = [
    {
        name: "Next Star",
        logo: "/img/contact-1.webp",
        description: "Best Startup Accelerator"
    },
    {
        name: "Barbershop",
        logo: "/img/contact-2.webp",
        description: "It's All About Style"
    },
    {
        name: "Cloud Solution",
        logo: "/img/contact-1.webp",
        description: "Upload Your Business"
    },
    {
        name: "Financial Investment",
        logo: "/img/logo.png",
        description: "Financial Services"
    }
];

const Clients = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const cardsContainer = cardsContainerRef.current;
        if (!container || !wrapper || !cardsContainer) return;

        const totalWidth = cardsContainer.scrollWidth - window.innerWidth;
        
        // Configuración del scroll horizontal
        const horizontalScroll = gsap.to(cardsContainer, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true
            }
        });

        // Animación de aparición de cards
        const cards = gsap.utils.toArray<Element>(".client-card");
        cards.forEach(card => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.9,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalScroll,
                    start: "left 75%",
                    end: "left 25%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animación de gradientes
        gsap.to(".scroll-gradient", {
            opacity: 0,
            scrollTrigger: {
                containerAnimation: horizontalScroll,
                start: "left 90%",
                end: "left 10%",
                toggleActions: "play none none reverse"
            }
        });

    }, { scope: containerRef });

    return (
        <>
            {/* Título separado del contenido scrolleable */}
            <div className="w-full bg-white py-10 md:py-20">
                <div className="container mx-auto px-4 mb-8 md:mb-16">
                    <div className="flex flex-col items-center text-center">
                        <p className="font-general text-xs sm:text-sm uppercase md:text-[10px] mb-4 md:mb-6">
                            Nuestros Clientes
                        </p>
                        <AnimatedTitle
                            title="Empre<b>s</b>as que <br/> Con<b>f</b>ían en Nosotros"
                            containerClass="mt-3 md:mt-5 !text-black text-center"
                        />
                    </div>
                </div>
            </div>

            {/* Contenido scrolleable */}
            <div id="clientes" className="min-h-screen w-screen bg-white" ref={wrapperRef}>
                <div className="relative w-full overflow-hidden  py-32" ref={containerRef}>
                    <div 
                        ref={cardsContainerRef}
                        className="clients-container flex gap-4 md:gap-8 py-6 md:py-10 pl-4"
                    >
                        {[...clients, ...clients].map((client, index) => (
                            <Card
                                key={`${client.name}-${index}`}
                                className={`client-card flex-shrink-0 w-52 md:w-64 h-52 md:h-64 p-4 md:p-6 cursor-pointer transition-all duration-300
                                    ${hoveredIndex === index ? 'scale-105 shadow-xl' : 'shadow-md'}
                                    hover:bg-blue-50 border-none`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="h-full flex flex-col items-center justify-center gap-3 md:gap-4">
                                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-base md:text-lg text-gray-800">{client.name}</h3>
                                        <p className="text-xs md:text-sm text-gray-600">{client.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="scroll-gradient absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    <div className="scroll-gradient absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>
            </div>
        </>
    );
};

export default Clients;