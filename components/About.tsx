'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRight, Code, Rocket, Users } from 'lucide-react';
import AnimatedTitle from "./ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="about-feature p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const About: React.FC = () => {
  useGSAP(() => {
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "+=400",
        scrub: 0.5,
      },
    });

    mainTimeline
      .from(".about-header", {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from(".about-feature", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2
      }, "-=0.4");
  });

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
      title: "Innovación Constante",
      description: "Transformamos ideas en soluciones digitales de vanguardia que impulsan el crecimiento de tu negocio."
    },
    {
      icon: <Code className="w-6 h-6 text-orange-500" />,
      title: "Excelencia Técnica",
      description: "Desarrollamos software robusto y escalable utilizando las últimas tecnologías y mejores prácticas."
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: "Enfoque Colaborativo",
      description: "Trabajamos en estrecha colaboración con nuestros clientes para crear soluciones que excedan expectativas."
    }
  ];

  return (
    <section id="about" className="min-h-screen w-full bg-gradient-to-b from-zinc-950 to-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <div className="about-header max-w-3xl mx-auto text-center mb-16">
          <p className="font-general text-orange-500 font-medium tracking-wide uppercase mb-4">
            Bienvenidos a Arelo
          </p>

          <AnimatedTitle
            title="Trans<b>fo</b>rmamos <br/> tu Visi<b>o</b>n Digital"
            containerClass="mt-4 mb-8 text-white text-center"
          />

          <p className="about-subtext text-xl text-gray-300 leading-relaxed">
            Somos más que una empresa de software - somos tu socio estratégico en la transformación digital. 
            Combinamos creatividad técnica con experiencia empresarial para desarrollar soluciones que marcan la diferencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#contacto" 
            className="font-zentry text-2xl inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
          >
            Comencemos tu proyecto
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;