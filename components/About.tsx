'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top center",
                end: "+=400",
                scrub: 0.5,
            },
        });

        clipAnimation.from(".about-subtext", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <p className="font-general text-sm uppercase md:text-[10px] mb-6">
                        Welcome to Arelo
                    </p>

                    <AnimatedTitle
                        title="S<b>o</b>bre  <br /> Nos<b>o</b>tros"
                        containerClass="mt-5 mb-10 !text-black text-center"
                    />

                    <div className="about-subtext space-y-6">
                        <p className="text-lg leading-relaxed">
                            Somos una empresa de software dedicada a ofrecer soluciones tecnológicas de alta calidad.
                        </p>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Nuestro equipo está compuesto por expertos en diversas áreas de la informática, lo que nos permite abordar proyectos de cualquier complejidad. Nos enfocamos en la innovación, la eficiencia y la satisfacción del cliente, ayudándoles a alcanzar sus objetivos empresariales
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;