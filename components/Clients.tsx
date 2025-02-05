'use client';
import { Card } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useState } from "react";
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

    useGSAP(() => {
        const clientsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#clients",
                start: "top center",
                end: "+=300",
                scrub: 0.5,
            },
        });

        clientsTimeline
            .from(".client-card", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: {
                    each: 0.2,
                    from: "start",
                },
                ease: "power2.out"
            });

        // Infinite scroll animation for logos
        gsap.to(".clients-container", {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1,
            scrollTrigger: {
                trigger: ".clients-container",
                start: "top center",
                end: "bottom center",
                toggleActions: "play pause resume pause"
            }
        });
    });

    return (
        <div id="clientes" className="min-h-screen w-screen bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <div className="flex flex-col items-center text-center">
                    <p className="font-general text-sm uppercase md:text-[10px] mb-6">
                        Nuestros Clientes
                    </p>
                    <AnimatedTitle
                        title="Empre<b>s</b>as que <br/> Con<b>f</b>ían en Nosotros"
                        containerClass="mt-5 !text-black text-center"
                    />
                </div>
            </div>

            <div className="relative w-full">
                <div className="clients-container flex gap-8 py-10">
                    {[...clients, ...clients].map((client, index) => (
                        <Card
                            key={`${client.name}-${index}`}
                            className={`client-card flex-shrink-0 w-64 h-64 p-6 cursor-pointer transition-all duration-300
                ${hoveredIndex === index ? 'scale-105 shadow-xl' : 'shadow-md'}
                hover:bg-blue-50 border-none`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="h-full flex flex-col items-center justify-center gap-4">
                                <div className="relative w-40 h-40 transition-transform duration-300">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        layout="fill"
                                        objectFit="contain"
                                        className="transition-all duration-300"
                                    />
                                </div>
                                <div className={`text-center transition-opacity duration-300 `}>
                                    <h3 className="font-semibold text-lg text-gray-800">{client.name}</h3>
                                    <p className="text-sm text-gray-600">{client.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Gradient overlays for infinite scroll effect */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    );
};

export default Clients;